import { type ReactElement } from 'react';
import { useGameStore } from '../../state/gameStore';
import { VIEWPORT_CONFIG } from '../../utils/constants';
import { calculateViewportBounds } from '../../utils/viewportHelpers';
import { SpriteRenderer } from './SpriteRenderer';
import { spriteSystem } from '../../core/systems/SpriteSystem';
import { useEffect, useRef, useState } from 'react';

export const DungeonRenderer = (): ReactElement => {
  const { dungeon, player, monsters, items } = useGameStore();

  if (!dungeon || !player) {
    return <></>;
  }

  // Calculate viewport bounds around the player
  const viewportBounds = calculateViewportBounds(
    player.position.x,
    player.position.y,
    dungeon.width,
    dungeon.height
  );

  const { TILE_SIZE } = VIEWPORT_CONFIG;
  const viewportWidth = viewportBounds.endX - viewportBounds.startX;
  const viewportHeight = viewportBounds.endY - viewportBounds.startY;

  return (
    <div
      style={{
        width: `${VIEWPORT_CONFIG.CANVAS_WIDTH}px`,
        height: `${VIEWPORT_CONFIG.CANVAS_HEIGHT}px`,
        border: '1px solid #333',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a1c2c',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${viewportWidth}, ${TILE_SIZE}px)`,
          gridTemplateRows: `repeat(${viewportHeight}, ${TILE_SIZE}px)`,
          gap: '0px',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {Array.from({ length: viewportHeight }, (_, viewportY) =>
          Array.from({ length: viewportWidth }, (_, viewportX) => {
            const dungeonX = viewportBounds.startX + viewportX;
            const dungeonY = viewportBounds.startY + viewportY;
            // Skip if outside dungeon bounds
            if (dungeonX >= dungeon.width || dungeonY >= dungeon.height) {
              return null;
            }
            const tile = dungeon.tiles[dungeonY][dungeonX];
            // Find entities at this tile
            const item = items.find(item => item.position.x === dungeonX && item.position.y === dungeonY);
            const monster = monsters.find(m => m.position.x === dungeonX && m.position.y === dungeonY);
            const isPlayer = player.position.x === dungeonX && player.position.y === dungeonY;
            return (
              <div
                key={`${dungeonX}-${dungeonY}`}
                style={{
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  position: 'relative',
                }}
              >
                {/* Render tile background */}
                <SpriteRenderer
                  spriteId={
                    tile === 'floor' ? 'tile_floor' :
                    tile === 'stairs_down' ? 'tile_stairs_down' :
                    tile === 'stairs_up' ? 'tile_stairs_up' :
                    'tile_wall'
                  }
                  x={0}
                  y={0}
                  fallbackColor={
                    tile === 'floor' ? '#3a3f5e' :
                    tile === 'stairs_down' ? '#00ff00' :
                    tile === 'stairs_up' ? '#00ffff' :
                    '#5d275d'
                  }
                />
                {/* Render item */}
                {item && (
                  <SpriteRenderer
                    spriteId={spriteSystem.getSpriteForEntity('item', item.template.id)}
                    x={0}
                    y={0}
                    title={item.template.name}
                    fallbackColor="#ffae00"
                  />
                )}
                {/* Render monster */}
                {monster && (
                  <SpriteRenderer
                    spriteId={spriteSystem.getSpriteForEntity('monster', monster.stats.id)}
                    x={0}
                    y={0}
                    title={monster.stats.name}
                    fallbackColor="#ff004d"
                  />
                )}
                {/* Render player */}
                {isPlayer && (
                  <SpriteRenderer
                    spriteId={spriteSystem.getSpriteForEntity('player')}
                    x={0}
                    y={0}
                    fallbackColor="#ffffff"
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}; 