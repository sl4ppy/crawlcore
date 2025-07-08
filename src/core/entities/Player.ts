import { type ItemInstance, ITEM_TEMPLATES, Item } from './Item';

// Player entity class for managing player state and behavior
export interface PlayerStats {
  hp: number;
  maxHp: number;
  strength: number;
  dexterity: number;
  luck: number;
  level: number;
  xp: number;
  hunger: number;
}

export interface PlayerInventory {
  items: ItemInstance[];
  equippedWeapon?: ItemInstance;
  equippedArmor?: ItemInstance;
}

export interface Player {
  stats: PlayerStats;
  position: { x: number; y: number };
  inventory: PlayerInventory;
}

export class Player {
  static createInitialInventory(): PlayerInventory {
    // Start with 2 identified Scrolls of Identify
    const identifyTemplate = ITEM_TEMPLATES.find(t => t.id === 'scroll_identify');
    const scrolls: ItemInstance[] = identifyTemplate
      ? [Item.create(identifyTemplate, { x: 0, y: 0 }), Item.create(identifyTemplate, { x: 0, y: 0 })]
      : [];
    scrolls.forEach(s => (s.identified = true));
    return {
      items: scrolls,
      equippedWeapon: undefined,
      equippedArmor: undefined,
    };
  }

  static getEquipmentBonuses(inventory: PlayerInventory): { attackBonus: number; defenseBonus: number } {
    let attackBonus = 0;
    let defenseBonus = 0;

    if (inventory.equippedWeapon?.template.effect.type === 'EQUIP') {
      attackBonus += inventory.equippedWeapon.template.effect.attack_bonus || 0;
    }

    if (inventory.equippedArmor?.template.effect.type === 'EQUIP') {
      defenseBonus += inventory.equippedArmor.template.effect.defense_bonus || 0;
    }

    return { attackBonus, defenseBonus };
  }

  static addItemToInventory(inventory: PlayerInventory, item: ItemInstance): PlayerInventory {
    return {
      ...inventory,
      items: [...inventory.items, item],
    };
  }

  static removeItemFromInventory(inventory: PlayerInventory, itemId: string): PlayerInventory {
    return {
      ...inventory,
      items: inventory.items.filter(item => item.id !== itemId),
      equippedWeapon: inventory.equippedWeapon?.id === itemId ? undefined : inventory.equippedWeapon,
      equippedArmor: inventory.equippedArmor?.id === itemId ? undefined : inventory.equippedArmor,
    };
  }

  static equipItem(inventory: PlayerInventory, itemId: string): PlayerInventory {
    const item = inventory.items.find(i => i.id === itemId);
    if (!item || item.template.effect.type !== 'EQUIP') {
      return inventory;
    }

    const slot = item.template.effect.slot;
    if (slot === 'WEAPON') {
      return {
        ...inventory,
        equippedWeapon: item,
      };
    } else if (slot === 'ARMOR') {
      return {
        ...inventory,
        equippedArmor: item,
      };
    }

    return inventory;
  }

  static unequipItem(inventory: PlayerInventory, slot: 'WEAPON' | 'ARMOR'): PlayerInventory {
    if (slot === 'WEAPON') {
      return {
        ...inventory,
        equippedWeapon: undefined,
      };
    } else if (slot === 'ARMOR') {
      return {
        ...inventory,
        equippedArmor: undefined,
      };
    }
    return inventory;
  }
} 