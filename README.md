# Food Imposter

A food detective game. Each round shows a dish and four ingredients. Three belong in the recipe, one is the imposter. Find it before the 15 seconds run out.

## Run it in VS Code
1. Open this folder in VS Code (File > Open Folder > `food-imposter`).
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` > **Open with Live Server**.

You can also just double-click `index.html` to open it in your browser. No installs or build step needed.

## Files
- `index.html`: the three screens (start, game, end)
- `css/style.css`: all the styling
- `js/data.js`: the dish database (add your own dishes here)
- `js/game.js`: game logic, timer, scoring

## Tweak the game
Edit the settings at the top of `js/game.js`: rounds, lives, seconds per round, and points.

## Add a dish
Copy a block in `js/data.js`, then change the name, `real` ingredients and `imposters` (each with a short reason).
