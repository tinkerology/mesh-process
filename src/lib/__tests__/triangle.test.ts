
import { Edge } from '../edge';
import { Triangle, TriangleInterface } from '../triangle';
import { Vertex, VertexInterface } from '../vertex';

test('constructor', () => {
    const v1:VertexInterface = new Vertex(1,2,3);
    const v2:VertexInterface = new Vertex(10,20,30);
    const v3:VertexInterface = new Vertex(10,0,30);
    const t1:TriangleInterface = new Triangle(v1,v2,v3);

    expect(t1.v1).toStrictEqual(new Vertex(1,2,3));
    expect(t1.v2).toStrictEqual(new Vertex(10,20,30));
    expect(t1.v3).toStrictEqual(new Vertex(10,0,30));
});

test('clone', () => {
    const v1:VertexInterface = new Vertex(1,2,3);
    const v2:VertexInterface = new Vertex(10,20,30);
    const v3:VertexInterface = new Vertex(10,0,30);

    const t1:TriangleInterface = new Triangle(v1,v2,v3);
    const t2:TriangleInterface = new Triangle(v2,v3,v1);
    const t3:TriangleInterface = new Triangle(v3,v1,v2);

    expect(t1.clone().v1).toStrictEqual(new Vertex(1,2,3));
    expect(t2.clone().v2).toStrictEqual(new Vertex(10,0,30));
    expect(t3.clone().v3).toStrictEqual(new Vertex(10,20,30));
});

test('isEqual', () => {
    const v1:VertexInterface = new Vertex(1,2,3);
    const v2:VertexInterface = new Vertex(10,20,30);
    const v3:VertexInterface = new Vertex(10,0,30);
    const v4:VertexInterface = new Vertex(-10,0,-30);

    const t1:TriangleInterface = new Triangle(v1,v2,v3);
    const t2:TriangleInterface = new Triangle(v2,v3,v1);
    const t3:TriangleInterface = new Triangle(v3,v1,v2);
    const t4:TriangleInterface = new Triangle(v4,v1,v2);

    expect(t1.isEqual(t2)).toBe(true);
    expect(t2.isEqual(t1)).toBe(true);
    expect(t1.isEqual(t3)).toBe(true);
    expect(t3.isEqual(t1)).toBe(true);
    expect(t2.isEqual(t3)).toBe(true);
    expect(t3.isEqual(t2)).toBe(true);

    expect(t1.isEqual(t4)).toBe(false);
    expect(t2.isEqual(t4)).toBe(false);
    expect(t3.isEqual(t4)).toBe(false);
    expect(t4.isEqual(t1)).toBe(false);
    expect(t4.isEqual(t2)).toBe(false);
    expect(t4.isEqual(t3)).toBe(false);
});

test('isAdjacent', () => {
    const v1:VertexInterface = new Vertex(1,2,3);
    const v2:VertexInterface = new Vertex(10,20,30);
    const v3:VertexInterface = new Vertex(10,0,30);
    const v4:VertexInterface = new Vertex(-10,0,-30);
    const v5:VertexInterface = new Vertex(0,0,0);
    const v6:VertexInterface = new Vertex(20,20,0);

    const t1:TriangleInterface = new Triangle(v1,v2,v3);
    const t2:TriangleInterface = new Triangle(v2,v3,v4);
    const t3:TriangleInterface = new Triangle(v3,v4,v5);
    const t4:TriangleInterface = new Triangle(v5,v6,v1);
    const t5:TriangleInterface = new Triangle(v6,v1,v2);

    expect(t1.isAdjacent(t2)).toBe(true);
    expect(t1.isAdjacent(t3)).toBe(false);
    expect(t1.isAdjacent(t4)).toBe(false);
    expect(t1.isAdjacent(t5)).toBe(true);

    expect(t2.isAdjacent(t1)).toBe(true);
    expect(t2.isAdjacent(t3)).toBe(true);
    expect(t2.isAdjacent(t4)).toBe(false);
    expect(t2.isAdjacent(t5)).toBe(false);
});

test('calculateNormal', () => {
    const v1:VertexInterface = new Vertex(0,0,0);
    const v2:VertexInterface = new Vertex(0,20,0);
    const v3:VertexInterface = new Vertex(20,0,0);

    const t1:TriangleInterface = new Triangle(v1,v2,v3);

    expect(t1.calculateNormal()).toStrictEqual(new Vertex(0,0,-400));
});

test('flipNormal', () => {
    const v1:VertexInterface = new Vertex(0,0,0);
    const v2:VertexInterface = new Vertex(0,20,0);
    const v3:VertexInterface = new Vertex(20,0,0);

    const t1:TriangleInterface = new Triangle(v1,v2,v3);

    expect(t1.flipNormal()).toStrictEqual(new Triangle(v3,v2,v1));
    expect(t1.flipNormal().calculateNormal()).toStrictEqual(new Vertex(0,0,400));
});

test('getEdges', () => {
    const v1:VertexInterface = new Vertex(0,0,0);
    const v2:VertexInterface = new Vertex(0,20,0);
    const v3:VertexInterface = new Vertex(20,0,0);

    const t1:TriangleInterface = new Triangle(v1,v2,v3);

    expect(t1.getEdges().length).toBe(3);
    expect(t1.getEdges()[0]).toStrictEqual(new Edge(v1,v2));
    expect(t1.getEdges()[1]).toStrictEqual(new Edge(v2,v3));
    expect(t1.getEdges()[2]).toStrictEqual(new Edge(v3,v1));
});

test('toString', () => {
    const v1:VertexInterface = new Vertex(0,0,0);
    const v2:VertexInterface = new Vertex(0,20,0);
    const v3:VertexInterface = new Vertex(20,0,0);

    const t1:TriangleInterface = new Triangle(v1,v2,v3);

    expect(t1.toString()).toBe("Triangle Vertex 0, 0, 0, Vertex 0, 20, 0, Vertex 20, 0, 0");
});

test('getCenterCentroid', () => {
    const v1:VertexInterface = new Vertex(0,0,0);
    const v2:VertexInterface = new Vertex(0,20,0);
    const v3:VertexInterface = new Vertex(20,0,0);

    const t1:TriangleInterface = new Triangle(v1,v2,v3);

    const centroid = t1.getCenterCentroid();
    expect(centroid.x).toBe(20/3);
    expect(centroid.y).toBe(20/3);
    expect(centroid.z).toBe(0);
});

