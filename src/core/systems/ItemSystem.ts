import { type ItemInstance } from '../entities/Item';
import { type PlayerStats } from '../entities/Player';
import { getRandomInt } from '../../utils/gameHelpers';

export interface ItemUsageResult {
  success: boolean;
  message: string;
  itemConsumed: boolean;
  statsChanged?: Partial<PlayerStats>;
}

export class ItemSystem {
  static useItem(item: ItemInstance, playerStats: PlayerStats): ItemUsageResult {
    if (!item.identified) {
      return {
        success: false,
        message: `You don't know what this ${item.template.type.toLowerCase()} does.`,
        itemConsumed: false,
      };
    }

    switch (item.template.effect.type) {
      case 'HEAL':
        return this.useHealingItem(item, playerStats);
      case 'BUFF':
        return this.useBuffItem(item, playerStats);
      case 'RESTORE_HUNGER':
        return this.useFoodItem(item, playerStats);
      case 'IDENTIFY':
        return this.useIdentifyScroll(item);
      case 'DAMAGE':
        return this.useDamageScroll(item);
      case 'TELEPORT':
        return this.useTeleportScroll(item);
      case 'MAP':
        return this.useMagicMappingScroll(item);
      case 'REMOVE_CURSE':
        return this.useRemoveCurseScroll(item);
      case 'ENCHANT':
        return this.useEnchantScroll(item);
      case 'EQUIP':
        return {
          success: false,
          message: `${item.template.name} must be equipped, not used.`,
          itemConsumed: false,
        };
      default:
        return {
          success: false,
          message: `You can't figure out how to use ${item.template.name}.`,
          itemConsumed: false,
        };
    }
  }

  private static useHealingItem(item: ItemInstance, playerStats: PlayerStats): ItemUsageResult {
    const effect = item.template.effect;
    if (effect.type !== 'HEAL' || !effect.amount) {
      return {
        success: false,
        message: 'Invalid healing item.',
        itemConsumed: false,
      };
    }

    // Parse healing amount (e.g., "2d4+2")
    const healAmount = this.parseDiceExpression(String(effect.amount));
    const newHp = Math.min(playerStats.maxHp, playerStats.hp + healAmount);
    const actualHeal = newHp - playerStats.hp;

    return {
      success: true,
      message: `You drink ${item.template.name} and recover ${actualHeal} HP.`,
      itemConsumed: true,
      statsChanged: { hp: newHp },
    };
  }

  private static useBuffItem(item: ItemInstance, playerStats: PlayerStats): ItemUsageResult {
    const effect = item.template.effect;
    if (effect.type !== 'BUFF' || !effect.stat || effect.amount === undefined) {
      return {
        success: false,
        message: 'Invalid buff item.',
        itemConsumed: false,
      };
    }

    // Map stat names to actual player stats, with fallbacks for unsupported stats
    const statMapping: Record<string, keyof PlayerStats> = {
      'strength': 'strength',
      'dexterity': 'dexterity',
      'luck': 'luck',
      'speed': 'dexterity', // Map speed to dexterity as fallback
      'invisibility': 'luck', // Map invisibility to luck as fallback
    };

    const statName = effect.stat.toLowerCase();
    const mappedStat = statMapping[statName];
    
    if (!mappedStat) {
      return {
        success: false,
        message: `The ${item.template.name} has no effect on you.`,
        itemConsumed: false,
      };
    }

    const currentValue = playerStats[mappedStat];
    const newValue = currentValue + Number(effect.amount);

    return {
      success: true,
      message: `You drink ${item.template.name}. Your ${effect.stat} increases by ${effect.amount}!`,
      itemConsumed: true,
      statsChanged: { [mappedStat]: newValue },
    };
  }

  private static useFoodItem(item: ItemInstance, playerStats: PlayerStats): ItemUsageResult {
    const effect = item.template.effect;
    if (effect.type !== 'RESTORE_HUNGER' || effect.amount === undefined) {
      return {
        success: false,
        message: 'Invalid food item.',
        itemConsumed: false,
      };
    }

    const newHunger = Math.min(1000, playerStats.hunger + Number(effect.amount));
    const restored = newHunger - playerStats.hunger;

    return {
      success: true,
      message: `You eat ${item.template.name} and restore ${restored} hunger.`,
      itemConsumed: true,
      statsChanged: { hunger: newHunger },
    };
  }

