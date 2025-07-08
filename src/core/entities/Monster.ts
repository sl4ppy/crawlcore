// Monster entity class for managing monster state and AI behavior
export interface MonsterStats {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  xpReward: number;
  aiType: 'SimpleChase' | 'ErraticChase';
}

export interface MonsterInstance {
  id: string; // unique instance id
  stats: MonsterStats;
  position: { x: number; y: number };
}

export class Monster {
  static create(stats: MonsterStats, position: { x: number; y: number }): MonsterInstance {
    return {
      id: `${stats.id}_${Math.random().toString(36).slice(2, 10)}`,
      stats,
      position,
    };
  }
} 