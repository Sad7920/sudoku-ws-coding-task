/**
 * Function to check conflicts in a Sudoku grid.
 * A conflict occurs when the same value appears more than once in the same row, column, or 3x3 subgrid.
 * 
 * @param {Array} grid - The 9x9 Sudoku grid (array of arrays).
 * @returns {Set} conflictCells - A set containing the coordinates of conflicting cells in the grid.
 */
export const checkConflicts = (grid) => {
    // Initialize a set to store the coordinates of conflicting cells
    const conflictCells = new Set();

    // Check rows and columns for conflicts
    for (let i = 0; i < 9; i++) {
        const rowMap = new Map();  // To track numbers in the current row
        const colMap = new Map();  // To track numbers in the current column

        for (let j = 0; j < 9; j++) {
            const rowVal = grid[i][j];  // Value from the current row
            const colVal = grid[j][i];  // Value from the current column

            // Check row for duplicates (ignoring zeroes)
            if (rowVal !== 0) {
                if (rowMap.has(rowVal)) {
                    conflictCells.add(`${i}-${j}`);
                    conflictCells.add(`${i}-${rowMap.get(rowVal)}`);
                } else {
                    rowMap.set(rowVal, j);  // Store column index of the value
                }
            }

            // Check column for duplicates (ignoring zeroes)
            if (colVal !== 0) {
                if (colMap.has(colVal)) {
                    conflictCells.add(`${j}-${i}`);
                    conflictCells.add(`${colMap.get(colVal)}-${i}`);
                } else {
                    colMap.set(colVal, j);  // Store row index of the value
                }
            }
        }
    }

    // Check 3x3 subgrids for conflicts
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const boxMap = new Map();  // To track numbers in the current 3x3 subgrid

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const row = boxRow * 3 + i;  // Row index for the current 3x3 subgrid
                    const col = boxCol * 3 + j;  // Column index for the current 3x3 subgrid
                    const val = grid[row][col];  // Value at the current position

                    // Check 3x3 subgrid for duplicates (ignoring zeroes)
                    if (val !== 0) {
                        if (boxMap.has(val)) {
                            const prev = boxMap.get(val);
                            conflictCells.add(`${row}-${col}`);
                            conflictCells.add(`${prev.row}-${prev.col}`);
                        } else {
                            boxMap.set(val, { row, col });  // Store the current position of the value
                        }
                    }
                }
            }
        }
    }

    // Return the set of conflict cells
    return conflictCells;
};