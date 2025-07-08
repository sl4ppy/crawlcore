import { create } from 'zustand';
import { type DungeonMap, DungeonGenerator, type Room } from '../core/dungeon/DungeonGenerator';
import { type PlayerStats, type PlayerInventory, Player } from '../core/entities/Player';
import { type MonsterInstance, type MonsterStats, Monster } from '../core/entities/Monster';
import { type ItemInstance, ITEM_TEMPLATES, Item } from '../core/entities/Item';
import { CombatSystem } from '../core/systems/CombatSystem';
import { ItemSystem } from '../core/systems/ItemSystem';
import { getRandomInt, isValidPosition } from '../utils/gameHelpers';

const MONSTER_TEMPLATES: MonsterStats[] = [
  {
    id: 'goblin',
    name: 'Goblin',
    hp: 10,
    maxHp: 10,
    attack: 3,
    defense: 1,
    xpReward: 5,
    aiType: 'SimpleChase',
  },
  {
    id: 'bat',
    name: 'Giant Bat',
    hp: 7,
    maxHp: 7,
    attack: 2,
    defense: 0,
    xpReward: 3,
    aiType: 'ErraticChase',
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    hp: 15,
    maxHp: 15,
    attack: 5,
    defense: 2,
    xpReward: 10,
    aiType: 'SimpleChase',
  },
];

// Game state store for managing player, monsters, and game world
export interface GameState {
  // Dungeon state
  dungeon: DungeonMap | null;
  dungeons: Record<number, DungeonMap>; // NEW: persistent dungeons
  dungeonLevel: number;
  
  // Player state
  player: {
    stats: PlayerStats;
    position: { x: number; y: number };
    renderPosition: { x: number; y: number }; // NEW: for animation
    inventory: PlayerInventory;
  } | null;

  // Monsters
  monsters: MonsterInstance[];
  
  // Items
  items: ItemInstance[];
  
  // Game state
  isGameRunning: boolean;
  turnCount: number;
  messages: string[];
  
  // Actions
  generateNewDungeon: (level?: number, entryPos?: { x: number; y: number }) => void;
  setPlayerPosition: (x: number, y: number) => void;
  updatePlayerStats: (stats: Partial<PlayerStats>) => void;
  moveMonsters: () => void;
  addMessage: (message: string) => void;
  startGame: () => void;
  endGame: () => void;
  incrementTurn: () => void;
  useItem: (itemId: string) => void;
  equipItem: (itemId: string) => void;
  unequipItem: (slot: 'WEAPON' | 'ARMOR') => void;
  dropItem: (itemId: string) => void;
  goToNextLevel: () => void;
  goToPreviousLevel: () => void;
  identifyMode: {
    active: boolean;
    scrollId: string | null;
  };
  startIdentify: (scrollId: string) => void;
  cancelIdentify: () => void;
  completeIdentify: (itemId: string) => void;
}

function createInitialPlayerStats(): PlayerStats {
  return {
    hp: 30,
    maxHp: 30,
    strength: 8,
    dexterity: 5,
    luck: 3,
    level: 1,
    xp: 0,
    hunger: 1000,
  };
}

function spawnMonsters(rooms: Room[], playerPos: { x: number; y: number }): MonsterInstance[] {
  const monsters: MonsterInstance[] = [];
  // Spawn 1-2 monsters per room (except the first room)
  for (let i = 1; i < rooms.length; i++) {
    const room = rooms[i];
    const numMonsters = getRandomInt(1, 2);
    for (let m = 0; m < numMonsters; m++) {
      const template = MONSTER_TEMPLATES[getRandomInt(0, MONSTER_TEMPLATES.length - 1)];
      // Place monster at random position in the room, not on player
      let pos;
      do {
        pos = {
          x: getRandomInt(room.x, room.x + room.width - 1),
          y: getRandomInt(room.y, room.y + room.height - 1),
        };
      } while (pos.x === playerPos.x && pos.y === playerPos.y);
      monsters.push(Monster.create(template, pos));
    }
  }
  return monsters;
}

/**
 * Tier-based item spawning system with rarity weights.
 * Higher tier items are exponentially rarer.
 */
