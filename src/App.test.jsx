import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; // The main App component that is being tested
import useSudokuPuzzle from './features/sudoku/hooks/useSudokuPuzzle'; // Custom hook to fetch puzzle data
import useWindowSize from './features/sudoku/hooks/useWindowSize'; // Custom hook to get window size

// Mock the custom hooks used in the App component
jest.mock('./features/sudoku/hooks/useSudokuPuzzle');
jest.mock('./features/sudoku/hooks/useWindowSize');

// Define mock puzzle data and solution for testing
const mockPuzzle = Array(9).fill(Array(9).fill(0)); // 9x9 grid filled with 0s
const mockSolution = Array(9).fill(Array(9).fill(1)); // 9x9 grid filled with 1s

describe('App Component', () => {

    // Before each test, mock the return values of the custom hooks
    beforeEach(() => {
        useSudokuPuzzle.mockReturnValue({
            puzzle: mockPuzzle, // Return the mock puzzle
            solution: mockSolution, // Return the mock solution
            difficulty: 'Easy', // Set the difficulty for testing
            loading: false, // Simulate that loading is complete
            regeneratePuzzle: jest.fn(), // Mock function to regenerate the puzzle
        });

        useWindowSize.mockReturnValue({ width: 800, height: 600 }); // Mock the window size
    });

    // Test to check if the app renders the title and difficulty correctly
    test('renders App with title and grid', () => {
        render(<App />); // Render the App component
        expect(screen.getByText(/Sudoku/i)).toBeInTheDocument(); // Ensure the title "Sudoku" is in the document
        expect(screen.getByText(/Difficulty/i)).toBeInTheDocument(); // Ensure the difficulty level is displayed
    });

    // Test to check if the Pause modal appears when the Pause button is clicked
    test('shows pause modal on Pause button click', () => {
        render(<App />); // Render the App component
        fireEvent.click(screen.getByText(/Pause/i)); // Simulate a click on the "Pause" button
        // Check if the Pause modal appears in the document
        expect(screen.getByText(/Your game has been paused/i)).toBeInTheDocument();
    });

    // Test to check if the Reset modal appears when the Reset button is clicked
    test('shows reset modal on Reset button click', () => {
        render(<App />); // Render the App component
        fireEvent.click(screen.getByText(/Reset/i)); // Simulate a click on the "Reset" button
        // Check if the Reset modal appears in the document
        expect(screen.getByText(/Reset the puzzle/i)).toBeInTheDocument();
    });

    // Add additional tests here (e.g., check if the Sudoku grid is populated, test user interactions with the grid, etc.)

});
