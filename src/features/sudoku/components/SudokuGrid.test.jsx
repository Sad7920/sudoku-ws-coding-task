import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SudokuGrid from './SudokuGrid';

const emptyGrid = Array(9).fill(null).map(() =>
    Array(9).fill({ value: 0, candidates: [] })
);
const original = Array(9).fill(Array(9).fill(0));
const onFocusCell = jest.fn();
const onToggleCandidate = jest.fn();

describe('Sudoku Grid', () => {

    test('renders 81 cells in the grid', () => {
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

