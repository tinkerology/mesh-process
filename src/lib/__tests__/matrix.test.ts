

import { Matrix } from '../matrix';

test('matrixMultiply', () => {
    let m1:number[][] = Matrix.matrixMultiply([[1,2],[3,4]], [[1,2],[5,6]]);
    expect(m1[0][0]).toBe(11);

    let m2:number[][] = Matrix.matrixMultiply([[1,2,3],[4,5,6]], [[7,8],[9,10],[11,12]]);
    expect(m2[0][0]).toBe(58);
    expect(m2[0][1]).toBe(64);
    expect(m2[1][0]).toBe(139);
    expect(m2[1][1]).toBe(154);
});

