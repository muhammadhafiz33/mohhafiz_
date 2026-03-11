import React, { useState } from 'react';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(color, 16);
  let r = (int >> 16) & 0xff;
  let g = (int >> 8) & 0xff;
  let b = int & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#6366f1', size = 2, items = [], className = '' }) => {
  const papers = items.slice(0, 3);

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: 3 }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.2);
  const paperColors = [
    darkenColor('#ffffff', 0.1),
    darkenColor('#ffffff', 0.05),
    '#ffffff'
  ];

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: 3 }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const getOpenTransform = (index) => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(20%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    return '';
  };

  return (
    <div style={{ transform: `scale(${size})` }} className={`${className} transition-all duration-300`}>
      <div
        className={`group relative transition-all duration-300 ease-in-out cursor-pointer ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        style={{
          transform: open ? 'translateY(-10px)' : undefined
        }}
        onClick={handleClick}
      >
        <div
          className="relative w-[100px] h-[75px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[100%] left-0 w-[35px] h-[10px] rounded-t-[5px]"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          
          {papers.map((item, i) => {
            if (!item) return null;
            let sizeClasses = '';
            if (i === 0) sizeClasses = 'w-[75%] h-[85%]';
            if (i === 1) sizeClasses = 'w-[85%] h-[85%]';
            if (i === 2) sizeClasses = 'w-[95%] h-[85%]';

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : 'translate(-50%, 0)';

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-500 ease-in-out shadow-sm overflow-hidden ${
                  !open 
                    ? `translate-y-[${10 - i * 5}%] group-hover:translate-y-0 opacity-${60 + i * 20}` 
                    : 'hover:scale-110 z-40'
                } ${sizeClasses}`}
                style={{
                  transform: transformStyle,
                  backgroundColor: paperColors[i],
                  borderRadius: '6px',
                  boxShadow: open ? '0 10px 20px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {item}
              </div>
            );
          })}
          
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(10deg)_scaleY(0.7)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '2px 10px 10px 10px',
              ...(open && { transform: 'skew(10deg) scaleY(0.7)' })
            }}
          ></div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(-10deg)_scaleY(0.7)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '2px 10px 10px 10px',
              ...(open && { transform: 'skew(-10deg) scaleY(0.7)' })
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
