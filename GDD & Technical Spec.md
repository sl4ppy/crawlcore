# CrawlCore: Combined Design & Technical Specification
---
# Part 1: Game Design Document (GDD)

**Version:** 1.1
**Author:** [Your Name Here]
**Date:** 2025-07-07

---

## 1. Core Vision & Player Experience

CrawlCore is designed to make the player feel like a daring, yet fragile, treasure hunter thrown into a dungeon that is actively hostile and deeply mysterious. The player should feel a constant, low-level tension, not from jump scares, but from calculated risks. Is it worth engaging that tough-looking monster to guard a single chest? Is this unidentified, shimmering potion the cure I desperately need, or a fast track to my demise? The core loop is a cycle of tactical exploration, resource management driven by the ever-present hunger clock, and experimental discovery. Every action is a turn, and every turn matters, pushing the player to make smart, sometimes desperate, choices to survive just one level deeper.

Death is not an end, but a transition. The sting of losing a promising run should be immediately softened by the rewarding feeling of progress in the meta-game. The player's triumphs and discoveries fuel "The Core Echo," permanently expanding the variety of items, encounters, and even character options for all future attempts. This creates a powerful secondary loop of long-term strategic growth, where the goal isn't just to survive longer, but to consciously shape a more interesting and unpredictable dungeon to conquer next time. The ultimate feeling is one of cleverness and resilience, where every failure is a lesson learned and every success is a hard-won victory.

## 2. Core Game Mechanics

### 2.1. Combat Formulas
- **To-Hit Chance Formula:** `(50 + (AttackerDexterity * 2) - (DefenderDexterity * 2)) %`
- **Damage Formula:** `(AttackerStrength + WeaponPower) - DefenderArmor`
    - `WeaponPower` is the `attack_bonus` from the attacker's equipped weapon. If no weapon is equipped, `WeaponPower` is 0.
    - `DefenderArmor` is the `Defense` stat of the defender plus the `defense_bonus` from any equipped armor.
- **Critical Hit Chance:** `AttackerLuck %`
- **Critical Hit Multiplier:** `1.5 * Normal Damage`

### 2.2. Player Progression
- **XP for Next Level Formula:** `100 * (CurrentLevel ^ 1.5)`
- **XP Reward per Kill Formula:** `MonsterBaseXP * MonsterLevel`
- **On Level Up:**
    - `HP += 10`
    - `Strength += 2`
    - `Dexterity += 2`
    - `Luck += 1`

### 2.3. System Parameters
- **Hunger:**
    - Player loses `1` hunger point every `10` turns.
    - Hunger range: `0` (Starving) to `1000` (Full).
    - **Effects:**
        - `< 200`: "Hungry" status, no penalty.
        - `< 100`: "Starving" status, player loses `1` HP every `5` turns.
- **Vision / Line of Sight (LOS):**
    - **Algorithm:** Recursive Shadowcasting
    - **Player Vision Radius:** `10` tiles

## 3. Content Specification

### 3.1. Player Classes

| ID | Name | Starting HP | Starting Str | Starting Dex | Starting Luck | Special Trait |
|:---|:---|:---|:---|:---|:---|:---|
| `warrior` | Warrior | 30 | 8 | 5 | 3 | Starts with `short_sword`. |
| `rogue` | Rogue | 20 | 5 | 8 | 5 | Starts with `leather_armor`. |

### 3.2. Monster Bestiary

| ID | Name | Sprite ID | HP | Attack | Defense | XP Reward | AI Type | Special Ability |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| `goblin` | Goblin | `goblin_1` | 10 | 3 | 1 | 5 | `SimpleChase` | None |
| `bat` | Giant Bat | `bat_1` | 7 | 2 | 0 | 3 | `ErraticChase` | High evasion. |
| `skeleton`| Skeleton | `skeleton_1`| 15 | 5 | 2 | 10 | `SimpleChase` | None |

### 3.3. Item Table

