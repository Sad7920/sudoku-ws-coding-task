export function getRelatedCells(row, col) {
    const related = new Set();

    // Same row
    for (let j = 0; j < 9; j++) {
        related.add(`${row}-${j}`);
    }

    // Same column
    for (let i = 0; i < 9; i++) {
        related.add(`${i}-${col}`);
    }

    // Same box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            related.add(`${i}-${j}`);
        }
    }

    return related;
}
