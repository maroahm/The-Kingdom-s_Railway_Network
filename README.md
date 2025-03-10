# The Kingdom's Railway Network [JavaScript, HTML, CSS]

### Overview
*The Kingdom's Railway Network* is a grid-based puzzle game where players build a continuous circular railway across a dynamically generated map while overcoming terrain constraints. The game ensures a structured placement of railway elements and validates the solution based on predefined rules.

### Features
- **Grid-Based Railway Construction** – Players place railway elements on a **5x5 or 7x7 grid**, ensuring a **closed-loop track** without intersections or dead ends.
- **Terrain Constraints** – Bridges allow only straight tracks, mountains force 90° turns, and oases prohibit placement.
- **Dynamic Map Generation** – Loads a random **predefined map** based on the chosen difficulty (Easy/Hard).
- **Element Placement Mechanics** – Players can:
  - Click on cells to cycle through elements.
  - Right-click to rotate or remove elements.
  - Draw paths by holding down the mouse button and dragging across tiles.
- **Game Validation** – Ensures:
  - All required cells are **covered only once**.
  - The railway **forms a continuous loop**.
  - Correct **terrain-based placement rules** are followed.
- **Leaderboard** – Saves the fastest completion times using **LocalStorage**, displaying top scores per difficulty.
- **Game State Persistence** – Saves progress mid-game, allowing players to **resume from their last session**.
- **Minimalist & Responsive UI** – Optimized for **1024x768 resolution and above**, ensuring a clean and accessible interface.

### Technologies Used
- **JavaScript** – Handles **game logic, event listeners, validation, and saving/loading progress**.
- **HTML & CSS** – Provides the **grid layout, menu system, and animations**.
- **LocalStorage** – Saves **leaderboards and game progress** between sessions.

### How to Play
1. **Start the Game** – Choose a **player name** and **difficulty level** from the menu.
2. **Build the Railway** – Place and rotate track pieces **to form a complete loop**.
3. **Follow Terrain Rules**:
   - **Bridges**: Only allow **straight** railway.
   - **Mountains**: Force **90° turns**.
   - **Oases**: **No railway** allowed.
   - **Empty Tiles**: Any railway shape is permitted.
4. **Complete the Puzzle** – The game automatically checks if the track **forms a valid loop**.
5. **Check Your Time & Score** – If successful, the completion time is **saved to the leaderboard**.

### Future Enhancements
- **Additional Map Variations** – Expand difficulty levels with **larger grids and more complex layouts**.
- **Multiplayer Mode** – Introduce **competitive puzzle-solving** with real-time tracking.
- **Themed Graphics & Animations** – Improve visual appeal with **custom-designed assets and animations**.

### Author
Your Name