| ID | Name | Sprite ID | Type | Effect |
|:---|:---|:---|:---|:---|
| `potion_health` | Health Potion | `potion_red` | `POTION` | `{ "type": "HEAL", "amount": "2d4+2" }` |
| `potion_strength`| Potion of Strength | `potion_purple` | `POTION` | `{ "type": "BUFF", "stat": "Strength", "amount": 3, "duration": 20 }` |
| `scroll_identify`| Identify Scroll| `scroll_1` | `SCROLL` | `{ "type": "IDENTIFY" }` |
| `short_sword` | Short Sword | `sword_1` | `WEAPON` | `{ "type": "EQUIP", "slot": "WEAPON", "attack_bonus": 2 }` |
| `leather_armor`| Leather Armor | `armor_1` | `ARMOR` | `{ "type": "EQUIP", "slot": "ARMOR", "defense_bonus": 1 }` |
| `ration` | Ration | `food_1` | `FOOD` | `{ "type": "RESTORE_HUNGER", "amount": 250 }` |

### 3.4. Dungeon Generation Parameters
- **Map Size:** `80x50` tiles
- **Room Attempts:** `200`
- **Min Room Size:** `5x5`
- **Max Room Size:** `15x15`
- **Corridor Type:** Straight lines connecting room centers.

### 3.5. AI Behavior Definitions
- **`SimpleChase`**: Uses A* pathfinding to move one step directly towards the player's current location if the player is within the monster's line of sight.
- **`ErraticChase`**: On its turn, has a 75% chance to perform the `SimpleChase` behavior. Has a 25% chance to move one step in a random, valid cardinal direction instead.

## 4. Meta-Progression: The Core Echo

### 4.1. Achievements Table

| ID | Description | Trigger Condition | Reward (Fragments) |
|:---|:---|:---|:---|
| `reach_depth_5` | Reach Dungeon Depth 5 | `{ "event": "REACH_DEPTH", "value": 5 }` | 10 |
| `kill_10_goblins`| Defeat 10 Goblins | `{ "event": "KILL_MONSTER", "id": "goblin", "count": 10 }` | 5 |

### 4.2. Unlocks Table

| ID | Name | Type | Cost (Fragments) | Effect |
|:---|:---|:---|:---|:---|
| `unlock_rogue` | Rogue Class | `CLASS` | 20 | Unlocks the Rogue for selection. |
| `unlock_potion_str`| Potion of Strength | `ITEM` | 15 | Adds "Potion of Strength" to the dungeon loot table. |

---
---
# Part 2: Technical Specification

**Version:** 1.1
**Related GDD:** Version 1.1
**Date:** 2025-07-07

---

## 1. Technology Stack
- **Framework:** React (with Vite)
- **Renderer:** PixiJS
- **State Management:** Zustand
- **Persistence:** LocalStorage

## 2. Project Structure
/src
├── assets
│   ├── sprites
│   └── sfx
├── components
│   ├── game          # PixiJS related components
│   └── ui            # React DOM components (HUD, Inventory, Menus)
├── core
│   ├── systems       # Game logic (combat, movement, etc.)
│   ├── entities      # Class definitions for Player, Monster
│   └── dungeon       # Dungeon generation logic
├── state             # Zustand store definitions
├── utils             # Helper functions
├── App.tsx
└── main.tsx

## 3. Content Specification

<!-- 
    Use Markdown tables to define all game content. This is the database the LLM will use to populate the world. Be exhaustive.
-->

### 3.1. Player Classes

| ID | Name | Starting HP | Starting Str | Starting Dex | Starting Luck | Special Trait |
|:---|:---|:---|:---|:---|:---|:---|
| `warrior` | Warrior | 30 | 8 | 5 | 3 | Starts with `short_sword`. |
| `rogue` | Rogue | 20 | 5 | 8 | 5 | Starts with `leather_armor`. |

### 3.2. Monster Bestiary

| ID | Name | Sprite ID | HP | Attack | Defense | XP Reward | AI Type | Special Ability |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| `goblin` | Goblin | `goblin_1` | 10 | 3 | 1 | 5 | `SimpleChase` | None |
| `bat` | Giant Bat | `bat_1` | 7 | 2 | 0 | 3 | `ErraticChase` | High evasion. |
| `skeleton`| Skeleton | `skeleton_1`| 15 | 5 | 2 | 10 | `SimpleChase` | None |

