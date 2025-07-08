import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create sprites directory if it doesn't exist
const spritesDir = path.join(__dirname, '../public/sprites');
if (!fs.existsSync(spritesDir)) {
  fs.mkdirSync(spritesDir, { recursive: true });
}

// Function to create a simple colored sprite
function createSprite(color, filename) {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 32, 32);
  
  // Add a simple border
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, 32, 32);
  
  return canvas.toDataURL('image/png');
}

// Function to create SVG sprite
function createSVGSprite(color, filename) {
  const svg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="${color}" stroke="#000" stroke-width="1"/>
  </svg>`;
  
  fs.writeFileSync(path.join(spritesDir, filename), svg);
}

// Create comprehensive sprites for all items
const sprites = [
  // Environment
  { color: '#3a3f5e', filename: 'tile_floor.svg' },
  { color: '#5d275d', filename: 'tile_wall.svg' },
  
  // Player
  { color: '#ffffff', filename: 'player_warrior.svg' },
  
  // Monsters
  { color: '#ff004d', filename: 'monster_goblin.svg' },
  { color: '#8b0000', filename: 'monster_bat.svg' },
  { color: '#696969', filename: 'monster_skeleton.svg' },
  
  // Potions
  { color: '#ff6b6b', filename: 'item_potion_minor_health.svg' },
  { color: '#ffae00', filename: 'item_potion_health.svg' },
  { color: '#ff4757', filename: 'item_potion_major_health.svg' },
  { color: '#800080', filename: 'item_potion_strength.svg' },
  { color: '#ff6347', filename: 'item_potion_greater_strength.svg' },
  { color: '#32cd32', filename: 'item_potion_agility.svg' },
  { color: '#ffd700', filename: 'item_potion_haste.svg' },
  { color: '#f0f8ff', filename: 'item_potion_invisibility.svg' },
  
  // Scrolls
  { color: '#f4a460', filename: 'item_scroll_identify.svg' },
  { color: '#87ceeb', filename: 'item_scroll_teleport.svg' },
  { color: '#daa520', filename: 'item_scroll_magic_mapping.svg' },
  { color: '#ff69b4', filename: 'item_scroll_remove_curse.svg' },
  { color: '#ff4500', filename: 'item_scroll_enchant_weapon.svg' },
  { color: '#4169e1', filename: 'item_scroll_enchant_armor.svg' },
  { color: '#ff0000', filename: 'item_scroll_fireball.svg' },
  
  // Weapons - Tier 1
  { color: '#c0c0c0', filename: 'item_dagger.svg' },
  { color: '#8b4513', filename: 'item_club.svg' },
  { color: '#a0522d', filename: 'item_staff.svg' },
  
  // Weapons - Tier 2
  { color: '#c0c0c0', filename: 'item_short_sword.svg' },
  { color: '#cd853f', filename: 'item_hand_axe.svg' },
  { color: '#b8860b', filename: 'item_mace.svg' },
  { color: '#daa520', filename: 'item_spear.svg' },
  
  // Weapons - Tier 3
  { color: '#d3d3d3', filename: 'item_scimitar.svg' },
  { color: '#b8860b', filename: 'item_morningstar.svg' },
  { color: '#8b4513', filename: 'item_shortbow.svg' },
  
  // Weapons - Tier 4
  { color: '#e6e6fa', filename: 'item_longsword.svg' },
  { color: '#cd853f', filename: 'item_battle_axe.svg' },
  { color: '#b8860b', filename: 'item_flail.svg' },
  
  // Weapons - Tier 5
  { color: '#f5f5dc', filename: 'item_broadsword.svg' },
  { color: '#b8860b', filename: 'item_war_hammer.svg' },
  { color: '#8b4513', filename: 'item_longbow.svg' },
  
  // Weapons - Tier 6
  { color: '#f0e68c', filename: 'item_greatsword.svg' },
  { color: '#cd853f', filename: 'item_greataxe.svg' },
  { color: '#daa520', filename: 'item_halberd.svg' },
  
  // Weapons - Tier 7 (Rare)
  { color: '#90ee90', filename: 'item_elven_blade.svg' },
  { color: '#cd853f', filename: 'item_dwarven_axe.svg' },
  { color: '#ffd700', filename: 'item_vorpal_sword.svg' },
  
  // Armor - Tier 1
  { color: '#f5deb3', filename: 'item_padded_armor.svg' },
  { color: '#8b4513', filename: 'item_robes.svg' },
  { color: '#c0c0c0', filename: 'item_buckler.svg' },
  
  // Armor - Tier 2
  { color: '#8b4513', filename: 'item_leather_armor.svg' },
  { color: '#a0522d', filename: 'item_hide_armor.svg' },
  
  // Armor - Tier 3
  { color: '#8b4513', filename: 'item_studded_leather.svg' },
  { color: '#c0c0c0', filename: 'item_scale_mail.svg' },
  { color: '#c0c0c0', filename: 'item_kite_shield.svg' },
  
  // Armor - Tier 4
  { color: '#c0c0c0', filename: 'item_chain_mail.svg' },
  { color: '#c0c0c0', filename: 'item_breastplate.svg' },
  
  // Armor - Tier 5
  { color: '#c0c0c0', filename: 'item_splint_mail.svg' },
  { color: '#c0c0c0', filename: 'item_banded_mail.svg' },
  { color: '#c0c0c0', filename: 'item_tower_shield.svg' },
  
  // Armor - Tier 6
  { color: '#e6e6fa', filename: 'item_half_plate.svg' },
  { color: '#f5f5dc', filename: 'item_full_plate.svg' },
  
  // Armor - Tier 7 (Rare)
  { color: '#90ee90', filename: 'item_elven_chain.svg' },
  { color: '#cd853f', filename: 'item_dwarven_plate.svg' },
  { color: '#ff4500', filename: 'item_dragon_scale.svg' },
  
  // Food
  { color: '#ff0000', filename: 'item_apple.svg' },
  { color: '#f4a460', filename: 'item_bread.svg' },
  { color: '#ffd700', filename: 'item_cheese.svg' },
  { color: '#8b4513', filename: 'item_ration.svg' },
  { color: '#696969', filename: 'item_iron_ration.svg' },
  { color: '#f4a460', filename: 'item_lembas.svg' },
];

sprites.forEach(sprite => {
  createSVGSprite(sprite.color, sprite.filename);
  console.log(`Created ${sprite.filename}`);
});

console.log(`Generated ${sprites.length} sprite files in ${spritesDir}`); 