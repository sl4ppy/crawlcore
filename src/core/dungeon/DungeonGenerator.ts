import { DUNGEON_CONFIG } from '../../utils/constants';

export type TileType = 'floor' | 'wall' | 'stairs_up' | 'stairs_down';

export interface Room {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DungeonMap {
  width: number;
  height: number;
  tiles: TileType[][];
  rooms: Room[];
  stairsUp?: { x: number; y: number };
  stairsDown?: { x: number; y: number };
}

export class DungeonGenerator {
  private width: number;
  private height: number;
  private roomAttempts: number;
  private minRoomSize: number;
  private maxRoomSize: number;

  constructor() {
    this.width = DUNGEON_CONFIG.MAP_WIDTH;
    this.height = DUNGEON_CONFIG.MAP_HEIGHT;
    this.roomAttempts = DUNGEON_CONFIG.ROOM_ATTEMPTS;
    this.minRoomSize = DUNGEON_CONFIG.MIN_ROOM_SIZE;
    this.maxRoomSize = DUNGEON_CONFIG.MAX_ROOM_SIZE;
  }

  generate(level: number = 1): DungeonMap {
    // Initialize map with all walls
    const tiles: TileType[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill('wall')
    );

    const rooms: Room[] = [];
    const placedRooms: Room[] = [];

    // Generate rooms
    for (let attempt = 0; attempt < this.roomAttempts; attempt++) {
      const room = this.generateRandomRoom();
      
      if (this.isRoomValid(room, placedRooms)) {
        this.placeRoom(room, tiles);
        placedRooms.push(room);
        rooms.push(room);
      }
    }

    // Connect rooms with corridors
    for (let i = 0; i < rooms.length - 1; i++) {
      this.connectRooms(rooms[i], rooms[i + 1], tiles);
    }

    // Player start position (center of first room)
    const playerStart = this.getPlayerStartPosition(rooms);

    // Place stairs based on level
    let stairsUp: { x: number; y: number } | undefined = undefined;
    if (level > 1) {
      tiles[playerStart.y][playerStart.x] = 'stairs_up';
      stairsUp = { x: playerStart.x, y: playerStart.y };
    }
    const stairsDown = this.placeStairsDown(rooms, tiles);

    return {
      width: this.width,
      height: this.height,
      tiles,
      rooms,
      stairsUp,
      stairsDown
    };
  }

  private generateRandomRoom(): Room {
    const width = Math.floor(Math.random() * (this.maxRoomSize - this.minRoomSize + 1)) + this.minRoomSize;
    const height = Math.floor(Math.random() * (this.maxRoomSize - this.minRoomSize + 1)) + this.minRoomSize;
    const x = Math.floor(Math.random() * (this.width - width - 1)) + 1;
    const y = Math.floor(Math.random() * (this.height - height - 1)) + 1;

    return { x, y, width, height };
  }

  private isRoomValid(room: Room, existingRooms: Room[]): boolean {
    // Check if room is within bounds
    if (room.x < 1 || room.y < 1 || 
        room.x + room.width >= this.width - 1 || 
        room.y + room.height >= this.height - 1) {
      return false;
    }

    // Check for overlap with existing rooms
    for (const existingRoom of existingRooms) {
      if (this.roomsOverlap(room, existingRoom)) {
        return false;
      }
    }

    return true;
  }

  private roomsOverlap(room1: Room, room2: Room): boolean {
    return !(room1.x + room1.width < room2.x || 
             room2.x + room2.width < room1.x || 
             room1.y + room1.height < room2.y || 
             room2.y + room2.height < room1.y);
  }

  private placeRoom(room: Room, tiles: TileType[][]): void {
    for (let y = room.y; y < room.y + room.height; y++) {
      for (let x = room.x; x < room.x + room.width; x++) {
        tiles[y][x] = 'floor';
      }
    }
  }

  private connectRooms(room1: Room, room2: Room, tiles: TileType[][]): void {
    const center1 = {
      x: Math.floor(room1.x + room1.width / 2),
      y: Math.floor(room1.y + room1.height / 2)
    };
    const center2 = {
      x: Math.floor(room2.x + room2.width / 2),
      y: Math.floor(room2.y + room2.height / 2)
    };

    // Create L-shaped corridor
    const cornerX = center1.x;
    const cornerY = center2.y;

    // Horizontal corridor from room1 to corner
    this.createCorridor(center1.x, center1.y, cornerX, cornerY, tiles);
    // Vertical corridor from corner to room2
    this.createCorridor(cornerX, cornerY, center2.x, center2.y, tiles);
  }

  private createCorridor(x1: number, y1: number, x2: number, y2: number, tiles: TileType[][]): void {
    // Horizontal line
    const startX = Math.min(x1, x2);
    const endX = Math.max(x1, x2);
    for (let x = startX; x <= endX; x++) {
      if (x >= 0 && x < this.width && y1 >= 0 && y1 < this.height) {
        tiles[y1][x] = 'floor';
      }
    }

    // Vertical line
    const startY = Math.min(y1, y2);
    const endY = Math.max(y1, y2);
    for (let y = startY; y <= endY; y++) {
      if (x2 >= 0 && x2 < this.width && y >= 0 && y < this.height) {
        tiles[y][x2] = 'floor';
      }
    }
  }

  private placeStairsDown(rooms: Room[], tiles: TileType[][]): { x: number; y: number } | undefined {
    if (rooms.length === 0) return undefined;

    // Place stairs down in the last room
    const lastRoom = rooms[rooms.length - 1];
    
    const x = Math.floor(lastRoom.x + lastRoom.width / 2);
    const y = Math.floor(lastRoom.y + lastRoom.height / 2);
    
    tiles[y][x] = 'stairs_down';
    return { x, y };
  }

  getPlayerStartPosition(rooms: Room[]): { x: number; y: number } {
    if (rooms.length === 0) {
      return { x: Math.floor(this.width / 2), y: Math.floor(this.height / 2) };
    }

    // Start in the center of the first room
    const firstRoom = rooms[0];
    return {
      x: Math.floor(firstRoom.x + firstRoom.width / 2),
      y: Math.floor(firstRoom.y + firstRoom.height / 2)
    };
  }
} 