import { BoundingBox } from './boundingbox';
import { Matrix } from './matrix';
import { Util } from './util';

export interface VertexInterface {
    x: number;
    y: number;
    z: number;

    clone(): VertexInterface;

    isEqual(v: VertexInterface): boolean;

    isInside(boundingBox: BoundingBox): boolean;

    distance(v: VertexInterface): number;

    rotate(x: number, y: number, z: number): VertexInterface;
    mirror(x: boolean, y: boolean, z: boolean): VertexInterface;
    scale(v: VertexInterface): VertexInterface;
    add(v: VertexInterface): VertexInterface;
    subtract(v: VertexInterface): VertexInterface;
    dot(v: VertexInterface): number;
    cross(v: VertexInterface): VertexInterface;
    length(): number;

    round(digits: number): VertexInterface;
}

export class Vertex implements VertexInterface {
    x = 0;
    y = 0;
    z = 0;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString(): string {
        return 'Vertex ' + this.x + ', ' + this.y + ', ' + this.z;
    }

    clone(): VertexInterface {
        return new Vertex(this.x, this.y, this.z);
    }

    isEqual(v: VertexInterface): boolean {
        if (v.x === this.x && v.y === this.y && v.z === this.z) {
            return true;
        }
        return false;
    }

    isInside(boundingBox: BoundingBox): boolean {
        return boundingBox.isInside(this.x, this.y, this.z);
    }

    distance(v: VertexInterface): number {
        return new Vertex(this.x - v.x, this.y - v.y, this.z - v.z).length();
    }

    rotate(xAngle: number, yAngle: number, zAngle: number): VertexInterface {
        const xCos = Util.cosDegreesRounded(xAngle);
        const xSin = Util.sinDegreesRounded(xAngle);
        const yCos = Util.cosDegreesRounded(yAngle);
        const ySin = Util.sinDegreesRounded(yAngle);
        const zCos = Util.cosDegreesRounded(zAngle);
        const zSin = Util.sinDegreesRounded(zAngle);

        const vertexMatrix = [[this.x], [this.y], [this.z]];

        // Rotate around X axis first
        const xMatrix = [
            [1, 0, 0],
            [0, xCos, -1 * xSin],
            [0, xSin, xCos],
        ];
        const rotatedX: number[][] = Matrix.multiply(xMatrix, vertexMatrix);

        // Then rotate the result around the Y axis
        const yMatrix = [
            [yCos, 0, ySin],
            [0, 1, 0],
            [-1 * ySin, 0, yCos],
        ];
        const rotatedXY: number[][] = Matrix.multiply(yMatrix, rotatedX);

        // Then rotate the result around the Z axis
        const zMatrix = [
            [zCos, -1 * zSin, 0],
            [zSin, zCos, 0],
            [0, 0, 1],
        ];
        const rotatedXYZ: number[][] = Matrix.multiply(zMatrix, rotatedXY);

        return new Vertex(rotatedXYZ[0][0], rotatedXYZ[1][0], rotatedXYZ[2][0]);
    }

    scale(v: VertexInterface): VertexInterface {
        return new Vertex(this.x * v.x, this.y * v.y, this.z * v.z);
    }

    add(v: VertexInterface): VertexInterface {
        return new Vertex(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    subtract(v: VertexInterface): VertexInterface {
        return new Vertex(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    mirror(x: boolean, y: boolean, z: boolean): VertexInterface {
        return new Vertex(
            x ? -1 * this.x : this.x,
            y ? -1 * this.y : this.y,
            z ? -1 * this.z : this.z
        );
    }

    dot(v: VertexInterface): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v: VertexInterface): VertexInterface {
        return new Vertex(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    round(digits: number): VertexInterface {
        return new Vertex(
            Util.round(this.x, digits),
            Util.round(this.y, digits),
            Util.round(this.z, digits)
        );
    }
}
