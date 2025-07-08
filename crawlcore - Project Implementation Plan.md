# CrawlCore: Project Implementation Plan

**Version:** 1.2
**Date:** 2025-07-07

This document outlines the full implementation plan for **CrawlCore**, a modern, browser-playable, turn-based roguelike with a deep meta-progression system, designed with a mobile-first philosophy.

## 1. Vision & Guiding Principles

### Vision Statement
CrawlCore is a stylish, modern dungeon crawler built for the browser. It features infinite replayability through procedural levels, a punishing permadeath loop, and a layered identification system. It is designed for long-term engagement through a meta-progression system that allows players to unlock new content and possibilities for future runs.

### Guiding Principles
* **Mobile-First & Browser-Native:** The game's interface and controls must be designed for touch screens from the ground up, ensuring a seamless, responsive experience on both mobile and desktop without requiring an app store install.
* **Clarity over Complexity:** Systems should be deep but presented to the player in a clean, understandable way with large, touch-friendly UI elements.
* **Rewarding Persistence:** Provide long-term goals and unlocks to reward players for their continued exploration and achievements.
* **MVP-Driven Development:** We will build the simplest core loop first, ensure it's fun, and then layer on complexity.
* **Fast Feedback Loop:** The turn-based nature should feel snappy and responsive to both touch and keyboard inputs.

## 2. Core Features

### MVP Scope (Initial Playable Version)
* **Dungeon Generation:** Procedurally generated single-themed levels.
* **Player:** A single character class with core stats.
* **Combat:** Turn-based, bump-to-attack combat.
* **Monsters:** 3 distinct monster types with basic AI.
* **Items:** A limited set including potions, gear, and food.
* **Systems:** Functional permadeath, hunger clock, and local high-scores.
* **UI & Controls:** A minimal HUD and inventory screen. All interactions must be functional via a **touch-first interface** (e.g., tap-to-move, on-screen buttons) and keyboard.

### Full Vision Features (Includes Post-MVP)
* All MVP features plus:
* **Deep Meta-Progression:** An achievement-based system for unlocking content.
* **Expanded Content:** Multiple player classes, a large bestiary, dozens of items, and varied dungeon biomes.
* **Online Functionality:** Global leaderboards and seeded daily challenges.

## 3. Meta-Progression System: "The Core Echo"

The meta-progression system is designed to add variety and long-term goals without compromising the challenge of individual runs.

* **Concept:** Players earn **Core Fragments** by completing in-game feats.
* **The Workshop:** A touch-friendly hub accessible from the main menu to spend Core Fragments.
* **Unlockables:**
    * **Item Blueprints:** Adds new items to the dungeon's loot table.
    * **Character Matrixes:** Unlocks new playable classes.
    * **World Seeds:** Unlocks new special rooms, biomes, and monsters.
    * **Cosmetic Glyphs:** Unlocks new visual skins.

## 4. Technology Stack

* **Frontend Framework:** **React** (with Vite).
* **Rendering Engine:** **PixiJS**.
* **State Management:** **Zustand** (for in-run and meta-progression state).
* **Pathfinding:** `easystar.js` or a custom A* implementation.
* **Persistence:** Browser **LocalStorage**.
* **Backend (Post-MVP):** **Supabase** or **Firebase Firestore**.

## 5. Key Modules & Technical Design

* **`GameEngine`:** Manages the core game loop and state.
* **`DungeonGenerator`:** Generates levels.
* **`Renderer`:** Renders the game state via PixiJS.
* **`PlayerController`:** Handles keyboard (`keydown` events for WASD/Arrows) and a comprehensive **touch interface**. Touch controls will include on-screen directional pad/swipe for movement and tapping on UI elements or world targets for actions.
* **`AI_System`:** Manages monster behavior using A*.
* **`ItemSystem`:** Manages item randomization and identification.
* **`MessageLog`:** A log of in-game events.
* **`AchievementTracker` (New):** A system that tracks achievements and rewards Core Fragments.
* **`MetaState` (New):** A persistent store for meta-progression data.
* **`WorkshopUI` (New):** A touch-friendly React component tree for the meta-progression screen.

