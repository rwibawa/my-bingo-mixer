import { useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { CardDeckScreen } from './components/CardDeckScreen';
import type { AppMode } from './types';

function App() {
  const [appMode, setAppMode] = useState<AppMode | null>(null);

  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  if (appMode === null || (appMode === 'bingo' && gameState === 'start')) {
    return (
      <StartScreen
        onStartBingo={() => { setAppMode('bingo'); startGame(); }}
        onStartShuffle={() => setAppMode('shuffle')}
      />
    );
  }

  if (appMode === 'shuffle') {
    return <CardDeckScreen onBack={() => setAppMode(null)} />;
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={() => { resetGame(); setAppMode(null); }}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;