  private static useIdentifyScroll(item: ItemInstance): ItemUsageResult {
    return {
      success: true,
      message: `You read ${item.template.name}. It reveals the properties of items.`,
      itemConsumed: true,
    };
  }

  private static useDamageScroll(item: ItemInstance): ItemUsageResult {
    const effect = item.template.effect;
    if (effect.type !== 'DAMAGE' || !effect.amount) {
      return {
        success: false,
        message: 'Invalid damage scroll.',
        itemConsumed: false,
      };
    }

    const damageAmount = this.parseDiceExpression(String(effect.amount));
    return {
      success: true,
      message: `You read ${item.template.name} and unleash ${damageAmount} damage!`,
      itemConsumed: true,
    };
  }

  private static useTeleportScroll(item: ItemInstance): ItemUsageResult {
    return {
      success: true,
      message: `You read ${item.template.name} and feel yourself being pulled through space!`,
      itemConsumed: true,
    };
  }

  private static useMagicMappingScroll(item: ItemInstance): ItemUsageResult {
    return {
      success: true,
      message: `You read ${item.template.name} and the dungeon layout becomes clear in your mind!`,
      itemConsumed: true,
    };
  }

  private static useRemoveCurseScroll(item: ItemInstance): ItemUsageResult {
    return {
      success: true,
      message: `You read ${item.template.name} and feel a cleansing energy flow through you!`,
      itemConsumed: true,
    };
  }

  private static useEnchantScroll(item: ItemInstance): ItemUsageResult {
    const effect = item.template.effect;
    if (effect.type !== 'ENCHANT' || !effect.target || !effect.amount) {
      return {
        success: false,
        message: 'Invalid enchant scroll.',
        itemConsumed: false,
      };
    }

    return {
      success: true,
      message: `You read ${item.template.name} and your ${effect.target.toLowerCase()} glows with magical energy!`,
      itemConsumed: true,
    };
  }

  private static parseDiceExpression(expression: string): number {
    // Simple dice parser for expressions like "2d4+2"
    const match = expression.match(/(\d+)d(\d+)([+-]\d+)?/);
    if (!match) {
      return parseInt(expression) || 0;
    }

    const [, dice, sides, modifier] = match;
    const numDice = parseInt(dice);
    const numSides = parseInt(sides);
    const mod = modifier ? parseInt(modifier) : 0;

    let total = 0;
    for (let i = 0; i < numDice; i++) {
      total += getRandomInt(1, numSides);
    }

    return total + mod;
  }

  static canUseItem(item: ItemInstance): boolean {
    return item.identified && item.template.effect.type !== 'EQUIP';
  }

  static canEquipItem(item: ItemInstance): boolean {
    return item.identified && item.template.effect.type === 'EQUIP';
  }

  static getItemDescription(item: ItemInstance): string {
    if (!item.identified) {
      return `An unidentified ${item.template.type.toLowerCase()}.`;
    }

    const effect = item.template.effect;
    switch (effect.type) {
      case 'HEAL':
        return `Restores ${effect.amount} HP when consumed.`;
      case 'BUFF':
        return `Increases ${effect.stat} by ${effect.amount} for ${effect.duration} turns.`;
      case 'RESTORE_HUNGER':
        return `Restores ${effect.amount} hunger when consumed.`;
      case 'IDENTIFY':
        return 'Reveals the properties of unidentified items.';
      case 'DAMAGE':
        return `Deals ${effect.amount} damage when read.`;
      case 'TELEPORT':
        return 'Teleports you to a random location when read.';
      case 'MAP':
        return 'Reveals the entire dungeon layout when read.';
      case 'REMOVE_CURSE':
        return 'Removes curses from equipped items when read.';
      case 'ENCHANT':
        return `Enchants your ${effect.target?.toLowerCase()} with +${effect.amount} bonus when read.`;
      case 'EQUIP':
        if (effect.slot === 'WEAPON') {
          return `Weapon with +${effect.attack_bonus} attack bonus.`;
        } else if (effect.slot === 'ARMOR') {
          return `Armor with +${effect.defense_bonus} defense bonus.`;
        }
        return 'Equipment item.';
      default:
        return 'A mysterious item.';
    }
  }
} 