import { type ReactElement } from 'react';
import { spriteSystem } from '../../core/systems/SpriteSystem';
import { VIEWPORT_CONFIG } from '../../utils/constants';

interface SpriteRendererProps {
  spriteId: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  title?: string;
  fallbackColor?: string;
  fallbackEmoji?: string;
}

export const SpriteRenderer = ({
  spriteId,
  x,
  y,
  width = VIEWPORT_CONFIG.TILE_SIZE,
  height = VIEWPORT_CONFIG.TILE_SIZE,
  title,
  fallbackColor,
  fallbackEmoji,
}: SpriteRendererProps): ReactElement => {
  const sprite = spriteSystem.getSprite(spriteId);
  const fallbackSprite = spriteSystem.getFallbackSprite(spriteId);

  if (sprite) {
    // Render actual sprite image
    return (
      <img
        src={sprite.src}
        alt={spriteId}
        title={title}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width,
          height,
          imageRendering: 'pixelated', // For retro pixel art look
        }}
      />
    );
  }

  // Fallback to emoji or colored square
  if (fallbackEmoji || fallbackSprite !== '❓') {
    return (
      <div
        title={title}
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${Math.min(width, height) * 0.6}px`,
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {fallbackEmoji || fallbackSprite}
      </div>
    );
  }

  // Final fallback to colored square
  return (
    <div
      title={title}
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        backgroundColor: fallbackColor || '#666',
      }}
    />
  );
}; 