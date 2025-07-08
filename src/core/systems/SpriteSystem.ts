import { VIEWPORT_CONFIG } from '../../utils/constants';

export interface SpriteData {
  id: string;
  src: string;
  width: number;
  height: number;
}

export interface SpriteInstance {
  spriteId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  alpha?: number;
}

// Sprite definitions for different entity types
export const SPRITE_DEFINITIONS: Record<string, SpriteData> = {
  // Player sprites
  'player_warrior': {
    id: 'player_warrior',
    src: 'sprites/player_warrior.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  // 'player_rogue' omitted (no asset)

  // Monster sprites
  'monster_goblin': {
    id: 'monster_goblin',
    src: 'sprites/monster_goblin.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'monster_bat': {
    id: 'monster_bat',
    src: 'sprites/monster_bat.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'monster_skeleton': {
    id: 'monster_skeleton',
    src: 'sprites/monster_skeleton.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },

  // Item sprites - Potions
  'item_potion_minor_health': {
    id: 'item_potion_minor_health',
    src: 'sprites/item_potion_minor_health.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_potion_health': {
    id: 'item_potion_health',
    src: 'sprites/item_potion_health.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_potion_major_health': {
    id: 'item_potion_major_health',
    src: 'sprites/item_potion_major_health.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_potion_strength': {
    id: 'item_potion_strength',
    src: 'sprites/item_potion_strength.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_potion_greater_strength': {
    id: 'item_potion_greater_strength',
    src: 'sprites/item_potion_greater_strength.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_potion_agility': {
    id: 'item_potion_agility',
    src: 'sprites/item_potion_agility.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_potion_haste': {
    id: 'item_potion_haste',
    src: 'sprites/item_potion_haste.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_potion_invisibility': {
    id: 'item_potion_invisibility',
    src: 'sprites/item_potion_invisibility.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },

  // Item sprites - Scrolls
  'item_scroll_identify': {
    id: 'item_scroll_identify',
    src: 'sprites/item_scroll_identify.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_scroll_teleport': {
    id: 'item_scroll_teleport',
    src: 'sprites/item_scroll_teleport.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_scroll_magic_mapping': {
    id: 'item_scroll_magic_mapping',
    src: 'sprites/item_scroll_magic_mapping.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_scroll_remove_curse': {
    id: 'item_scroll_remove_curse',
    src: 'sprites/item_scroll_remove_curse.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_scroll_enchant_weapon': {
    id: 'item_scroll_enchant_weapon',
    src: 'sprites/item_scroll_enchant_weapon.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_scroll_enchant_armor': {
    id: 'item_scroll_enchant_armor',
    src: 'sprites/item_scroll_enchant_armor.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_scroll_fireball': {
    id: 'item_scroll_fireball',
    src: 'sprites/item_scroll_fireball.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },

  // Item sprites - Weapons
  'item_dagger': {
    id: 'item_dagger',
    src: 'sprites/item_dagger.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_club': {
    id: 'item_club',
    src: 'sprites/item_club.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_staff': {
    id: 'item_staff',
    src: 'sprites/item_staff.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_short_sword': {
    id: 'item_short_sword',
    src: 'sprites/item_short_sword.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_hand_axe': {
    id: 'item_hand_axe',
    src: 'sprites/item_hand_axe.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_mace': {
    id: 'item_mace',
    src: 'sprites/item_mace.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_spear': {
    id: 'item_spear',
    src: 'sprites/item_spear.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_scimitar': {
    id: 'item_scimitar',
    src: 'sprites/item_scimitar.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_morningstar': {
    id: 'item_morningstar',
    src: 'sprites/item_morningstar.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_shortbow': {
    id: 'item_shortbow',
    src: 'sprites/item_shortbow.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_longsword': {
    id: 'item_longsword',
    src: 'sprites/item_longsword.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_battle_axe': {
    id: 'item_battle_axe',
    src: 'sprites/item_battle_axe.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_flail': {
    id: 'item_flail',
    src: 'sprites/item_flail.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_broadsword': {
    id: 'item_broadsword',
    src: 'sprites/item_broadsword.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_war_hammer': {
    id: 'item_war_hammer',
    src: 'sprites/item_war_hammer.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_longbow': {
    id: 'item_longbow',
    src: 'sprites/item_longbow.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_greatsword': {
    id: 'item_greatsword',
    src: 'sprites/item_greatsword.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_greataxe': {
    id: 'item_greataxe',
    src: 'sprites/item_greataxe.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_halberd': {
    id: 'item_halberd',
    src: 'sprites/item_halberd.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_elven_blade': {
    id: 'item_elven_blade',
    src: 'sprites/item_elven_blade.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_dwarven_axe': {
    id: 'item_dwarven_axe',
    src: 'sprites/item_dwarven_axe.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_vorpal_sword': {
    id: 'item_vorpal_sword',
    src: 'sprites/item_vorpal_sword.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },

  // Armor
  'item_padded_armor': {
    id: 'item_padded_armor',
    src: 'sprites/item_padded_armor.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_robes': {
    id: 'item_robes',
    src: 'sprites/item_robes.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_buckler': {
    id: 'item_buckler',
    src: 'sprites/item_buckler.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_leather_armor': {
    id: 'item_leather_armor',
    src: 'sprites/item_leather_armor.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_hide_armor': {
    id: 'item_hide_armor',
    src: 'sprites/item_hide_armor.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_studded_leather': {
    id: 'item_studded_leather',
    src: 'sprites/item_studded_leather.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_scale_mail': {
    id: 'item_scale_mail',
    src: 'sprites/item_scale_mail.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_kite_shield': {
    id: 'item_kite_shield',
    src: 'sprites/item_kite_shield.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_chain_mail': {
    id: 'item_chain_mail',
    src: 'sprites/item_chain_mail.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_breastplate': {
    id: 'item_breastplate',
    src: 'sprites/item_breastplate.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_splint_mail': {
    id: 'item_splint_mail',
    src: 'sprites/item_splint_mail.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_banded_mail': {
    id: 'item_banded_mail',
    src: 'sprites/item_banded_mail.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_tower_shield': {
    id: 'item_tower_shield',
    src: 'sprites/item_tower_shield.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_half_plate': {
    id: 'item_half_plate',
    src: 'sprites/item_half_plate.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_full_plate': {
    id: 'item_full_plate',
    src: 'sprites/item_full_plate.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_elven_chain': {
    id: 'item_elven_chain',
    src: 'sprites/item_elven_chain.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_dwarven_plate': {
    id: 'item_dwarven_plate',
    src: 'sprites/item_dwarven_plate.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_dragon_scale': {
    id: 'item_dragon_scale',
    src: 'sprites/item_dragon_scale.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },

  // Food
  'item_apple': {
    id: 'item_apple',
    src: 'sprites/item_apple.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_bread': {
    id: 'item_bread',
    src: 'sprites/item_bread.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_cheese': {
    id: 'item_cheese',
    src: 'sprites/item_cheese.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_ration': {
    id: 'item_ration',
    src: 'sprites/item_ration.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_iron_ration': {
    id: 'item_iron_ration',
    src: 'sprites/item_iron_ration.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'item_lembas': {
    id: 'item_lembas',
    src: 'sprites/item_lembas.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },

  // Environment sprites
  'tile_floor': {
    id: 'tile_floor',
    src: 'sprites/tile_floor.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'tile_wall': {
    id: 'tile_wall',
    src: 'sprites/tile_wall.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'tile_stairs_down': {
    id: 'tile_stairs_down',
    src: 'sprites/tile_stairs_down.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
  'tile_stairs_up': {
    id: 'tile_stairs_up',
    src: 'sprites/tile_stairs_up.png',
    width: VIEWPORT_CONFIG.TILE_SIZE,
    height: VIEWPORT_CONFIG.TILE_SIZE,
  },
};

// Fallback sprites for when actual sprites aren't loaded
export const FALLBACK_SPRITES: Record<string, string> = {
  'player_warrior': '👤',
  'player_rogue': '👤',
  'monster_goblin': '👹',
  'monster_bat': '🦇',
  'monster_skeleton': '💀',
  
  // Potions
  'item_potion_minor_health': '🧪',
  'item_potion_health': '🧪',
  'item_potion_major_health': '🧪',
  'item_potion_strength': '🧪',
  'item_potion_greater_strength': '🧪',
  'item_potion_agility': '🧪',
  'item_potion_haste': '🧪',
  'item_potion_invisibility': '🧪',
  
  // Scrolls
  'item_scroll_identify': '📜',
  'item_scroll_teleport': '📜',
  'item_scroll_magic_mapping': '📜',
  'item_scroll_remove_curse': '📜',
  'item_scroll_enchant_weapon': '📜',
  'item_scroll_enchant_armor': '📜',
  'item_scroll_fireball': '📜',
  
  // Weapons
  'item_dagger': '🗡️',
  'item_club': '🏏',
  'item_staff': '🦯',
  'item_short_sword': '⚔️',
  'item_hand_axe': '🪓',
  'item_mace': '🔨',
  'item_spear': '🔱',
  'item_scimitar': '⚔️',
  'item_morningstar': '🔨',
  'item_shortbow': '🏹',
  'item_longsword': '⚔️',
  'item_battle_axe': '🪓',
  'item_flail': '🔨',
  'item_broadsword': '⚔️',
  'item_war_hammer': '🔨',
  'item_longbow': '🏹',
  'item_greatsword': '⚔️',
  'item_greataxe': '🪓',
  'item_halberd': '🔱',
  'item_elven_blade': '⚔️',
  'item_dwarven_axe': '🪓',
  'item_vorpal_sword': '⚔️',
  
  // Armor
  'item_padded_armor': '🛡️',
  'item_robes': '👘',
  'item_buckler': '🛡️',
  'item_leather_armor': '🛡️',
  'item_hide_armor': '🛡️',
  'item_studded_leather': '🛡️',
  'item_scale_mail': '🛡️',
  'item_kite_shield': '🛡️',
  'item_chain_mail': '🛡️',
  'item_breastplate': '🛡️',
  'item_splint_mail': '🛡️',
  'item_banded_mail': '🛡️',
  'item_tower_shield': '🛡️',
  'item_half_plate': '🛡️',
  'item_full_plate': '🛡️',
  'item_elven_chain': '🛡️',
  'item_dwarven_plate': '🛡️',
  'item_dragon_scale': '🛡️',
  
  // Food
  'item_apple': '🍎',
  'item_bread': '🍞',
  'item_cheese': '🧀',
  'item_ration': '🍖',
  'item_iron_ration': '🍖',
  'item_lembas': '🍞',
  
  'tile_floor': '⬜',
  'tile_wall': '⬛',
  'tile_stairs_down': '⬇️',
  'tile_stairs_up': '⬆️',
};

export class SpriteSystem {
  private spriteCache: Map<string, HTMLImageElement> = new Map();
  private loadedSprites: Set<string> = new Set();

  constructor() {
    this.preloadSprites();
  }

  private async preloadSprites(): Promise<void> {
    const loadPromises = Object.values(SPRITE_DEFINITIONS).map(sprite => 
      this.loadSprite(sprite.id, sprite.src)
    );

    try {
      await Promise.all(loadPromises);
      console.log('All sprites loaded successfully');
    } catch (error) {
      console.warn('Some sprites failed to load, using fallbacks:', error);
    }
  }

  private async loadSprite(id: string, src: string): Promise<void> {
    // Try PNG first, then SVG, then fallback
    return new Promise((resolve, reject) => {
      const tryLoad = (exts: string[]) => {
        if (exts.length === 0) {
          console.warn(`Failed to load sprite: ${id} (no PNG or SVG found)`);
          reject(new Error(`Failed to load sprite: ${id}`));
          return;
        }
        const ext = exts[0];
        const img = new Image();
        img.onload = () => {
          this.spriteCache.set(id, img);
          this.loadedSprites.add(id);
          resolve();
        };
        img.onerror = () => {
          // Try next extension
          tryLoad(exts.slice(1));
        };
        img.src = src.replace(/\.(png|svg)$/, `.${ext}`);
      };
      tryLoad(['png', 'svg']);
    });
  }

  public isSpriteLoaded(spriteId: string): boolean {
    return this.loadedSprites.has(spriteId);
  }

  public getSprite(spriteId: string): HTMLImageElement | null {
    return this.spriteCache.get(spriteId) || null;
  }

  public getFallbackSprite(spriteId: string): string {
    return FALLBACK_SPRITES[spriteId] || '❓';
  }

  public getSpriteForEntity(entityType: string, entityId?: string): string {
    switch (entityType) {
      case 'player':
        return 'player_warrior'; // Default to warrior for now
      case 'monster':
        return `monster_${entityId}`;
      case 'item':
        return `item_${entityId}`;
      case 'tile_floor':
        return 'tile_floor';
      case 'tile_wall':
        return 'tile_wall';
      default:
        return 'tile_floor';
    }
  }
}

// Global sprite system instance
export const spriteSystem = new SpriteSystem(); 