import React, { useState } from 'react';

interface WelcomeScreenProps {
    onLogin: (name: string) => void;
    onVisitor: () => void;
    isLoading: boolean;
    error: string | null;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin, onVisitor, isLoading, error }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin(name.trim());
        }
    };

    return (
        <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border-b-8 border-sky-200">
                <div className="text-center mb-8">
                    <span className="text-6xl mb-4 block">🏰</span>
                    <h1 className="text-3xl font-black text-sky-900 mb-2">Tere tulemast!</h1>
                    <p className="text-sky-600">Kes sina oled?</p>
                </div>

                <form onSubmit={handleSubmit} className="mb-6">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sinu nimi..."
                        className="w-full text-center text-2xl font-bold p-4 bg-sky-50 border-2 border-sky-200 rounded-xl focus:border-sky-400 focus:outline-none mb-4 text-sky-800 placeholder-sky-300"
                        autoFocus
                        disabled={isLoading}
                    />

                    {error && (
                        <div className="text-red-500 text-sm mb-4 text-center font-medium bg-red-50 p-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!name.trim() || isLoading}
                        className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl text-xl font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all"
                    >
                        {isLoading ? 'Laen...' : 'Alusta Seiklust!'}
                    </button>
                </form>

                <div className="relative flex items-center justify-center mb-6">
                    <hr className="w-full border-gray-200" />
                    <span className="absolute bg-white px-3 text-gray-400 text-sm font-medium">VÕI</span>
                </div>

                <button
                    onClick={onVisitor}
                    disabled={isLoading}
                    className="w-full py-3 bg-white border-2 border-gray-200 text-gray-500 hover:bg-gray-50 rounded-xl font-bold text-lg transition-colors"
                >
                    Mängi Külalisena
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
