import React from 'react';

const SudokuGrid = ({
    puzzle,
    original,
    onCellChange,
    onToggleCandidate,
    conflicts,
    onFocusCell,
    focusedCell,
    relatedCells,
    hoveredCell,
    setHoveredCell,
}) => {
    return (
        <div className="sudoku-grid">
            {puzzle.map((row, i) =>
                row.map((cell, j) => {
                    const isFixed = original[i][j] !== 0;
                    const isConflict = conflicts.has(`${i}-${j}`);
                    const isRelated = relatedCells.has(`${i}-${j}`);
                    const isFocused = focusedCell?.row === i && focusedCell?.col === j;
                    const isHovered = hoveredCell?.row === i && hoveredCell?.col === j;
                    const { value, candidates = [] } = cell;
                    return (
                        <div
                            key={`${i}-${j}`}
                            tabIndex={!isFixed ? 0 : -1}
                            className={`
                cell
                ${isFixed ? 'fixed' : ''}
                ${isConflict ? 'conflict' : ''}
                ${isRelated ? 'highlight' : ''}
                ${isFocused ? 'focused' : ''}
                ${(i + 1) % 3 === 0 && i !== 8 ? 'b-border' : ''}
                ${(j + 1) % 3 === 0 && j !== 8 ? 'r-border' : ''}
              `}
                            onClick={() => {
                                if (!isFixed) onFocusCell(i, j);
                            }}
                            onMouseEnter={() => {
                                if (!isFixed && value === 0) setHoveredCell({ row: i, col: j });
                            }}
                            onMouseLeave={() => {
                                setHoveredCell(null);
                            }}
                        >
                            {value !== 0 ? (
                                <span className="cell-value">{value}</span>
                            ) : isFocused ? (
                                <div className="candidates-grid active">
                                    {Array.from({ length: 9 }, (_, k) => {
                                        const n = k + 1;
                                        return (
                                            <span
                                                key={n}
                                                className={`candidate ${candidates.includes(n) ? 'marked' : ''}`}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    onToggleCandidate(i, j, n);
                                                }}
                                            >
                                                {n}
                                            </span>
                                        );
                                    })}
                                </div>
                            ) : candidates.length > 0 ? (
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