## 6. Art & Audio Asset List

* **Spritesheets:** `player.png`, `monsters.png`, `environment.png`, `items.png`.
* **UI Assets:**
    * Icons for achievements, Core Fragments, and Workshop UI.
    * **Touch Controls Graphics:** Scalable vector graphics (SVG) or sprites for an on-screen D-pad and action buttons.
* **Sound Effects & Music:** Standard set of SFX and an ambient dungeon track.

## 7. Development Roadmap (Sprint-Based)

### Sprint 0: Project Setup
* **Goal:** Initialize the project and development environment.
* **Outcome:** A blank screen rendered by PixiJS within a React app.

### Sprint 1: The Player on the Map
* **Goal:** Render a player character that can move on a static map.
* **Tasks:**
    * Create a static room via `DungeonGenerator`.
    * Render the grid and player.
    * Implement `PlayerController` for **both keyboard and basic touch input (e.g., swipe-to-move or on-screen D-Pad)**.
    * Implement Fog of War.
* **Outcome:** A player can move around a room using both keyboard and touch.

### Sprint 2: Procedural Generation & Exploration
* **Goal:** Make the world dynamic and explorable.
* **Outcome:** The player can explore a procedurally generated level and descend to the next.

### Sprint 3: Monsters & Combat
* **Goal:** Introduce conflict.
* **Tasks:**
    * Add monsters and pathfinding AI.
    * Implement bump-to-attack combat.
    * Implement permadeath.
    * **Ensure targeting for ranged attacks/spells (future) is designed for touch.**
* **Outcome:** The player can fight monsters. The game ends on death.

### Sprint 4: Items & Inventory
* **Goal:** Implement the core item loop with a mobile-first UI.
* **Tasks:**
    * Create a **touch-friendly inventory UI** (large tap targets, clear equip/drop/use buttons).
    * Implement item pickup/drop.
    * Implement usable items (potions, food).
    * Implement the Hunger clock.
* **Outcome:** The player can manage their inventory effectively on both desktop and mobile.

### Sprint 5: MVP Polish & Persistence
* **Goal:** Finalize the MVP for initial playtesting.
* **Outcome:** A complete, playable MVP of CrawlCore with a polished main menu, death screen, and local save system.

---
### **Post-MVP Development**
---

### Sprint 6 & 7: Meta-Progression & Content Expansion
* **Goals:** Implement the "Core Echo" system and add more content (classes, items, monsters) unlockable through it. All new UI must adhere to the mobile-first principle.

## 8. Post-Launch Roadmap (Stretch Goals)

* **Online Features:** Global leaderboards and daily challenges.
* **Advanced Content:** Themed dungeon branches, bosses, crafting.
* **Advanced Touch Controls:** Support for gestures like pinch-to-zoom on a map view.

## 9. Risk Assessment

* **Risk:** Designing a UI that works well on both large desktop screens and small mobile viewports is challenging.
    * **Mitigation:** Use responsive design principles (CSS flexbox/grid), test on real devices or browser dev tools frequently, and prioritize clear, scalable UI elements.
* **Risk:** Performance issues on low-end mobile devices.
    * **Mitigation:** Use texture atlases, profile rendering performance early, and keep rendering logic simple.
* **Risk:** Game balancing is notoriously difficult.
    * **Mitigation:** Ensure unlocks add variety, not just power. Playtest frequently.
* **Risk:** The meta-game feels grindy or unrewarding.
    * **Mitigation:** Make achievements fun to earn and unlocks meaningful.
* **Risk:** Scope creep.
    * **Mitigation:** Adhere strictly to the sprint-based roadmap.

## 10. License

* **Code:** MIT License.
* **Assets:** To be determined based on source (e.g., CC0, proprietary). To be tracked in a separate `ASSET_LICENSES.md` file.