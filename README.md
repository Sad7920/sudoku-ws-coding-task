# Sudoku Puzzle Game

A responsive and interactive Sudoku puzzle game built with React. This app allows users to play Sudoku on a dynamic grid, with the ability to pause, reset, and track their progress. It’s designed with a user-friendly interface that adjusts based on screen size, providing a smooth experience across various devices.

## Features

- **Dynamic Sudoku Grid**: A 9x9 grid where users can input numbers to solve the puzzle.
- **Random Difficulty Levels**: The difficulty level is randomly generated each time a new puzzle is fetched.
- **Timer**: Track how long it takes to solve the puzzle.
- **Pause and Resume**: Pause the game and resume it later without losing progress.
- **Reset Puzzle**: Reset the current puzzle to start fresh.
- **Responsive Design**: Optimized for desktop and mobile devices, with adaptive layout based on screen size.
- **Conflict Highlighting**: Visual indication of conflicting numbers within the grid.
- **Candidate Selection**: Hover over empty cells to display possible candidate numbers.

## Tech Stack

- **Frontend**: React, React Hooks
- **Styling**: CSS, responsive design with `clamp()` for fluid typography
- **Testing**: Jest, React Testing Library (for unit tests and component testing)

## Installation

To get this project up and running on your local machine, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Sad7920/sudoku-ws-coding-task.git
```

### 2. Install dependencies

Navigate to the project directory and install the required dependencies.

```bash
cd sudoku-ws-coding-task
npm install
```

### 3. Start the development server

Run the following command to start the app locally:

```bash
npm run dev
```

Your app should now be running at `http://localhost:5173`.

## How to Play

1. **Start a new game**: When the app loads, the game grid will display with random numbers and empty cells. The difficulty level is generated randomly for each new puzzle.
2. **Solve the puzzle**: Click on empty cells and input numbers to solve the puzzle.
3. **Pause the game**: If you need to take a break, click the Pause button. The game will be paused, and you can resume later.
4. **Reset the game**: If you wish to start over, simply click the Reset button.
5. **Track progress**: Keep an eye on the timer to track how long it takes you to solve the puzzle.

## Testing

This project includes unit tests for core components using Jest and React Testing Library. To run the tests:

```bash
npm test
```

This will run all the tests, and you’ll be able to see the results in the console.
