import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import useSudokuPuzzle from './features/sudoku/hooks/useSudokuPuzzle';
import useWindowSize from './features/sudoku/hooks/useWindowSize';

jest.mock('./features/sudoku/hooks/useSudokuPuzzle');
jest.mock('./features/sudoku/hooks/useWindowSize');

const mockPuzzle = Array(9).fill(Array(9).fill(0));
const mockSolution = Array(9).fill(Array(9).fill(1));

describe('App Component', () => {

    beforeEach(() => {
        useSudokuPuzzle.mockReturnValue({
            puzzle: mockPuzzle,
            solution: mockSolution,
            difficulty: 'Easy',
            loading: false,
            regeneratePuzzle: jest.fn(),
        });
        useWindowSize.mockReturnValue({ width: 800, height: 600 });
    });

    test('renders App with title and grid', () => {
        render(<App />);
        expect(screen.getByText(/Sudoku/i)).toBeInTheDocument();
        expect(screen.getByText(/Difficulty/i)).toBeInTheDocument();
    });

    test('shows pause modal on Pause button click', () => {
        render(<App />);
        fireEvent.click(screen.getByText(/Pause/i));
        expect(screen.getByText(/Your game has been paused/i)).toBeInTheDocument();
    });

    test('shows reset modal on Reset button click', () => {
        render(<App />);
        fireEvent.click(screen.getByText(/Reset/i));
        expect(screen.getByText(/Reset the puzzle/i)).toBeInTheDocument();
    });

})
