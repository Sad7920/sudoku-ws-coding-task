import { checkConflicts } from "./checkConflicts";

describe('checkConflicts util function', () => {
    it('should return an empty set for a valid grid', () => {
        const validGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
        expect(checkConflicts(validGrid).size).toBe(0);
    });

    it('detects a row conflict', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[0][0] = 5;
        grid[0][3] = 5; // duplicate in same row
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set(['0-0', '0-3']));
    });

    it('detects a column conflict', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[1][2] = 7;
        grid[6][2] = 7; // duplicate in same column
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set(['1-2', '6-2']));
    });

    it('detects a box conflict', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[0][0] = 3;
        grid[1][1] = 3; // duplicate in top-left 3x3 box
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set(['0-0', '1-1']));
    });

    it('detects multiple conflicts across row, col, and box', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[2][2] = 9;
        grid[2][5] = 9; // row conflict
        grid[5][2] = 9; // column conflict
        grid[1][1] = 9; // box conflict
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set([
            '2-2', '2-5', // row
            '2-2', '5-2', // col
            '2-2', '1-1'  // box
        ]));
    });

    it('does not flag a correctly filled row with unique values', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set()); // no conflict expected
    });

    it('ignores zeros (empty cells) when checking conflicts', () => {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        grid[0][0] = 0;
        grid[0][5] = 5;
        grid[0][8] = 5; // duplicate
        const result = checkConflicts(grid);
        expect(result).toEqual(new Set(['0-5', '0-8']));
    });

})