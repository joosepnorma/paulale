import React from 'react';
import { LEVELS } from '../constants';
import { Level } from '../types';

interface LevelSelectProps {
  onSelectLevel: (level: Level) => void;
  completedLevels: number[];
  stars: Record<string, number>;
}

const LevelSelect: React.FC<LevelSelectProps> = ({ onSelectLevel, completedLevels, stars }) => {
  return (
    <div className="min-h-screen bg-sky-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-sky-900 mb-4 tracking-tight">Tähemaa Seiklus</h1>
          <p className="text-xl text-sky-700 font-medium">Vali oma seiklus!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((level) => {
            const isCompleted = completedLevels.includes(level.id);
            // Unlock level 1, level 7 (Proverbs), level 99 (AI), or if previous level is complete
            const isLocked = level.id !== 1 && level.id !== 7 && level.id !== 99 && !completedLevels.includes(level.id - 1) && !isCompleted;

            return (
              <button
                key={level.id}
                onClick={() => !isLocked && onSelectLevel(level)}
                disabled={isLocked}
                className={`
                  relative overflow-hidden group rounded-2xl p-6 text-left transition-all duration-300 transform 
                  ${isLocked ? 'opacity-60 cursor-not-allowed bg-gray-400' : `${level.color} hover:-translate-y-2 hover:shadow-[0_12px_0_0_rgba(0,0,0,0.2)] shadow-[0_8px_0_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none`}
                  ${isCompleted ? 'ring-4 ring-green-400' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl bg-white/20 p-3 rounded-full backdrop-blur-sm shadow-inner">
                    {isLocked ? '🔒' : level.icon}
                  </span>
                  {isCompleted && (
                    <div className="flex flex-col items-center">
                      <span className="text-2xl" title="Completed">
                        {stars[level.id] === 3 ? '⭐⭐⭐' :
                          stars[level.id] === 2 ? '⭐⭐' :
                            stars[level.id] === 1 ? '⭐' : '✅'}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 shadow-black drop-shadow-md">
                  {level.title}
                </h3>
                <p className="text-white/90 font-medium text-sm leading-relaxed">
                  {level.description}
                </p>

                {level.isAI && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-bl-lg">
                    AI MAAGIA
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;