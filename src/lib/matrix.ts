
export class Matrix {

    // https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
    static multiply(a:number[][], b:number[][]) : number[][] {
        const result = new Array<number[]>(a.length);
        for (let r = 0; r < a.length; ++r) {
            result[r] = new Array(b[0].length);
            for (let c = 0; c < b[0].length; ++c) {
                result[r][c] = 0;
                for (let i = 0; i < a[0].length; ++i) {
                    result[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return result;
    }
}
