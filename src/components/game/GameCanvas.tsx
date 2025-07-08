import { type ReactElement, useEffect } from 'react';
import { DungeonRenderer } from './DungeonRenderer';
import { useGameStore } from '../../state/gameStore';

const MOVES = {
  ArrowUp: { dx: 0, dy: -1 },
  ArrowDown: { dx: 0, dy: 1 },
  ArrowLeft: { dx: -1, dy: 0 },
  ArrowRight: { dx: 1, dy: 0 },
  w: { dx: 0, dy: -1 },
  s: { dx: 0, dy: 1 },
  a: { dx: -1, dy: 0 },
  d: { dx: 1, dy: 0 },
};

// Main PixiJS canvas component for rendering the game world
export const GameCanvas = (): ReactElement => {
  const { dungeon, player, setPlayerPosition, turnCount } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!dungeon || !player) return;
      const move = MOVES[e.key as keyof typeof MOVES];
      if (!move) return;
      const newX = player.position.x + move.dx;
      const newY = player.position.y + move.dy;
      // Prevent moving out of bounds or into walls
      if (
        newX >= 0 &&
        newX < dungeon.width &&
        newY >= 0 &&
        newY < dungeon.height &&
        (dungeon.tiles[newY][newX] === 'floor' ||
         dungeon.tiles[newY][newX] === 'stairs_down' ||
         dungeon.tiles[newY][newX] === 'stairs_up')
      ) {
        setPlayerPosition(newX, newY);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dungeon, player, setPlayerPosition]);

  if (!dungeon) {
    return (
      <div 
        style={{
          width: '800px',
          height: '600px',
          backgroundColor: '#1a1c2c',
          border: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        <p>No dungeon generated yet</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ color: '#fff', marginBottom: 8, fontFamily: 'monospace' }}>Turn: {turnCount}</div>
      <DungeonRenderer />
    </div>
  );
}; 