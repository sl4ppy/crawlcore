// Item system for managing items in the game world

// Expanded ItemType to include more specific categories if needed in the future.
export type ItemType = 'POTION' | 'SCROLL' | 'WEAPON' | 'ARMOR' | 'FOOD';

// Expanded ItemEffect to handle new item functionalities like damage scrolls, teleportation, etc.
export interface ItemEffect {
  type: 'HEAL' | 'BUFF' | 'IDENTIFY' | 'EQUIP' | 'RESTORE_HUNGER' | 'DAMAGE' | 'TELEPORT' | 'MAP' | 'REMOVE_CURSE' | 'ENCHANT';
  amount?: number | string; // For HEAL/DAMAGE: "2d4+2", for BUFF: 3, for RESTORE_HUNGER: 250, for ENCHANT: 1
  stat?: string;          // For BUFF: "Strength", "Dexterity", "Haste", etc.
  duration?: number;      // For BUFF: duration in turns
  slot?: 'WEAPON' | 'ARMOR'; // For EQUIP
  target?: 'WEAPON' | 'ARMOR'; // For ENCHANT scrolls
  attack_bonus?: number;  // For WEAPON
  defense_bonus?: number; // For ARMOR
}

export interface ItemTemplate {
  id: string;
  name: string;
  spriteId: string; // Corresponds to an asset key for the item's visual representation
  type: ItemType;
  effect: ItemEffect;
  tier?: number; // Rarity tier for weapons and armor (1-7, higher = rarer)
}

export interface ItemInstance {
  id: string; // unique instance id, e.g., "short_sword_a4f8b"
  template: ItemTemplate;
  position: { x: number; y: number };
  identified: boolean;
}

/**
 * The master list of all item templates available in the game.
 * This array is expanded to include a wide variety of items for a classic roguelike experience.
 */
