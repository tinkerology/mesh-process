import { Edge } from '../edge';
import { Vertex, VertexInterface } from '../vertex';

test('isEqual', () => {
    const v1: VertexInterface = new Vertex(0, 0, 0);
    const v2: VertexInterface = new Vertex(0, 0, 0);
    const v3: VertexInterface = new Vertex(10, 20, 30);
    const e1: Edge = new Edge(v1, v3);
    const e2: Edge = new Edge(v2, v3);
    const e3: Edge = new Edge(v3, v1);
    const e4: Edge = new Edge(v3, v2);

    // Make sure all the reciprocal cases work
    expect(e1.isEqual(e1)).toBe(true);
    expect(e1.isEqual(e2)).toBe(true);
    expect(e1.isEqual(e3)).toBe(true);
    expect(e1.isEqual(e4)).toBe(true);
    expect(e2.isEqual(e1)).toBe(true);
    expect(e2.isEqual(e3)).toBe(true);
    expect(e2.isEqual(e4)).toBe(true);

    const v4: VertexInterface = new Vertex(15, 30, 45);
    const e5: Edge = new Edge(v3, v4);
    const e6: Edge = new Edge(v4, v3);
    const e7: Edge = new Edge(v4, v3);

    // Test non-equal cases
    expect(e1.isEqual(e5)).toBe(false);
    expect(e3.isEqual(e6)).toBe(false);
    expect(e3.isEqual(e7)).toBe(false);
});

test('isConnected', () => {
    const v1: VertexInterface = new Vertex(0, 0, 0);
    const v2: VertexInterface = new Vertex(0, 0, 0);
    const v3: VertexInterface = new Vertex(10, 20, 30);
    const v4: VertexInterface = new Vertex(15, 30, 45);
    const v5: VertexInterface = new Vertex(1, 1, 1);
    const e1: Edge = new Edge(v1, v3);
    const e2: Edge = new Edge(v2, v3);
    const e3: Edge = new Edge(v3, v1);
    const e4: Edge = new Edge(v3, v4);
    const e5: Edge = new Edge(v4, v5);

    // Same edge in reverse
    expect(e1.isConnected(e3)).toBe(false);

    expect(e1.isConnected(e4)).toBe(true);
    console.log('e2 ', e2);
    console.log('e3 ', e3);
    // Same edge = false
    expect(e2.isConnected(e3)).toBe(false);
    expect(e2.isConnected(e4)).toBe(true);
    expect(e2.isConnected(e4)).toBe(true);
    expect(e1.isConnected(e5)).toBe(false);
});

test('length', () => {
    const v1: VertexInterface = new Vertex(0, 0, 0);
    const v2: VertexInterface = new Vertex(10, 0, 0);
    const v3: VertexInterface = new Vertex(10, 20, 30);
    const v4: VertexInterface = new Vertex(10, 10, 10);
    const e1: Edge = new Edge(v1, v2);
    const e2: Edge = new Edge(v2, v3);
    const e3: Edge = new Edge(v1, v1);
    const e4: Edge = new Edge(v1, v4);

    expect(e1.length()).toBe(10);
    expect(e2.length()).toBe(Math.sqrt(20 * 20 + 30 * 30));
    expect(e3.length()).toBe(0);
    expect(e4.length()).toBe(Math.sqrt(10 * 10 + 10 * 10 + 10 * 10));
});

test('orderEdges', () => {
    const v1: VertexInterface = new Vertex(0, 0, 0);
    const v2: VertexInterface = new Vertex(10, 0, 0);
    const v3: VertexInterface = new Vertex(10, 20, 30);
    const v4: VertexInterface = new Vertex(15, 20, 30);
    const e1: Edge = new Edge(v1, v2);
    const e2: Edge = new Edge(v2, v3);
    const e3: Edge = new Edge(v2, v1);
    const e4: Edge = new Edge(v3, v2);
    const e5: Edge = new Edge(v4, v1);
    const e6: Edge = new Edge(v3, v4);

    expect(Edge.orderEdges(e1, e2)).toStrictEqual([e1, e2]);
    expect(Edge.orderEdges(e2, e1)).toStrictEqual([e1, e2]);
    expect(Edge.orderEdges(e2, e3)).toStrictEqual([new Edge(v3, v2), e3]);
    expect(Edge.orderEdges(e3, e2)).toStrictEqual([new Edge(v1, v2), e2]);
    // v2/v1 -> v3/v2
    expect(Edge.orderEdges(e3, e4)).toStrictEqual([e4, e3]);
    expect(Edge.orderEdges(e4, e3)).toStrictEqual([e4, e3]);

    // if (e2.v2.isEqual(e1.v1))
    expect(Edge.orderEdges(e1, e5)).toStrictEqual([e5, e1]);

    // if (e1.v2.isEqual(e2.v2))
    expect(Edge.orderEdges(e1, e4)).toStrictEqual([e1, new Edge(e4.v2, e4.v1)]);

    // No matching vertices
    expect(Edge.orderEdges(e1, e6)).toStrictEqual([]);
});

test('findMatchingEdges', () => {
    const v1: VertexInterface = new Vertex(0, 0, 0);
    const v2: VertexInterface = new Vertex(10, 0, 0);
    const v3: VertexInterface = new Vertex(10, 20, 30);
    const e1: Edge = new Edge(v1, v2);
    const e2: Edge = new Edge(v2, v3);
    const e3: Edge = new Edge(v1, v3);

    expect(Edge.findMatchingEdges([e1, e2], [e2, e3])).toStrictEqual([e2]);
    expect(Edge.findMatchingEdges([e1, e2], [e3])).toStrictEqual([]);
});

test('hasMatchingEdges', () => {
    const v1: VertexInterface = new Vertex(0, 0, 0);
    const v2: VertexInterface = new Vertex(10, 0, 0);
    const v3: VertexInterface = new Vertex(10, 20, 30);
    const e1: Edge = new Edge(v1, v2);
    const e2: Edge = new Edge(v2, v3);
    const e3: Edge = new Edge(v1, v3);

    expect(Edge.hasMatchingEdges([e1, e2], [e2, e3])).toBe(true);
    expect(Edge.hasMatchingEdges([e1, e2], [e3])).toBe(false);
});
