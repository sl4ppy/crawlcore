import { VIEWPORT_CONFIG } from './constants';

export interface ViewportBounds {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
}

export interface ViewportOffset {
  offsetX: number;
  offsetY: number;
}

/**
 * Calculate the viewport bounds around the player position
 * Keeps the player centered in the viewport
 */
export const calculateViewportBounds = (
  playerX: number,
  playerY: number,
  dungeonWidth: number,
  dungeonHeight: number
): ViewportBounds => {
  const { VIEWPORT_WIDTH_TILES, VIEWPORT_HEIGHT_TILES } = VIEWPORT_CONFIG;
  
  // Calculate the center of the viewport
  const centerX = Math.floor(VIEWPORT_WIDTH_TILES / 2);
  const centerY = Math.floor(VIEWPORT_HEIGHT_TILES / 2);
  
  // Calculate the starting position of the viewport
  let startX = playerX - centerX;
  let startY = playerY - centerY;
  
  // Clamp to dungeon boundaries
  startX = Math.max(0, Math.min(startX, dungeonWidth - VIEWPORT_WIDTH_TILES));
  startY = Math.max(0, Math.min(startY, dungeonHeight - VIEWPORT_HEIGHT_TILES));
  
  // Calculate end positions
  const endX = Math.min(startX + VIEWPORT_WIDTH_TILES, dungeonWidth);
  const endY = Math.min(startY + VIEWPORT_HEIGHT_TILES, dungeonHeight);
  
  return { startX, endX, startY, endY };
};

/**
 * Calculate the offset for rendering the viewport
 * This ensures the player stays centered when near dungeon edges
 */
export const calculateViewportOffset = (
  playerX: number,
  playerY: number,
  dungeonWidth: number,
  dungeonHeight: number
): ViewportOffset => {
  const { VIEWPORT_WIDTH_TILES, VIEWPORT_HEIGHT_TILES } = VIEWPORT_CONFIG;
  
  const centerX = Math.floor(VIEWPORT_WIDTH_TILES / 2);
  const centerY = Math.floor(VIEWPORT_HEIGHT_TILES / 2);
  
  // Calculate ideal viewport start
  const idealStartX = playerX - centerX;
  const idealStartY = playerY - centerY;
  
  // Calculate actual viewport start (clamped)
  const actualStartX = Math.max(0, Math.min(idealStartX, dungeonWidth - VIEWPORT_WIDTH_TILES));
  const actualStartY = Math.max(0, Math.min(idealStartY, dungeonHeight - VIEWPORT_HEIGHT_TILES));
  
  // Calculate offset to center the player
  const offsetX = (playerX - actualStartX - centerX) * VIEWPORT_CONFIG.TILE_SIZE;
  const offsetY = (playerY - actualStartY - centerY) * VIEWPORT_CONFIG.TILE_SIZE;
  
  return { offsetX, offsetY };
}; 