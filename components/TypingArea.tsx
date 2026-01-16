import React from 'react';

interface TypingAreaProps {
  targetText: string;
  userInput: string;
  isFocused: boolean;
}

const TypingArea: React.FC<TypingAreaProps> = ({ targetText, userInput, isFocused }) => {
  const chars = targetText.split('');

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-2">
      <div className={`
        bg-white rounded-xl shadow-lg p-6 min-h-[100px] flex flex-wrap content-start gap-1 text-2xl font-medium tracking-wide
        border-4 ${isFocused ? 'border-sky-400' : 'border-gray-300'} transition-colors
      `}>
        {chars.map((char, index) => {
          let className = "w-[0.7em] h-[1.3em] flex items-center justify-center rounded transition-all duration-200 ";
          const userChar = userInput[index];
          const isCurrent = index === userInput.length;
          
          // Check if this position has an error
          const hasError = userChar !== undefined && userChar !== char;

          if (index < userInput.length) {
            if (!hasError) {
              className += "text-green-600 bg-green-50 shadow-inner";
            } else {
              // Mistake style: red, line-through, and a slight shake/attention grabber
              className += "text-red-500 bg-red-100 line-through decoration-2 scale-110 z-10 shadow-sm";
            }
          } else if (isCurrent) {
            className += "bg-sky-200 border-b-4 border-sky-500 animate-pulse text-sky-900";
          } else {
            className += "text-gray-400";
          }
          
          return (
            <span key={index} className={className}>
              {char === ' ' ? '␣' : char}
            </span>
          );
        })}
        
        {!isFocused && (
          <div className="absolute inset-0 bg-black/10 rounded-xl flex items-center justify-center backdrop-blur-[1px]">
            <div className="bg-white px-6 py-3 rounded-full shadow-xl text-lg font-bold text-sky-600 animate-bounce">
              Klõpsa siia, et jätkata!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingArea;