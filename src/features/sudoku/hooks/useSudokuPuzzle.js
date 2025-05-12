import { useEffect, useState } from 'react';

const useSudokuPuzzle = () => {
    const [puzzle, setPuzzle] = useState(null);
    const [solution, setSolution] = useState(null);
    const [loading, setLoading] = useState(true);
    const [difficulty, setDifficulty] = useState(null);

    const fetchPuzzle = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://sudoku-api.vercel.app/api/dosuku');
            const data = await response.json();
            console.log(data);

            const grid = data.newboard.grids[0];
            console.log(grid);


            setPuzzle(grid.value);
            setSolution(grid.solution);
            setDifficulty(grid.difficulty);
        } catch (error) {
            console.error('Failed to fetch puzzle:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPuzzle();
    }, []);

    return { puzzle, solution, difficulty, loading, regeneratePuzzle: fetchPuzzle };
};

export default useSudokuPuzzle;
