import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch and manage a Sudoku puzzle from a remote API.
 * Provides the puzzle, solution, difficulty level, loading status,
 * and a method to regenerate a new puzzle.
 */
const useSudokuPuzzle = () => {
    const [puzzle, setPuzzle] = useState(null);         // Stores the current puzzle grid
    const [solution, setSolution] = useState(null);     // Stores the solution to the puzzle
    const [loading, setLoading] = useState(true);       // Indicates if the puzzle is being loaded
    const [difficulty, setDifficulty] = useState(null); // Stores the difficulty level of the puzzle

    // Fetches a new Sudoku puzzle from the API
    const fetchPuzzle = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch('https://sudoku-api.vercel.app/api/dosuku');
            const data = await response.json();

            const grid = data.newboard.grids[0]; // Extract the first puzzle grid

            // Update state with puzzle data
            setPuzzle(grid.value);
            setSolution(grid.solution);
            setDifficulty(grid.difficulty);
        } catch (error) {
            console.error('Failed to fetch puzzle:', error); // Log any fetch errors
        } finally {
            setLoading(false); // End loading regardless of success or failure
        }
    };

    // Fetch puzzle on initial render
    useEffect(() => {
        fetchPuzzle();
    }, []);

    // Expose puzzle data and a function to regenerate
    return { puzzle, solution, difficulty, loading, regeneratePuzzle: fetchPuzzle };
};

export default useSudokuPuzzle;