import { COMBAT_CONFIG, PROGRESSION_CONFIG } from '../../utils/constants';
import { type PlayerStats } from '../entities/Player';
import { type MonsterStats } from '../entities/Monster';

export interface CombatResult {
  hit: boolean;
  critical: boolean;
  damage: number;
  xpGained?: number;
}

export class CombatSystem {
  static attack(
    attacker: { stats: PlayerStats | MonsterStats; weaponPower?: number },
    defender: { stats: PlayerStats | MonsterStats; armorBonus?: number }
  ): CombatResult {
    // Calculate to-hit chance
    // For monsters, use attack as dexterity equivalent, for players use dexterity
    const attackerDex = 'dexterity' in attacker.stats ? attacker.stats.dexterity : attacker.stats.attack;
    const defenderDex = 'dexterity' in defender.stats ? defender.stats.dexterity : defender.stats.defense;
    
    const toHitChance = COMBAT_CONFIG.BASE_TO_HIT_CHANCE + 
      (attackerDex * COMBAT_CONFIG.DEXTERITY_MULTIPLIER) - 
      (defenderDex * COMBAT_CONFIG.DEXTERITY_MULTIPLIER);
    
    const hitRoll = Math.random() * 100;
    const hit = hitRoll <= toHitChance;

    if (!hit) {
      return { hit: false, critical: false, damage: 0 };
    }

    // Calculate damage
    const weaponPower = 'weaponPower' in attacker ? attacker.weaponPower || 0 : 0;
    const armorBonus = 'armorBonus' in defender ? defender.armorBonus || 0 : 0;
    
    // For monsters, use attack as strength equivalent, for players use strength
    const attackerStr = 'strength' in attacker.stats ? attacker.stats.strength : attacker.stats.attack;
    const defenderDef = 'defense' in defender.stats ? defender.stats.defense : 0;
    
    const baseDamage = attackerStr + weaponPower;
    const totalDefense = defenderDef + armorBonus;
    const damage = Math.max(1, baseDamage - totalDefense); // Minimum 1 damage

    // Check for critical hit (only players have luck)
    const attackerLuck = 'luck' in attacker.stats ? attacker.stats.luck : 0;
    const criticalRoll = Math.random() * 100;
    const critical = criticalRoll <= attackerLuck;
    
    const finalDamage = critical ? Math.floor(damage * COMBAT_CONFIG.CRITICAL_MULTIPLIER) : damage;

    return { hit: true, critical, damage: finalDamage };
  }

  static calculateXPForKill(monster: MonsterStats, monsterLevel: number = 1): number {
    return monster.xpReward * monsterLevel;
  }

  static calculateXPForNextLevel(currentLevel: number): number {
    return Math.floor(PROGRESSION_CONFIG.XP_BASE_MULTIPLIER * Math.pow(currentLevel, PROGRESSION_CONFIG.XP_POWER));
  }

  static checkLevelUp(currentXP: number, currentLevel: number): { leveledUp: boolean; newLevel: number } {
    const xpNeeded = this.calculateXPForNextLevel(currentLevel);
    if (currentXP >= xpNeeded) {
      return { leveledUp: true, newLevel: currentLevel + 1 };
    }
    return { leveledUp: false, newLevel: currentLevel };
  }
} 