import { IReaderPosition } from '../contracts/reader-position';
import { ReaderBase } from './reader-base';

export class ReaderLeft extends ReaderBase {
    /**
     * @static
     * @param {Uint8ClampedArray} pixels
     * @param {number} lenRow
     * @param {number} lenCol
     * @returns {IReaderPosition}
     */
    static apply(
        pixels: Uint8ClampedArray,
        lenRow: number,
        lenCol: number
    ): IReaderPosition {
        let rowCurrent = -1;
        let getPixel = super.createGetPixel(pixels);

        let rowInit = 0;
        let rowEnd = lenRow;
        let colInit = 0;
        let colEnd = lenCol;

        for (let col = colInit; col < colEnd; col += 4) {
            for (let row = rowInit; row < rowEnd; row++) {
                rowCurrent = row * colEnd;

                let alpha = getPixel(rowCurrent + col + 3);

                if (alpha === 0) {
                    continue;
                }

                return { row, col };
            }
        }
    }
}
