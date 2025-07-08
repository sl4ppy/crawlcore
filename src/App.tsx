import { type ReactElement } from 'react';
import { GameCanvas } from './components/game/GameCanvas';
import { HUD } from './components/ui/HUD';
import { useGameStore } from './state/gameStore';
import './App.css';

function App(): ReactElement {
  const { isGameRunning, startGame, player } = useGameStore();

  const renderGameOverScreen = () => (
    <div style={{ 
      textAlign: 'center', 
      margin: '20px',
      color: '#fff',
      background: '#222',
      padding: '40px',
      borderRadius: '8px',
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <h2 style={{ color: '#ff004d', marginBottom: '20px' }}>Game Over</h2>
      <p style={{ marginBottom: '20px' }}>
        Your adventure has ended. You survived {player?.stats.level || 1} levels and gained {player?.stats.xp || 0} experience.
      </p>
      <button 
        onClick={startGame}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#5d275d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        Try Again
      </button>
    </div>
  );

  const renderMainMenu = () => (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1 style={{ color: '#fff', marginBottom: '30px' }}>CrawlCore</h1>
      <p style={{ color: '#ccc', marginBottom: '30px' }}>
        A roguelike adventure awaits in the depths below...
      </p>
      <button 
        onClick={startGame}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#5d275d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Start New Game
      </button>
      <div style={{ marginTop: '20px', color: '#888', fontSize: '14px' }}>
        <p>Use WASD or Arrow Keys to move</p>
        <p>Move into monsters to attack them</p>
        <p>Move into items to pick them up</p>
        <p>Watch your hunger - it decreases over time!</p>
      </div>
    </div>
  );

  const renderGameScreen = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
      <HUD />
      <GameCanvas />
    </div>
  );

  return (
    <div className="App" style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1c2c',
      padding: '20px'
    }}>
      {!isGameRunning ? (
        player ? renderGameOverScreen() : renderMainMenu()
      ) : (
        renderGameScreen()
      )}
    </div>
  );
}

export default App;