export const ITEM_TEMPLATES: ItemTemplate[] = [
  // =================================================================
  // POTIONS
  // =================================================================
  {
    id: 'potion_minor_health',
    name: 'Minor Health Potion',
    spriteId: 'potion_red_small',
    type: 'POTION',
    effect: { type: 'HEAL', amount: '1d8' }
  },
  {
    id: 'potion_health',
    name: 'Health Potion',
    spriteId: 'potion_red_medium',
    type: 'POTION',
    effect: { type: 'HEAL', amount: '2d8+2' }
  },
  {
    id: 'potion_major_health',
    name: 'Major Health Potion',
    spriteId: 'potion_red_large',
    type: 'POTION',
    effect: { type: 'HEAL', amount: '4d8+4' }
  },
  {
    id: 'potion_strength',
    name: 'Potion of Strength',
    spriteId: 'potion_orange',
    type: 'POTION',
    effect: { type: 'BUFF', stat: 'Strength', amount: 2, duration: 20 }
  },
  {
    id: 'potion_greater_strength',
    name: 'Potion of Greater Strength',
    spriteId: 'potion_orange_large',
    type: 'POTION',
    effect: { type: 'BUFF', stat: 'Strength', amount: 4, duration: 30 }
  },
  {
    id: 'potion_agility',
    name: 'Potion of Agility',
    spriteId: 'potion_green',
    type: 'POTION',
    effect: { type: 'BUFF', stat: 'Dexterity', amount: 2, duration: 20 }
  },
  {
    id: 'potion_haste',
    name: 'Potion of Haste',
    spriteId: 'potion_yellow',
    type: 'POTION',
    effect: { type: 'BUFF', stat: 'Speed', amount: 5, duration: 10 }
  },
  {
    id: 'potion_invisibility',
    name: 'Potion of Invisibility',
    spriteId: 'potion_clear',
    type: 'POTION',
    effect: { type: 'BUFF', stat: 'Invisibility', amount: 1, duration: 25 }
  },

  // =================================================================
  // SCROLLS
  // =================================================================
  {
    id: 'scroll_identify',
    name: 'Identify Scroll',
    spriteId: 'scroll_1',
    type: 'SCROLL',
    effect: { type: 'IDENTIFY' }
  },
  {
    id: 'scroll_teleport',
    name: 'Scroll of Teleportation',
    spriteId: 'scroll_2',
    type: 'SCROLL',
    effect: { type: 'TELEPORT' }
  },
  {
    id: 'scroll_magic_mapping',
    name: 'Scroll of Magic Mapping',
    spriteId: 'scroll_3',
    type: 'SCROLL',
    effect: { type: 'MAP' }
  },
  {
    id: 'scroll_remove_curse',
    name: 'Scroll of Remove Curse',
    spriteId: 'scroll_4',
    type: 'SCROLL',
    effect: { type: 'REMOVE_CURSE' }
  },
  {
    id: 'scroll_enchant_weapon',
    name: 'Scroll of Enchant Weapon',
    spriteId: 'scroll_5',
    type: 'SCROLL',
    effect: { type: 'ENCHANT', target: 'WEAPON', amount: 1 }
  },
  {
    id: 'scroll_enchant_armor',
    name: 'Scroll of Enchant Armor',
    spriteId: 'scroll_6',
    type: 'SCROLL',
    effect: { type: 'ENCHANT', target: 'ARMOR', amount: 1 }
  },
  {
    id: 'scroll_fireball',
    name: 'Scroll of Fireball',
    spriteId: 'scroll_7_fire',
    type: 'SCROLL',
    effect: { type: 'DAMAGE', amount: '6d6' }
  },

  // =================================================================
  // WEAPONS
  // =================================================================
  // --- Tier 1 (Common) ---
  { id: 'dagger', name: 'Dagger', spriteId: 'dagger_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 1 }, tier: 1 },
  { id: 'club', name: 'Club', spriteId: 'club_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 1 }, tier: 1 },
  { id: 'staff', name: 'Staff', spriteId: 'staff_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 1 }, tier: 1 },
  // --- Tier 2 (Uncommon) ---
  { id: 'short_sword', name: 'Short Sword', spriteId: 'sword_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 2 }, tier: 2 },
  { id: 'hand_axe', name: 'Hand Axe', spriteId: 'axe_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 2 }, tier: 2 },
  { id: 'mace', name: 'Mace', spriteId: 'mace_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 2 }, tier: 2 },
  { id: 'spear', name: 'Spear', spriteId: 'spear_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 2 }, tier: 2 },
  // --- Tier 3 (Rare) ---
  { id: 'scimitar', name: 'Scimitar', spriteId: 'scimitar_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 3 }, tier: 3 },
  { id: 'morningstar', name: 'Morningstar', spriteId: 'morningstar_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 3 }, tier: 3 },
  { id: 'shortbow', name: 'Shortbow', spriteId: 'bow_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 3 }, tier: 3 },
  // --- Tier 4 (Very Rare) ---
  { id: 'longsword', name: 'Longsword', spriteId: 'sword_2', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 4 }, tier: 4 },
  { id: 'battle_axe', name: 'Battle Axe', spriteId: 'axe_2', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 4 }, tier: 4 },
  { id: 'flail', name: 'Flail', spriteId: 'flail_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 4 }, tier: 4 },
  // --- Tier 5 (Epic) ---
  { id: 'broadsword', name: 'Broadsword', spriteId: 'sword_3', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 5 }, tier: 5 },
  { id: 'war_hammer', name: 'War Hammer', spriteId: 'hammer_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 5 }, tier: 5 },
  { id: 'longbow', name: 'Longbow', spriteId: 'bow_2', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 5 }, tier: 5 },
  // --- Tier 6 (Legendary) ---
  { id: 'greatsword', name: 'Greatsword', spriteId: 'sword_4_twohand', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 6 }, tier: 6 },
  { id: 'greataxe', name: 'Greataxe', spriteId: 'axe_3_twohand', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 6 }, tier: 6 },
  { id: 'halberd', name: 'Halberd', spriteId: 'halberd_1', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 6 }, tier: 6 },
  // --- Tier 7 (Mythic) ---
  { id: 'elven_blade', name: 'Elven Blade', spriteId: 'sword_5_elven', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 7 }, tier: 7 },
  { id: 'dwarven_axe', name: 'Dwarven Axe', spriteId: 'axe_4_dwarven', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 7 }, tier: 7 },
  { id: 'vorpal_sword', name: 'Vorpal Sword', spriteId: 'sword_6_vorpal', type: 'WEAPON', effect: { type: 'EQUIP', slot: 'WEAPON', attack_bonus: 8 }, tier: 7 },


  // =================================================================
  // ARMOR
  // =================================================================
  // --- Tier 1 (Common) ---
  { id: 'padded_armor', name: 'Padded Armor', spriteId: 'armor_padded', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 1 }, tier: 1 },
  { id: 'robes', name: 'Robes', spriteId: 'robes_1', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 1 }, tier: 1 },
  { id: 'buckler', name: 'Buckler', spriteId: 'shield_small', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 1 }, tier: 1 },
  // --- Tier 2 (Uncommon) ---
  { id: 'leather_armor', name: 'Leather Armor', spriteId: 'armor_leather', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 2 }, tier: 2 },
  { id: 'hide_armor', name: 'Hide Armor', spriteId: 'armor_hide', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 2 }, tier: 2 },
  // --- Tier 3 (Rare) ---
  { id: 'studded_leather', name: 'Studded Leather Armor', spriteId: 'armor_studded', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 3 }, tier: 3 },
  { id: 'scale_mail', name: 'Scale Mail', spriteId: 'armor_scale', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 3 }, tier: 3 },
  { id: 'kite_shield', name: 'Kite Shield', spriteId: 'shield_medium', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 2 }, tier: 3 },
  // --- Tier 4 (Very Rare) ---
  { id: 'chain_mail', name: 'Chain Mail', spriteId: 'armor_chain', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 4 }, tier: 4 },
  { id: 'breastplate', name: 'Breastplate', spriteId: 'armor_breastplate', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 4 }, tier: 4 },
  // --- Tier 5 (Epic) ---
  { id: 'splint_mail', name: 'Splint Mail', spriteId: 'armor_splint', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 5 }, tier: 5 },
  { id: 'banded_mail', name: 'Banded Mail', spriteId: 'armor_banded', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 5 }, tier: 5 },
  { id: 'tower_shield', name: 'Tower Shield', spriteId: 'shield_large', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 3 }, tier: 5 },
  // --- Tier 6 (Legendary) ---
  { id: 'half_plate', name: 'Half Plate Armor', spriteId: 'armor_half_plate', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 6 }, tier: 6 },
  { id: 'full_plate', name: 'Full Plate Armor', spriteId: 'armor_full_plate', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 7 }, tier: 6 },
  // --- Tier 7 (Mythic) ---
  { id: 'elven_chain', name: 'Elven Chain Mail', spriteId: 'armor_chain_elven', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 6 }, tier: 7 },
  { id: 'dwarven_plate', name: 'Dwarven Plate', spriteId: 'armor_plate_dwarven', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 8 }, tier: 7 },
  { id: 'dragon_scale', name: 'Dragon Scale Mail', spriteId: 'armor_scale_dragon', type: 'ARMOR', effect: { type: 'EQUIP', slot: 'ARMOR', defense_bonus: 9 }, tier: 7 },


  // =================================================================
  // FOOD
  // =================================================================
  { id: 'apple', name: 'Apple', spriteId: 'food_apple', type: 'FOOD', effect: { type: 'RESTORE_HUNGER', amount: 100 } },
  { id: 'bread', name: 'Bread Loaf', spriteId: 'food_bread', type: 'FOOD', effect: { type: 'RESTORE_HUNGER', amount: 250 } },
  { id: 'cheese', name: 'Cheese Wedge', spriteId: 'food_cheese', type: 'FOOD', effect: { type: 'RESTORE_HUNGER', amount: 350 } },
  { id: 'ration', name: 'Ration', spriteId: 'food_ration', type: 'FOOD', effect: { type: 'RESTORE_HUNGER', amount: 750 } },
  { id: 'iron_ration', name: 'Iron Ration', spriteId: 'food_iron_ration', type: 'FOOD', effect: { type: 'RESTORE_HUNGER', amount: 1500 } },
  { id: 'lembas', name: 'Lembas Bread', spriteId: 'food_lembas', type: 'FOOD', effect: { type: 'RESTORE_HUNGER', amount: 2000 } }
];

