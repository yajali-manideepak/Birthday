# Stella Birthday World v2.0.1

Complete published free-roam game source with all four human models and optimized character textures included.

## Run

Install Node.js 20 or later from https://nodejs.org if needed. Extract this ZIP completely, then double-click START-WINDOWS.cmd. Open http://127.0.0.1:4173 in Chrome or Edge. Alternatively run npm start from this folder.

No npm install, API keys, .env file, or character downloads are required. Optional Google Fonts load online; local fonts work offline.

## Controls

WASD/arrows: walk. Drag: look. Click floor: walk there. E or central prompt: interact. Shift: faster movement. Space: hop. Q near Stella/ManiDeepak while carrying cake: share together. M: music. H/Escape: help/pause. R: replay cake ceremony.

## Source

Edit dist/game.js for controls and interactions, dist/venue.js for the hall and cake, dist/humans.js for characters, dist/navigation.js for routes and collisions, and dist/game.css for the game interface. dist/index.html and style.css also contain the birthday letter, memory, and gift sections.

Generic human models are Microsoft Rocketbox assets under the MIT License. Their license, source provenance and rig validation results are in dist/assets/. They are not custom likenesses of Stella or ManiDeepak. Three.js and addon code retain their MIT license.

SHA256SUMS.json records hashes and sizes of the downloaded published runtime and assets. The package uses the exact published v2.0.1 game files. Serving and celebration are simplified game animations.
