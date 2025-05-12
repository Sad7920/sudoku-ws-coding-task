import { getRelatedCells } from "./getRelatedCells";

describe('getRelatedCells util function', () => {
    it('returns 21 unique related cell coordinates for middle cell (4,4)', () => {
        // Test for middle cell (4, 4) which should return 21 related cells
        const result = getRelatedCells(4, 4);
        expect(result.size).toBe(21); // 9 cells in row, 9 in column, and 3x3 box (minus the cell itself)
        expect(result.has('4-4')).toBe(true); // Check that the cell itself is included
        expect(result.has('4-0')).toBe(true); // Check if same row is included
        expect(result.has('0-4')).toBe(true); // Check if same column is included
        expect(result.has('3-3')).toBe(true); // Check if same 3x3 box is included
    });

    it('returns correct related cells for top-left corner cell (0,0)', () => {
        // Test for the top-left corner cell (0, 0)
        const result = getRelatedCells(0, 0);
        expect(result.has('0-1')).toBe(true); // Check if cell in the same row is included
        expect(result.has('1-0')).toBe(true); // Check if cell in the same column is included
        expect(result.has('1-1')).toBe(true); // Check if cell in the same 3x3 box is included
        expect(result.size).toBe(21); // Expect 21 unique related cells
    });

    it('returns correct related cells for bottom-right corner cell (8,8)', () => {
        // Test for the bottom-right corner cell (8, 8)
        const result = getRelatedCells(8, 8);
        expect(result.has('8-7')).toBe(true); // Check if cell in the same row is included
        expect(result.has('7-8')).toBe(true); // Check if cell in the same column is included
        expect(result.has('6-6')).toBe(true); // Check if cell in the same 3x3 box is included
        expect(result.size).toBe(21); // Expect 21 unique related cells
    });

    it('returns correct related cells for edge cell (0,4)', () => {
        // Test for edge cell (0, 4), checking row, column, and box relations
        const result = getRelatedCells(0, 4);
        expect(result.has('0-0')).toBe(true); // Check if cell in the same row is included
        expect(result.has('1-4')).toBe(true); // Check if cell in the same column is included
        expect(result.has('1-3')).toBe(true); // Check if cell in the same 3x3 box is included
        expect(result.size).toBe(21); // Expect 21 unique related cells
    });

    it('returns only unique related cells for (3,3)', () => {
        // Check that all related cells are unique
        const result = getRelatedCells(3, 3);
        const coordsArray = Array.from(result);
        const uniqueSet = new Set(coordsArray);
        expect(coordsArray.length).toBe(uniqueSet.size); // Ensure there are no duplicates
    });

    it('always includes the cell itself', () => {
        // Test multiple cells to ensure each includes itself as part of related cells
        const coords = [
            [0, 0],
            [4, 4],
            [8, 8],
            [0, 4],
            [5, 2]
        ];
        coords.forEach(([row, col]) => {
            const result = getRelatedCells(row, col);
            expect(result.has(`${row}-${col}`)).toBe(true); // Each test cell should be part of its related cells
        });
    });
});