/**
 * A utility class for handling item instances.
 * This class is responsible for creating new item instances from templates
 * and for determining the display name of an item (e.g., handling unidentified items).
 */
export class Item {
  /**
   * Creates a new, unique instance of an item at a given position.
   * @param template - The ItemTemplate to base the new item on.
   * @param position - The {x, y} coordinates where the item is created.
   * @returns A new ItemInstance object.
   */
  static create(template: ItemTemplate, position: { x: number; y: number }): ItemInstance {
    return {
      id: `${template.id}_${Math.random().toString(36).slice(2, 10)}`,
      template,
      position,
      identified:
        template.id === 'scroll_identify' ? true : false, // Identify Scrolls are always identified
    };
  }

  /**
   * Gets the appropriate name for an item, showing a generic name if it's not yet identified.
   * @param item - The ItemInstance to get the name for.
   * @returns The display name as a string.
   */
  static getDisplayName(item: ItemInstance): string {
    // Certain items like weapons, armor, and food might be identifiable on sight.
    // Here we make an exception for them. Potions and scrolls remain unknown.
    switch (item.template.type) {
      case 'WEAPON':
      case 'ARMOR':
      case 'FOOD':
        return item.template.name;
    }
    
    if (item.identified) {
      return item.template.name;
    }

    // Return unidentified name based on type for items that need identification.
    switch (item.template.type) {
      case 'POTION': return 'Unknown Potion';
      case 'SCROLL': return 'Unknown Scroll';
      default: return 'Unknown Item';
    }
  }

  /**
   * Gets the rarity tier name for an item.
   * @param item - The ItemInstance to get the rarity for.
   * @returns The rarity tier name as a string.
   */
  static getRarityName(item: ItemInstance): string {
    if (!item.template.tier) return 'Common';
    
    switch (item.template.tier) {
      case 1: return 'Common';
      case 2: return 'Uncommon';
      case 3: return 'Rare';
      case 4: return 'Very Rare';
      case 5: return 'Epic';
      case 6: return 'Legendary';
      case 7: return 'Mythic';
      default: return 'Common';
    }
  }
}
