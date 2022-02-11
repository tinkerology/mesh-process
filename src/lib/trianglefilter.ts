import { TriangleInterface } from './triangle';

export interface TriangleFilterInterface {
    filter(vertex: TriangleInterface): TriangleInterface;
}

export class TriangleFilterNoOp implements TriangleFilterInterface {
    filter(triangle: TriangleInterface): TriangleInterface {
        return triangle;
    }
}
