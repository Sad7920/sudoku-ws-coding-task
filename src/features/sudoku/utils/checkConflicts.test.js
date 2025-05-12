import { checkConflicts } from "./checkConflicts";

describe('checkConflicts util function', () => {

    // Test case for an empty grid with no conflicts
    it('should return an empty set for a valid grid', () => {
        const validGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
        expect(checkConflicts(validGrid).size).toBe(0); // No conflicts expected
    });

    // Test case for a conflict in a row
    it('detects a row conflict', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[0][0] = 5;
        grid[0][3] = 5; // duplicate in same row
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set(['0-0', '0-3'])); // Conflict detected in row
    });

    // Test case for a conflict in a column
    it('detects a column conflict', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[1][2] = 7;
        grid[6][2] = 7; // duplicate in same column
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set(['1-2', '6-2'])); // Conflict detected in column
    });

    // Test case for a conflict in a 3x3 box
    it('detects a box conflict', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[0][0] = 3;
        grid[1][1] = 3; // duplicate in top-left 3x3 box
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set(['0-0', '1-1'])); // Conflict detected in box
    });

    // Test case for multiple conflicts across row, column, and box
    it('detects multiple conflicts across row, col, and box', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[2][2] = 9;
        grid[2][5] = 9; // row conflict
        grid[5][2] = 9; // column conflict
        grid[1][1] = 9; // box conflict
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set([
            '2-2', '2-5', // row conflict
            '2-2', '5-2', // column conflict
            '2-2', '1-1'  // box conflict
        ])); // Multiple conflicts detected
    });

    // Test case for a correctly filled row with unique values (no conflict)
    it('does not flag a correctly filled row with unique values', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // No duplicates in the row
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set()); // No conflict expected
    });

    // Test case to ignore empty cells (zeros) when checking conflicts
    it('ignores zeros (empty cells) when checking conflicts', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[0][0] = 0;
        grid[0][5] = 5;
        grid[0][8] = 5; // duplicate in the row, ignoring zero
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set(['0-5', '0-8'])); // Conflict detected, zeros ignored
    });

});