### 3.3. Item Table

| ID | Name | Sprite ID | Type | Effect |
|:---|:---|:---|:---|:---|
| `potion_health` | Health Potion | `potion_red` | `POTION` | `{ "type": "HEAL", "amount": "2d4+2" }` |
| `potion_strength`| Potion of Strength | `potion_purple` | `POTION` | `{ "type": "BUFF", "stat": "Strength", "amount": 3, "duration": 20 }` |
| `scroll_identify`| Identify Scroll| `scroll_1` | `SCROLL` | `{ "type": "IDENTIFY" }` |
| `short_sword` | Short Sword | `sword_1` | `WEAPON` | `{ "type": "EQUIP", "slot": "WEAPON", "attack_bonus": 2 }` |
| `leather_armor`| Leather Armor | `armor_1` | `ARMOR` | `{ "type": "EQUIP", "slot": "ARMOR", "defense_bonus": 1 }` |
| `ration` | Ration | `food_1` | `FOOD` | `{ "type": "RESTORE_HUNGER", "amount": 250 }` |

### 3.4. Dungeon Generation Parameters
- **Map Size:** `80x50` tiles
- **Room Attempts:** `200`
- **Min Room Size:** `5x5`
- **Max Room Size:** `15x15`
- **Corridor Type:** Straight lines connecting room centers.

### 3.5. AI Behavior Definitions
- **`SimpleChase`**: Uses A* pathfinding to move one step directly towards the player's current location if the player is within the monster's line of sight.
- **`ErraticChase`**: On its turn, has a 75% chance to perform the `SimpleChase` behavior. Has a 25% chance to move one step in a random, valid cardinal direction instead.

## 4. Meta-Progression: The Core Echo

### 4.1. Achievements Table

| ID | Description | Trigger Condition | Reward (Fragments) |
|:---|:---|:---|:---|
| `reach_depth_5` | Reach Dungeon Depth 5 | `{ "event": "REACH_DEPTH", "value": 5 }` | 10 |
| `kill_10_goblins`| Defeat 10 Goblins | `{ "event": "KILL_MONSTER", "id": "goblin", "count": 10 }` | 5 |

### 4.2. Unlocks Table

| ID | Name | Type | Cost (Fragments) | Effect |
|:---|:---|:---|:---|:---|
| `unlock_rogue` | Rogue Class | `CLASS` | 20 | Unlocks the Rogue for selection. |
| `unlock_potion_str`| Potion of Strength | `ITEM` | 15 | Adds "Potion of Strength" to the dungeon loot table. |

---
---
# Part 2: Technical Specification
---

## 5. Component Architecture & Visuals

### 5.1. Component Architecture

<!-- 
    Briefly list the key React components and their primary responsibility.
-->
- **`App.tsx`**: Top-level component, manages which screen is active (Menu, Game, Workshop).
- **`GameScreen.tsx`**: Renders the game UI, including the `GameCanvas` and `HUD`.
- **`GameCanvas.tsx`**: Houses the PixiJS application, responsible for all world rendering.
- **`HUD.tsx`**: Displays player stats, dungeon level, and the message log.
- **`InventoryMenu.tsx`**: A modal overlay for managing the player's inventory. Touch-friendly.

### 5.2. Asset & Visual Specification

#### 5.2.1. Asset Naming Conventions
- **Sprites:** `[type]_[name]_[variant].png` (e.g., `monster_goblin_1.png`)
- **SFX:** `[category]_[action].wav` (e.g., `combat_hit.wav`)

#### 5.2.2. Color Palette
- **Background:** `#1a1c2c`
- **Walls:** `#5d275d`
- **Floors:** `#3a3f5e`
- **Player:** `#ffffff`
- **Friendly/Highlight:** `#00ff7f`
- **Hostile/Warning:** `#ff004d`