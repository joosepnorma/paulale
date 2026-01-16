import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, Level } from './types';
import { LEVELS } from './constants';
import VirtualKeyboard from './components/VirtualKeyboard';
import TypingArea from './components/TypingArea';
import LevelSelect from './components/LevelSelect';
import { generateEstonianText } from './services/geminiService';

const App: React.FC = () => {
  // --- State ---
  const [screen, setScreen] = useState<'menu' | 'playing' | 'results'>('menu');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  
  // Game Logic State
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // --- Helpers ---
  
  const startGame = useCallback(async (level: Level) => {
    setCurrentLevel(level);
    setScreen('playing');
    setErrors(0);
    setUserInput('');
    setCurrentSentenceIdx(0);
    setStartTime(null);
    
    if (level.isAI) {
      // Use a loading sentence that acts as the first level task
      const loadingSentence = "Laen maagiat...";
      // We add a temporary second sentence to ensure the game doesn't end 
      // if the user finishes the first one before AI returns
      setSentences([loadingSentence, "Palun oota..."]); 
      
      const generated = await generateEstonianText();
      
      // Once data arrives, we keep the loading sentence as the first one
      // and append the generated sentences after it.
      // This ensures the text the user is currently typing doesn't change.
      setSentences([loadingSentence, ...generated]);
    } else {
      setSentences(level.content);
    }
  }, []);

  const handleLevelComplete = useCallback(() => {
    if (currentLevel) {
        if (!completedLevels.includes(currentLevel.id)) {
            setCompletedLevels(prev => [...prev, currentLevel.id]);
        }
    }
    setScreen('results');
  }, [currentLevel, completedLevels]);

  const nextSentence = useCallback(() => {
    if (currentSentenceIdx < sentences.length - 1) {
        setCurrentSentenceIdx(prev => prev + 1);
        setUserInput('');
    } else {
        handleLevelComplete();
    }
  }, [currentSentenceIdx, sentences.length, handleLevelComplete]);

  // --- Input Handling ---

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (screen !== 'playing') return;
    if (!isFocused) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    
    const targetText = sentences[currentSentenceIdx];
    if (!targetText) return;

    if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
        return;
    }

    if (e.key.length === 1) {
        if (!startTime) setStartTime(Date.now());

        // Standard typing logic: allow typing up to the target length
        if (userInput.length >= targetText.length) return;

        const nextCharExpected = targetText[userInput.length];
        const newTyped = userInput + e.key;
        
        setUserInput(newTyped);

        if (e.key !== nextCharExpected) {
            setErrors(prev => prev + 1);
        } else {
            // Only advance to next sentence if the ENTIRE input is now correct
            if (newTyped === targetText) {
                setTimeout(nextSentence, 200);
            }
        }
    }
  }, [screen, isFocused, sentences, currentSentenceIdx, userInput, startTime, nextSentence]);

  // Global event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus tracking
  useEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    return () => {
        window.removeEventListener('focus', onFocus);
        window.removeEventListener('blur', onBlur);
    };
  }, []);


  // --- Logic for guiding the user ---
  
  const targetText = sentences[currentSentenceIdx] || "";
  
  // Find the first index where typing is wrong
  let firstErrorIdx = -1;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] !== targetText[i]) {
      firstErrorIdx = i;
      break;
    }
  }

  // The character the child SHOULD be typing/correcting
  // If there's an error, guide them to fix the first error
  // If no error, guide them to the next character in the sequence
  const nextCharIdx = firstErrorIdx !== -1 ? firstErrorIdx : userInput.length;
  const nextChar = targetText[nextCharIdx] || "";
  
  const progressPercent = ((currentSentenceIdx) / sentences.length) * 100;

  if (screen === 'menu') {
    return <LevelSelect onSelectLevel={startGame} completedLevels={completedLevels} />;
  }

  if (screen === 'results') {
    return (
        <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 shadow-xl max-w-lg w-full text-center border-b-8 border-sky-200">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-4xl font-bold text-sky-900 mb-2">Tubli töö!</h2>
                <p className="text-xl text-sky-600 mb-8">Sa said hakkama!</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-green-100 p-4 rounded-xl">
                        <div className="text-sm text-green-700 font-bold uppercase">Vigu</div>
                        <div className="text-3xl font-black text-green-900">{errors}</div>
                    </div>
                     <div className="bg-purple-100 p-4 rounded-xl">
                        <div className="text-sm text-purple-700 font-bold uppercase">Lauseid</div>
                        <div className="text-3xl font-black text-purple-900">{sentences.length}</div>
                    </div>
                </div>

                <button 
                    onClick={() => setScreen('menu')}
                    className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xl font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all"
                >
                    Tagasi algusesse
                </button>
            </div>
        </div>
    );
  }

  return (
    <div 
        className="min-h-screen bg-sky-50 flex flex-col items-center p-2"
        onClick={() => setIsFocused(true)}
    >
      <div className="w-full max-w-4xl flex justify-between items-center mb-4 pt-2">
        <button 
            onClick={() => setScreen('menu')}
            className="bg-white text-sky-600 px-3 py-1.5 rounded-lg font-bold shadow-sm hover:bg-sky-50 border-2 border-sky-100 text-sm"
        >
            ← Menüü
        </button>
        <div className="flex-1 mx-4 sm:mx-8">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-green-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
        <div className="text-xl font-bold text-sky-800">
            {currentLevel?.icon}
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col justify-center items-center">
        <div className="mb-2 text-sky-800 font-medium text-base opacity-80 animate-bounce-slight h-6">
           {firstErrorIdx !== -1 ? (
             <span className="text-red-500 font-bold">Paranda viga! (Backspace)</span>
           ) : nextChar === ' ' ? (
             'Vajuta TÜHIK'
           ) : nextChar ? (
             `Vajuta: ${nextChar.toUpperCase()}`
           ) : (
             'Valmis!'
           )}
        </div>
        
        <TypingArea 
            targetText={targetText}
            userInput={userInput}
            isFocused={isFocused}
        />

        <div className="mt-2 w-full">
            <VirtualKeyboard 
                activeKey={nextChar}
                errorKey={null} 
            />
        </div>
      </div>
      
      <div className="mt-4 text-slate-400 text-xs font-medium">
         Eesti Klaviatuurimäng • {currentLevel?.title}
      </div>
    </div>
  );
};

export default App;