function spawnItems(rooms: Room[], playerPos: { x: number; y: number }): ItemInstance[] {
  const items: ItemInstance[] = [];
  
  // Define rarity weights for each tier (higher tier = exponentially rarer)
  const tierWeights: Record<number, number> = {
    1: 100,  // Common: 100% base chance
    2: 50,   // Uncommon: 50% base chance
    3: 20,   // Rare: 20% base chance
    4: 8,    // Very Rare: 8% base chance
    5: 3,    // Epic: 3% base chance
    6: 1,    // Legendary: 1% base chance
    7: 0.3,  // Mythic: 0.3% base chance
  };

  // Separate items by tier
  const itemsByTier: Record<number, typeof ITEM_TEMPLATES> = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  };

  // Items without tiers (potions, scrolls, food) go to tier 1
  ITEM_TEMPLATES.forEach(item => {
    const tier = item.tier || 1;
    if (!itemsByTier[tier]) itemsByTier[tier] = [];
    itemsByTier[tier].push(item);
  });

  // Spawn 1-3 items per room (except the first room)
  for (let i = 1; i < rooms.length; i++) {
    const room = rooms[i];
    const numItems = getRandomInt(1, 3);
    
    for (let item = 0; item < numItems; item++) {
      // Determine which tier to spawn based on weights
      const tierRoll = Math.random() * 100;
      let selectedTier = 1;
      
      for (let tier = 1; tier <= 7; tier++) {
        if (tierRoll < tierWeights[tier]) {
          selectedTier = tier;
          break;
        }
      }

      // Get items from the selected tier
      const tierItems = itemsByTier[selectedTier];
      if (tierItems.length === 0) continue;

      // Randomly select an item from the tier
      const template = tierItems[getRandomInt(0, tierItems.length - 1)];
      
      // Place item at random position in the room, not on player
      let pos;
      do {
        pos = {
          x: getRandomInt(room.x, room.x + room.width - 1),
          y: getRandomInt(room.y, room.y + room.height - 1),
        };
      } while (pos.x === playerPos.x && pos.y === playerPos.y);
      
      items.push(Item.create(template, pos));
    }
  }
  
  return items;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  dungeon: null,
  dungeons: {}, // NEW
  dungeonLevel: 1,
  player: null,
  monsters: [],
  items: [],
  isGameRunning: false,
  turnCount: 0,
  messages: [],
  identifyMode: { active: false, scrollId: null },

  // Actions
  generateNewDungeon: (level: number = 1, entryPos?: { x: number; y: number }) => {
    let dungeons = { ...get().dungeons };
    let dungeon = dungeons[level];
    let playerStart: { x: number; y: number };
    if (!dungeon) {
      const generator = new DungeonGenerator();
      dungeon = generator.generate(level);
      dungeons[level] = dungeon;
      // If entryPos is provided, use it; otherwise use generator logic
      playerStart = entryPos
        ? entryPos
        : generator.getPlayerStartPosition(dungeon.rooms);
    } else {
      // If entryPos is provided, use it
      if (entryPos) {
        playerStart = entryPos;
      } else if (dungeon.stairsUp && level > 1) {
        playerStart = dungeon.stairsUp;
      } else if (dungeon.rooms && dungeon.rooms.length > 0) {
        // Center of first room
        const firstRoom = dungeon.rooms[0];
        playerStart = {
          x: Math.floor(firstRoom.x + firstRoom.width / 2),
          y: Math.floor(firstRoom.y + firstRoom.height / 2)
        };
      } else {
        playerStart = { x: 1, y: 1 };
      }
    }
    const monsters = spawnMonsters(dungeon.rooms, playerStart);
    const items = spawnItems(dungeon.rooms, playerStart);
    set({
      dungeon,
      dungeons,
      dungeonLevel: level,
      player: {
        stats: createInitialPlayerStats(),
        position: playerStart,
        renderPosition: playerStart, // NEW
        inventory: Player.createInitialInventory(),
      },
      monsters,
      items,
      turnCount: 0,
      messages: [`Welcome to level ${level}!`],
    });
  },

  setPlayerPosition: (x: number, y: number) => {
    const { player, incrementTurn, moveMonsters, monsters, items, updatePlayerStats, addMessage, dungeon, goToNextLevel, goToPreviousLevel } = get();
    if (!player || !dungeon) return;

    // Check if player is trying to use stairs
    const tileAtPosition = dungeon.tiles[y][x];
    if (tileAtPosition === 'stairs_down') {
      goToNextLevel();
      return;
    } else if (tileAtPosition === 'stairs_up') {
      goToPreviousLevel();
      return;
    }

    // Check if there's a monster at the target position
    const monsterAtPosition = monsters.find(m => m.position.x === x && m.position.y === y);
    
    if (monsterAtPosition) {
      console.log('Combat initiated!', { monster: monsterAtPosition.stats.name, playerStats: player.stats });
      
      // Get equipment bonuses
      const equipmentBonuses = Player.getEquipmentBonuses(player.inventory);
      
      // Combat: Player attacks monster
      const combatResult = CombatSystem.attack(
        { stats: player.stats, weaponPower: equipmentBonuses.attackBonus },
        { stats: monsterAtPosition.stats }
      );
      
      console.log('Combat result:', combatResult);
      
      if (combatResult.hit) {
        const damage = combatResult.damage;
        const isCritical = combatResult.critical;
        
        if (isCritical) {
          addMessage(`Critical hit! You deal ${damage} damage to ${monsterAtPosition.stats.name}!`);
        } else {
          addMessage(`You hit ${monsterAtPosition.stats.name} for ${damage} damage.`);
        }
        
        // Update monster HP
        const updatedMonster = {
          ...monsterAtPosition,
          stats: {
            ...monsterAtPosition.stats,
            hp: Math.max(0, monsterAtPosition.stats.hp - damage),
          },
        };
        
        if (updatedMonster.stats.hp === 0) {
          // Monster dies
          addMessage(`You kill ${monsterAtPosition.stats.name}!`);
          
          // Gain XP
          const xpGain = monsterAtPosition.stats.xpReward;
          const newXp = player.stats.xp + xpGain;
          addMessage(`You gain ${xpGain} XP.`);
          
          // Check for level up
          const currentLevel = player.stats.level;
          const xpForNextLevel = 100 * Math.pow(currentLevel, 1.5);
          
          if (newXp >= xpForNextLevel) {
            const newLevel = currentLevel + 1;
            const newMaxHp = player.stats.maxHp + 10;
            const newHp = newMaxHp; // Full heal on level up
            const newStrength = player.stats.strength + 2;
            const newDexterity = player.stats.dexterity + 2;
            const newLuck = player.stats.luck + 1;
            
            updatePlayerStats({
              level: newLevel,
              xp: newXp,
              maxHp: newMaxHp,
              hp: newHp,
              strength: newStrength,
              dexterity: newDexterity,
              luck: newLuck,
            });
            
            addMessage(`Level up! You are now level ${newLevel}!`);
          } else {
            updatePlayerStats({ xp: newXp });
          }
          
          // Remove monster from map
          set(state => ({
            monsters: state.monsters.filter(m => m.id !== monsterAtPosition.id)
          }));
        } else {
          // Update monster HP
          set(state => ({
            monsters: state.monsters.map(m => 
              m.id === monsterAtPosition.id ? updatedMonster : m
            )
          }));
        }
      } else {
        addMessage(`You missed ${monsterAtPosition.stats.name}!`);
      }
      
      // Don't move player if there's a monster (combat happened instead)
      incrementTurn();
      moveMonsters();
      return;
    }

    // Check if there's an item at the target position
    const itemAtPosition = items.find(item => item.position.x === x && item.position.y === y);
    
    if (itemAtPosition) {
      // Pick up item
      const itemName = Item.getDisplayName(itemAtPosition);
      addMessage(`You pick up ${itemName}.`);
      
      // Add item to inventory and remove from map
      set(state => ({
        player: state.player ? {
          ...state.player,
          inventory: Player.addItemToInventory(state.player.inventory, itemAtPosition)
        } : null,
        items: state.items.filter(item => item.id !== itemAtPosition.id)
      }));
      
      // Don't move player if there's an item (pickup happened instead)
      incrementTurn();
      moveMonsters();
      return;
    }

    // Normal movement
    set({
      player: {
        ...player,
        position: { x, y },
        // Don't update renderPosition here; let animation handle it
      },
    });
    incrementTurn();
    moveMonsters();
  },

  updatePlayerStats: (stats: Partial<PlayerStats>) => {
    const { player } = get();
    if (player) {
      set({
        player: {
          ...player,
          stats: {
            ...player.stats,
            ...stats,
          },
        },
      });
    }
  },

  moveMonsters: () => {
    const { player, monsters, dungeon, addMessage, updatePlayerStats } = get();
    if (!player || !dungeon) return;

    const updatedMonsters = monsters.map(monster => {
      // Simple AI: move towards player if adjacent
      const dx = player.position.x - monster.position.x;
      const dy = player.position.y - monster.position.y;
      const distance = Math.abs(dx) + Math.abs(dy);

      if (distance <= 1) {
        // Attack player
        const equipmentBonuses = Player.getEquipmentBonuses(player.inventory);
        const combatResult = CombatSystem.attack(
          { stats: monster.stats },
          { stats: player.stats, weaponPower: equipmentBonuses.defenseBonus }
        );

        if (combatResult.hit) {
          const damage = combatResult.damage;
          const isCritical = combatResult.critical;
          
          if (isCritical) {
            addMessage(`Critical hit! ${monster.stats.name} deals ${damage} damage to you!`);
          } else {
            addMessage(`${monster.stats.name} hits you for ${damage} damage.`);
          }
          
          const newHp = Math.max(0, player.stats.hp - damage);
          updatePlayerStats({ hp: newHp });
          
          if (newHp === 0) {
            addMessage('You have been slain! Game over.');
            set({ isGameRunning: false });
          }
        } else {
          addMessage(`${monster.stats.name} misses you.`);
        }
        
        return monster; // Monster doesn't move when attacking
      }

      // Move towards player
      let newX = monster.position.x;
      let newY = monster.position.y;

      if (dx > 0) newX++;
      else if (dx < 0) newX--;
      if (dy > 0) newY++;
      else if (dy < 0) newY--;

      // Check if new position is valid (within bounds and on floor)
      if (newX >= 0 && newX < dungeon.width && 
          newY >= 0 && newY < dungeon.height && 
          dungeon.tiles[newY][newX] === 'floor') {
        
        // Check if new position is not occupied by another monster
        const isOccupied = monsters.some(m => m.position.x === newX && m.position.y === newY);
        if (!isOccupied) {
          return {
            ...monster,
            position: { x: newX, y: newY }
          };
        }
      }

      return monster;
    });

    set({ monsters: updatedMonsters });
  },

  addMessage: (message: string) => {
    set(state => ({
      messages: [...state.messages.slice(-4), message]
    }));
  },

  startGame: () => {
    // Generate and store level 1 dungeon at game start
    get().generateNewDungeon(1);
    set({ isGameRunning: true });
  },

  endGame: () => {
    set({ isGameRunning: false });
  },

  incrementTurn: () => {
    const { player, turnCount, messages, addMessage } = get();
    if (!player) return;

    set((state) => {
      // Update hunger every 10 turns
      let newHunger = player.stats.hunger;
      let hungerMessage = '';
      let starvationMessage = '';
      
      if ((turnCount + 1) % 10 === 0) {
        newHunger = Math.max(0, player.stats.hunger - 1);
        
        if (newHunger < 200 && player.stats.hunger >= 200) {
          hungerMessage = 'You are getting hungry.';
        }
        
        if (newHunger < 100 && player.stats.hunger >= 100) {
          starvationMessage = 'You are starving!';
        }
        
        // Starvation damage every 5 turns when starving
        if (newHunger < 100 && (turnCount + 1) % 5 === 0) {
          const newHp = Math.max(0, player.stats.hp - 1);
          if (newHp === 0) {
            starvationMessage = 'You have died of starvation! Game over.';
          }
        }
      }

      // Update player stats
      const updatedPlayer = {
        ...player,
        stats: {
          ...player.stats,
          hunger: newHunger,
          hp: newHunger < 100 && (turnCount + 1) % 5 === 0 ? Math.max(0, player.stats.hp - 1) : player.stats.hp,
        },
      };

      // Add messages if needed
      let newMessages = [...messages];
      if (hungerMessage) newMessages = [...newMessages.slice(-4), hungerMessage];
      if (starvationMessage) newMessages = [...newMessages.slice(-4), starvationMessage];
      // End game if player dies from starvation
      let isGameRunning = state.isGameRunning;
      if (player && player.stats.hp === 0) {
        newMessages = [...newMessages.slice(-4), 'You have died of starvation! Game over.'];
        isGameRunning = false;
      }
      return {
        ...state,
        player: updatedPlayer,
        turnCount: turnCount + 1,
        messages: newMessages,
        isGameRunning,
      };
    });
  },

  startIdentify: (scrollId: string) => {
    set({ identifyMode: { active: true, scrollId } });
  },
  cancelIdentify: () => {
    set({ identifyMode: { active: false, scrollId: null } });
  },
  completeIdentify: (itemId: string) => {
    const { player, identifyMode, addMessage } = get();
    if (!player || !identifyMode.active || !identifyMode.scrollId) return;
    // Mark the selected item as identified
    const item = player.inventory.items.find(i => i.id === itemId);
    if (item) {
      item.identified = true;
      addMessage(`You identify your ${item.template.name}.`);
    }
    // Remove the scroll from inventory
    set(state => ({
      player: state.player ? {
        ...state.player,
        inventory: Player.removeItemFromInventory(state.player.inventory, identifyMode.scrollId)
      } : null,
      identifyMode: { active: false, scrollId: null },
    }));
  },

  useItem: (itemId: string) => {
    const { player, addMessage, startIdentify } = get();
    if (!player) return;

    const item = player.inventory.items.find(i => i.id === itemId);
    if (!item) return;

    // Special handling for Identify Scroll: enter identify mode
    if (item.template.id === 'scroll_identify') {
      // Only allow if there is at least one unidentified item (excluding identify scrolls)
      const unidentified = player.inventory.items.find(
        i => !i.identified && i.id !== itemId && i.template.id !== 'scroll_identify'
      );
      if (unidentified) {
        startIdentify(itemId);
        addMessage('Select an item to identify.');
      } else {
        addMessage('You have nothing left to identify.');
      }
      return;
    }

    const result = ItemSystem.useItem(item, player.stats);
    addMessage(result.message);

    if (result.success && result.itemConsumed) {
      // Remove item from inventory
      set(state => ({
        player: state.player ? {
          ...state.player,
          inventory: Player.removeItemFromInventory(state.player.inventory, itemId)
        } : null
      }));

      // Update player stats if needed
      if (result.statsChanged) {
        set(state => ({
          player: state.player ? {
            ...state.player,
            stats: { ...state.player.stats, ...result.statsChanged }
          } : null
        }));
      }
    }
  },

  equipItem: (itemId: string) => {
    const { player, addMessage } = get();
    if (!player) return;

    const item = player.inventory.items.find(i => i.id === itemId);
    if (!item) return;

    if (!ItemSystem.canEquipItem(item)) {
      addMessage(`${item.template.name} cannot be equipped.`);
      return;
    }

    set(state => ({
      player: state.player ? {
        ...state.player,
        inventory: Player.equipItem(state.player.inventory, itemId)
      } : null
    }));

    addMessage(`You equip ${item.template.name}.`);
  },

  unequipItem: (slot: 'WEAPON' | 'ARMOR') => {
    const { player, addMessage } = get();
    if (!player) return;

    const equippedItem = slot === 'WEAPON' ? player.inventory.equippedWeapon : player.inventory.equippedArmor;
    if (!equippedItem) {
      addMessage(`No ${slot.toLowerCase()} is equipped.`);
      return;
    }

    set(state => ({
      player: state.player ? {
        ...state.player,
        inventory: Player.unequipItem(state.player.inventory, slot)
      } : null
    }));

    addMessage(`You unequip ${equippedItem.template.name}.`);
  },

  dropItem: (itemId: string) => {
    const { player, addMessage } = get();
    if (!player) return;

    const item = player.inventory.items.find(i => i.id === itemId);
    if (!item) return;

    // Remove from inventory
    set(state => ({
      player: state.player ? {
        ...state.player,
        inventory: Player.removeItemFromInventory(state.player.inventory, itemId)
      } : null
    }));

    // Add to map at player position
    const droppedItem = {
      ...item,
      position: { ...player.position }
    };

    set(state => ({
      items: [...state.items, droppedItem]
    }));

    addMessage(`You drop ${Item.getDisplayName(item)}.`);
  },

  goToNextLevel: () => {
    const { player, dungeonLevel, dungeon, dungeons, addMessage } = get();
    if (!player || !dungeon || !dungeon.stairsDown) return;
    const nextLevel = dungeonLevel + 1;
    addMessage(`You descend to level ${nextLevel}.`);
    // Save current dungeon state
    set(state => ({ dungeons: { ...state.dungeons, [dungeonLevel]: state.dungeon! } }));
    // Go to next level, spawn at up stairs (will be placed at player start)
    get().generateNewDungeon(nextLevel, undefined);
    // Restore player stats and inventory
    set(state => ({
      player: state.player ? {
        ...state.player,
        stats: player.stats,
        inventory: player.inventory,
      } : null
    }));
  },
  goToPreviousLevel: () => {
    const { player, dungeonLevel, dungeons, addMessage } = get();
    if (!player || dungeonLevel <= 1) return;
    const previousLevel = dungeonLevel - 1;
    // Save current dungeon state
    set(state => ({ dungeons: { ...state.dungeons, [dungeonLevel]: state.dungeon! } }));
    // Find the stairsDown location in the previous level
    const prevDungeon = dungeons[previousLevel];
    let entryPos: { x: number; y: number } | undefined = undefined;
    if (prevDungeon && prevDungeon.stairsDown) {
      entryPos = prevDungeon.stairsDown;
    }
    addMessage(`You ascend to level ${previousLevel}.`);
    get().generateNewDungeon(previousLevel, entryPos);
    // Restore player stats and inventory
    set(state => ({
      player: state.player ? {
        ...state.player,
        stats: player.stats,
        inventory: player.inventory,
      } : null
    }));
  },
})); 