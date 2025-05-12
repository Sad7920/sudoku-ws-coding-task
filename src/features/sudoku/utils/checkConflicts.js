export const checkConflicts = (grid) => {
    const conflictCells = new Set();

    // Rows & Columns
    for (let i = 0; i < 9; i++) {
        const rowMap = new Map();
        const colMap = new Map();
        for (let j = 0; j < 9; j++) {
            const rowVal = grid[i][j];
            const colVal = grid[j][i];

            if (rowVal !== 0) {
                if (rowMap.has(rowVal)) {
                    conflictCells.add(`${i}-${j}`);
                    conflictCells.add(`${i}-${rowMap.get(rowVal)}`);
                } else rowMap.set(rowVal, j);
            }

            if (colVal !== 0) {
                if (colMap.has(colVal)) {
                    conflictCells.add(`${j}-${i}`);
                    conflictCells.add(`${colMap.get(colVal)}-${i}`);
                } else colMap.set(colVal, j);
            }
        }
    }

    // 3x3 Boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const boxMap = new Map();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const row = boxRow * 3 + i;
                    const col = boxCol * 3 + j;
                    const val = grid[row][col];
                    if (val !== 0) {
                        if (boxMap.has(val)) {
                            const prev = boxMap.get(val);
                            conflictCells.add(`${row}-${col}`);
                            conflictCells.add(`${prev.row}-${prev.col}`);
                        } else {
                            boxMap.set(val, { row, col });
                        }
                    }
                }
            }
        }
    }

    return conflictCells;
};
