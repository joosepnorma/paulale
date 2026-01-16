import React from 'react';

interface HandsProps {
  activeHand: 'left' | 'right' | null;
  activeFinger: 'pinky' | 'ring' | 'middle' | 'index' | 'thumb' | null;
}

const Hands: React.FC<HandsProps> = ({ activeHand, activeFinger }) => {
  // Define base colors matching FINGER_COLORS in constants
  // Pinky: Red, Ring: Orange, Middle: Yellow, Index: Green, Thumb: Blue
  const colors = {
    pinky: '#fca5a5', // red-300
    ring: '#fdba74',  // orange-300
    middle: '#fde047', // yellow-300
    index: '#86efac',  // green-300
    thumb: '#93c5fd',  // blue-300
    default: '#e2e8f0' // slate-200
  };

  const getFill = (hand: 'left' | 'right', finger: 'pinky' | 'ring' | 'middle' | 'index' | 'thumb') => {
    if (activeHand === hand && activeFinger === finger) {
      return colors[finger];
    }
    return colors.default;
  };

  const stroke = "#475569"; // slate-600
  const strokeWidth = "2";

  return (
    <div className="flex justify-center gap-8 mt-2 opacity-90">
      {/* Left Hand */}
      <svg width="80" height="80" viewBox="0 0 100 100" className={activeHand === 'left' ? "scale-105 transition-transform" : "opacity-50"}>
        {/* Pinky */}
        <path d="M10,60 L10,35 Q10,25 20,25 Q30,25 30,35 L30,60" fill={getFill('left', 'pinky')} stroke={stroke} strokeWidth={strokeWidth} />
        {/* Ring */}
        <path d="M30,60 L30,25 Q30,15 40,15 Q50,15 50,25 L50,60" fill={getFill('left', 'ring')} stroke={stroke} strokeWidth={strokeWidth} />
        {/* Middle */}
        <path d="M50,60 L50,15 Q50,5 60,5 Q70,5 70,15 L70,60" fill={getFill('left', 'middle')} stroke={stroke} strokeWidth={strokeWidth} />
        {/* Index */}
        <path d="M70,60 L70,25 Q70,15 80,15 Q90,15 90,25 L90,60" fill={getFill('left', 'index')} stroke={stroke} strokeWidth={strokeWidth} />
        {/* Thumb */}
        <path d="M90,60 L90,70 Q105,75 90,85 L70,90" fill={getFill('left', 'thumb')} stroke={stroke} strokeWidth={strokeWidth} />
        {/* Palm base */}
        <path d="M10,60 L90,60 L90,80 Q50,110 10,80 Z" fill={colors.default} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>

      {/* Right Hand */}
      <svg width="80" height="80" viewBox="0 0 100 100" className={activeHand === 'right' ? "scale-105 transition-transform" : "opacity-50"}>
         {/* Palm base */}
        <path d="M90,60 L10,60 L10,80 Q50,110 90,80 Z" fill={colors.default} stroke={stroke} strokeWidth={strokeWidth} />
         {/* Thumb */}
        <path d="M10,60 L10,70 Q-5,75 10,85 L30,90" fill={getFill('right', 'thumb')} stroke={stroke} strokeWidth={strokeWidth} />
         {/* Index */}
        <path d="M10,60 L10,25 Q10,15 20,15 Q30,15 30,25 L30,60" fill={getFill('right', 'index')} stroke={stroke} strokeWidth={strokeWidth} />
        {/* Middle */}
        <path d="M30,60 L30,15 Q30,5 40,5 Q50,5 50,15 L50,60" fill={getFill('right', 'middle')} stroke={stroke} strokeWidth={strokeWidth} />
        {/* Ring */}
        <path d="M50,60 L50,25 Q50,15 60,15 Q70,15 70,25 L70,60" fill={getFill('right', 'ring')} stroke={stroke} strokeWidth={strokeWidth} />
        {/* Pinky */}
        <path d="M70,60 L70,35 Q70,25 80,25 Q90,25 90,35 L90,60" fill={getFill('right', 'pinky')} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    </div>
  );
};

export default Hands;