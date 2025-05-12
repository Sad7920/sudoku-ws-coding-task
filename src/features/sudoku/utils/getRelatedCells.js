/**
 * Returns a set of coordinates for all cells related to a given cell.
 * Related cells include those in the same row, same column, and the same 3x3 box.
 *
 * @param {number} row - The row index of the cell (0-8).
 * @param {number} col - The column index of the cell (0-8).
 * @returns {Set} - A set of strings representing the coordinates of the related cells (e.g., "0-0").
 */
export function getRelatedCells(row, col) {
    const related = new Set();

    // Add all cells in the same row (same value for row)
    for (let j = 0; j < 9; j++) {
        related.add(`${row}-${j}`);
    }

    // Add all cells in the same column (same value for column)
    for (let i = 0; i < 9; i++) {
        related.add(`${i}-${col}`);
    }

    // Add all cells in the same 3x3 box
    const startRow = Math.floor(row / 3) * 3; // Calculate the starting row index of the 3x3 box
    const startCol = Math.floor(col / 3) * 3; // Calculate the starting column index of the 3x3 box
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            related.add(`${i}-${j}`);
        }
    }

    return related;
}