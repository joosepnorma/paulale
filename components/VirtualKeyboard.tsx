import React from 'react';
import { KEYBOARD_LAYOUT, FINGER_COLORS } from '../constants';
import { KeyConfig } from '../types';
import Hands from './Hands';

interface VirtualKeyboardProps {
  activeKey: string | null;
  errorKey: string | null;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ activeKey, errorKey }) => {
  
  // Helper to normalize keys for comparison (ignore case for simplicity in visualization)
  const isKeyActive = (key: KeyConfig) => {
    if (!activeKey) return false;
    // Map special symbols or handle case insensitivity
    const normalizedActive = activeKey.toUpperCase();
    
    if (key.code === 'Space' && activeKey === ' ') return true;
    
    // Check by character label first (e.g. 'A' vs 'a')
    if (key.label === normalizedActive) return true;
    
    return false;
  };

  // Find the active finger and hand info
  let activeHand: 'left' | 'right' | null = null;
  let activeFinger: 'pinky' | 'ring' | 'middle' | 'index' | 'thumb' | null = null;

  if (activeKey) {
    for (const row of KEYBOARD_LAYOUT) {
      const found = row.keys.find(k => isKeyActive(k));
      if (found) {
        activeHand = found.hand;
        activeFinger = found.finger;
        break;
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto select-none">
      <div className="flex flex-col gap-1.5 p-3 bg-slate-800 rounded-xl shadow-2xl w-full">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1.5 w-full" style={row.style}>
            {row.keys.map((key) => {
              const isActive = isKeyActive(key);
              const isError = errorKey && key.label === errorKey.toUpperCase();
              
              // Base classes
              let classes = `
                h-10 sm:h-12 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-100
                border-b-4 relative
              `;

              // Width handling
              if (key.code === 'Space') {
                classes += ' flex-grow max-w-[400px]';
              } else {
                classes += ' w-8 sm:w-11';
              }

              // Color handling based on finger
              const fingerColorClass = FINGER_COLORS[key.finger];
              
              // State handling (Active vs Idle)
              if (isActive) {
                classes += ` ${fingerColorClass} brightness-125 scale-95 border-b-0 translate-y-1`;
              } else if (isError) {
                classes += ` bg-red-600 border-red-800 text-white`;
              } else {
                classes += ` ${fingerColorClass} bg-opacity-90 hover:brightness-110`;
              }

              return (
                <div 
                  key={key.code} 
                  className={classes}
                >
                  {key.code === 'Space' ? 'SPACE' : key.label}
                  {/* Finger hint dot */}
                  {isActive && (
                    <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white animate-ping"></span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Hand Visualization */}
      <Hands activeHand={activeHand} activeFinger={activeFinger} />
    </div>
  );
};

export default VirtualKeyboard;