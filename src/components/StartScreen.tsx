interface StartScreenProps {
  onStartBingo: () => void;
  onStartShuffle: () => void;
}

export function StartScreen({ onStartBingo, onStartShuffle }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gray-50">
      <div className="text-center max-w-sm w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Bingo Mixer</h1>
        <p className="text-lg text-gray-600 mb-8">Find your people!</p>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-gray-800 mb-1">🎯 Bingo Game</h2>
            <p className="text-sm text-gray-500 mb-4">Find 5 in a row to win!</p>
            <button
              onClick={onStartBingo}
              className="w-full bg-accent text-white font-semibold py-3 px-6 rounded-lg text-base active:bg-accent-light transition-colors"
            >
              Play Bingo
            </button>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-gray-800 mb-1">🃏 Card Deck Shuffle</h2>
            <p className="text-sm text-gray-500 mb-4">Tap to flip a random question card</p>
            <button
              onClick={onStartShuffle}
              className="w-full bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg text-base active:bg-gray-700 transition-colors"
            >
              Shuffle Cards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
