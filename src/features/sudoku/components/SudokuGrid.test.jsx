import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SudokuGrid from './SudokuGrid';

// Create a 9x9 grid of empty cells with no candidates
const emptyGrid = Array(9).fill(null).map(() =>
    Array(9).fill({ value: 0, candidates: [] })
);

// Original grid used to determine which cells are fixed
const original = Array(9).fill(Array(9).fill(0));

// Mock callback functions for interactions
const onFocusCell = jest.fn();
const onToggleCandidate = jest.fn();

describe('Sudoku Grid', () => {

    test('renders 81 cells in the grid', () => {
        // Render the grid and ensure exactly 81 cells are present
        const { container } = render(
            <SudokuGrid
                puzzle={emptyGrid}
                original={original}
                onCellChange={() => { }}
                onToggleCandidate={onToggleCandidate}
                conflicts={new Set()}
                onFocusCell={onFocusCell}
                focusedCell={null}
                relatedCells={new Set()}
                hoveredCell={null}
                setHoveredCell={() => { }}
            />
        );
        const cells = container.querySelectorAll('.cell');
        expect(cells.length).toBe(81);
    });

    test('clicking an editable cell triggers onFocusCell', () => {
        // Click the first cell and verify the onFocusCell callback is triggered
        const { container } = render(
            <SudokuGrid
                puzzle={emptyGrid}
                original={original}
                onCellChange={() => { }}
                onToggleCandidate={onToggleCandidate}
                conflicts={new Set()}
                onFocusCell={onFocusCell}
                focusedCell={null}
                relatedCells={new Set()}
                hoveredCell={null}
                setHoveredCell={() => { }}
            />
        );
        const firstCell = container.querySelector('.cell');
        fireEvent.click(firstCell);
        expect(onFocusCell).toHaveBeenCalled();
    });

})

