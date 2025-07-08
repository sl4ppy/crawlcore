# CrawlCore

A modern browser-based roguelike game built with React, Zustand, and PixiJS.

## Features
- Procedurally generated multi-level dungeons
- Turn-based movement and combat
- Monsters with simple and erratic AI
- Classic roguelike items: potions, scrolls, weapons, armor, food
- Inventory and equipment system
- Interactive identification for scrolls
- Hunger and status effects
- Modern UI/UX with touch-friendly inventory
- Smooth performance and mobile-friendly design

## Controls
- **Move:** Arrow keys or WASD
- **Attack:** Move into a monster
- **Pick up:** Move onto an item
- **Inventory:** Click the Inventory button in the HUD
- **Use/Equip/Drop:** Select an item in the inventory
- **Descend/Ascend stairs:** Move onto stair tiles (⬇️/⬆️)

## Screenshots
![Gameplay Screenshot](docs/screenshot-placeholder.png)

## Getting Started (Development)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/crawlcore.git
   cd crawlcore
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Deployment (GitHub Pages)

1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```
   This will publish the game to `https://YOUR_USERNAME.github.io/crawlcore/`

> **Note:** The `vite.config.ts` is configured for GitHub Pages with the correct `base` path.

## Project Structure
- `src/components/` — React UI components
- `src/core/` — Game logic (dungeon, entities, systems)
- `src/state/` — Zustand state management
- `src/assets/` — Sprites and static assets
- `public/` — Static files

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
