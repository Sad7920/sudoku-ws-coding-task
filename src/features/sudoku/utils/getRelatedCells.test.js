import { getRelatedCells } from "./getRelatedCells";

describe('getRelatedCells util function', () => {
    it('returns 21 unique related cell coordinates for middle cell (4,4)', () => {
        const result = getRelatedCells(4, 4);
        expect(result.size).toBe(21);
        expect(result.has('4-4')).toBe(true);
        expect(result.has('4-0')).toBe(true); // same row
        expect(result.has('0-4')).toBe(true); // same column
        expect(result.has('3-3')).toBe(true); // same box
    });

    it('returns correct related cells for top-left corner cell (0,0)', () => {
        const result = getRelatedCells(0, 0);
        expect(result.has('0-1')).toBe(true);
        expect(result.has('1-0')).toBe(true);
        expect(result.has('1-1')).toBe(true);
        expect(result.size).toBe(21);
    });

    it('returns correct related cells for bottom-right corner cell (8,8)', () => {
        const result = getRelatedCells(8, 8);
        expect(result.has('8-7')).toBe(true);
        expect(result.has('7-8')).toBe(true);
        expect(result.has('6-6')).toBe(true);
        expect(result.size).toBe(21);
    });

    it('returns correct related cells for edge cell (0,4)', () => {
        const result = getRelatedCells(0, 4);
        expect(result.has('0-0')).toBe(true); // same row
        expect(result.has('1-4')).toBe(true); // same column
        expect(result.has('1-3')).toBe(true); // same box
        expect(result.size).toBe(21);
    });

    it('returns only unique related cells for (3,3)', () => {
        const result = getRelatedCells(3, 3);
        const coordsArray = Array.from(result);
        const uniqueSet = new Set(coordsArray);
        expect(coordsArray.length).toBe(uniqueSet.size);
    });

    it('always includes the cell itself', () => {
        const coords = [
            [0, 0],
            [4, 4],
            [8, 8],
            [0, 4],
            [5, 2]
        ];
        coords.forEach(([row, col]) => {
            const result = getRelatedCells(row, col);
            expect(result.has(`${row}-${col}`)).toBe(true);
        });
    });


});