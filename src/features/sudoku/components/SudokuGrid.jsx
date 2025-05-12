import React from 'react';

/**
 * SudokuGrid component renders a 9x9 Sudoku board with interactive cells.
 * Props:
 * - puzzle: 2D array with each cell containing { value, candidates }
 * - original: 2D array representing the initial puzzle (non-zero values are fixed)
 * - onToggleCandidate: function to toggle a candidate number in a cell
 * - conflicts: Set of cell keys ("i-j") that are currently in conflict
 * - onFocusCell: function to set which cell is focused
 * - focusedCell: { row, col } representing the currently selected cell
 * - relatedCells: Set of cell keys that are related to the focused cell (row/col/box)
 */
const SudokuGrid = ({
    puzzle,
    original,
    onToggleCandidate,
    conflicts,
    onFocusCell,
    focusedCell,
    relatedCells,
}) => {
    return (
        <div className="sudoku-grid">
            {puzzle.map((row, i) =>
                row.map((cell, j) => {
                    const isFixed = original[i][j] !== 0; // Check if the cell is pre-filled
                    const isConflict = conflicts.has(`${i}-${j}`); // Conflict flag
                    const isRelated = relatedCells.has(`${i}-${j}`); // Highlighted if related to focused cell
                    const isFocused = focusedCell?.row === i && focusedCell?.col === j; // Is this cell currently focused?
                    const { value, candidates = [] } = cell;

                    return (
                        <div
                            key={`${i}-${j}`}
                            tabIndex={!isFixed ? 0 : -1} // Make editable cells focusable via keyboard
                            className={`
                cell
                ${isFixed ? 'fixed' : ''}
                ${isConflict ? 'conflict' : ''}
                ${isRelated ? 'highlight' : ''}
                ${isFocused ? 'focused' : ''}
                ${(i + 1) % 3 === 0 && i !== 8 ? 'b-border' : ''} // Add bottom border after every 3 rows
                ${(j + 1) % 3 === 0 && j !== 8 ? 'r-border' : ''} // Add right border after every 3 columns
              `}
                            onClick={() => {
                                if (!isFixed) onFocusCell(i, j); // Focus cell on click if editable
                            }}
                        >
                            {value !== 0 ? (
                                // Show final value if filled
                                <span className="cell-value">{value}</span>
                            ) : isFocused ? (
                                // If focused, show interactive candidate grid
                                <div className="candidates-grid active">
                                    {Array.from({ length: 9 }, (_, k) => {
                                        const n = k + 1;
                                        return (
                                            <span
                                                key={n}
                                                className={`candidate ${candidates.includes(n) ? 'marked' : ''}`}
                                                onClick={e => {
                                                    e.stopPropagation(); // Prevent focus change
                                                    onToggleCandidate(i, j, n); // Toggle candidate number
                                                }}
                                            >
                                                {n}
                                            </span>
                                        );
                                    })}
                                </div>
                            ) : candidates.length > 0 ? (
                                // If not focused but has candidates, show inactive version
                                <div className="candidates-grid active">
                                    {Array.from({ length: 9 }, (_, k) => {
                                        const n = k + 1;
                                        return (
                                            <span
                                                key={n}
                                                className={`inactive-candidate ${candidates.includes(n) ? 'marked' : ''}`}
                                            >
                                                {n}
                                            </span>
                                        );
                                    })}
                                </div>
                            ) : null}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default SudokuGrid;
