
import { BoundingBox } from "./boundingbox";

export interface VertexInterface {
    x : number;
    y : number;
    z : number;

    clone() : VertexInterface;

    isEqual(v : VertexInterface) : boolean;

    isInside(boundingBox:BoundingBox) : boolean;

    distance( v: VertexInterface) : number;

    mirror(x:boolean, y:boolean, z:boolean) : VertexInterface;
    scale(v : VertexInterface) : VertexInterface;
    add(v : VertexInterface) : VertexInterface;
    subtract(v : VertexInterface) : VertexInterface;
    dot(v : VertexInterface) : number;
    cross(v : VertexInterface) : VertexInterface;
    length() : number;
}

export class Vertex implements VertexInterface {
    x = 0;
    y = 0;
    z = 0;

    constructor(x : number, y : number, z : number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString() : string {
        return "Vertex " + this.x + ", " + this.y + ", " + this.z;
    }

    clone() : VertexInterface {
        return new Vertex(this.x, this.y, this.z);
    }

    isEqual( v : VertexInterface ) : boolean {
        if ( v.x === this.x && v.y === this.y && v.z === this.z ) {
            return true;
        }
        return false;
    }

    isInside(boundingBox:BoundingBox) : boolean {
        return boundingBox.isInside(this.x, this.y, this.z);
    }

    distance( v:VertexInterface) : number {
        return new Vertex(this.x-v.x, this.y-v.y, this.z-v.z).length();
    }

    scale(v:VertexInterface) : VertexInterface {
        return new Vertex(this.x*v.x, this.y*v.y, this.z*v.z);
    }

    add(v : VertexInterface) : VertexInterface {
        return new Vertex(this.x+v.x, this.y+v.y, this.z+v.z);
    }

    subtract(v : VertexInterface) : VertexInterface {
        return new Vertex(this.x-v.x, this.y-v.y, this.z-v.z);
    }

    mirror(x:boolean, y:boolean, z:boolean) : VertexInterface {
        return new Vertex(x ? -1 * this.x : this.x, y ? -1 * this.y : this.y, z ? -1 * this.z : this.z);
    }

    dot(v : VertexInterface) : number {
        return ( this.x * v.x + this.y * v.y + this.z * v.z);
      }
    
    cross(v : VertexInterface) : VertexInterface {
        return new Vertex(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x);
    }
    
    length() : number {
        return Math.sqrt(
            this.x * this.x +
            this.y * this.y +
            this.z * this.z);
    }
    
    // https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
    static matrixMultiply(a:number[][], b:number[][]) : number[] {
        var result = new Array(a.length);
        for (var r = 0; r < a.length; ++r) {
            result[r] = new Array(b[0].length);
            for (var c = 0; c < b[0].length; ++c) {
                result[r][c] = 0;
                for (var i = 0; i < a[0].length; ++i) {
                    result[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return result;
    }

    static matrixMultiply2(a:number[][], b:number[][]) : number[][] {
        var result:number[][] = [];
        for (var r = 0; r < a.length-1; r++) {
            result.push([]);
            for (var c = 0; c < b[0].length-1; c++) {
                let accum:number = 0;
                for (var i = 0; i < a[0].length; ++i) {
                    accum += a[r][i] * b[i][c];
                }
                result[r].push(accum);
            }
        }
        return result;
    }
}
