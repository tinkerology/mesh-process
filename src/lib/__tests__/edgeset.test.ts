import { Edge } from '../edge';
import { EdgeSet } from '../edgeset';
import { MeshBuilder } from '../meshbuilder';
import { MeshInfo } from '../meshinfo';
import { Vertex } from '../vertex';
import { VertexInterface } from '../vertex';

test('constructor1', () => {
    const edgeset1 = new EdgeSet([]);
    expect(edgeset1.length()).toBe(0);
});

test('constructor2', () => {
    const edgeset1 = new EdgeSet([
        new Edge(new Vertex(0, 0, 0), new Vertex(10, 10, 10)),
    ]);
    expect(edgeset1.length()).toBe(1);
});

test('constructor2', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 20, 30);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    expect(edgeset1.length()).toBe(18);
});

test('contains', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 20, 30);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    expect(
        edgeset1.contains(new Edge(new Vertex(0, 0, 0), new Vertex(10, 0, 0)))
    ).toBe(true);
    expect(
        edgeset1.contains(new Edge(new Vertex(0, 0, 0), new Vertex(11, 0, 0)))
    ).toBe(false);
});

test('remove', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 20, 30);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    expect(
        edgeset1.remove(new Edge(new Vertex(0, 0, 0), new Vertex(10, 0, 0)))
    ).toBe(true);
    expect(
        edgeset1.remove(new Edge(new Vertex(0, 0, 0), new Vertex(11, 0, 0)))
    ).toBe(false);
});

test('isConnectedTo', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 20, 30);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    expect(
        edgeset1.isConnectedTo(
            new Edge(new Vertex(10, 0, 0), new Vertex(10, 20, 0))
        )
    ).toBe(true);
    expect(
        edgeset1.isConnectedTo(
            new Edge(new Vertex(11, 0, 0), new Vertex(11, 20, 0))
        )
    ).toBe(false);
});

test('merge1', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 20, 30);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    const mesh2 = MeshBuilder.buildCuboid(new Vertex(10, 10, 10), 10, 20, 30);
    const edgeset2 = new EdgeSet(MeshInfo.getEdges(mesh2));
    expect(edgeset1.length()).toBe(18);
    expect(edgeset2.length()).toBe(18);
    const edgeset3 = edgeset1.merge(edgeset2);
    expect(edgeset3.length()).toBe(36);
});

// Test full overlap in merge
test('merge2', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 20, 30);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    const mesh2 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 20, 30);
    const edgeset2 = new EdgeSet(MeshInfo.getEdges(mesh2));
    expect(edgeset1.length()).toBe(18);
    expect(edgeset2.length()).toBe(18);
    const edgeset3 = edgeset1.merge(edgeset2);
    expect(edgeset3.length()).toBe(18);
});

test('remove1', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 20, 30);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    const mesh2 = MeshBuilder.buildCuboid(new Vertex(10, 10, 10), 10, 20, 30);
    const edgeset2 = new EdgeSet(MeshInfo.getEdges(mesh2));
    expect(edgeset1.length()).toBe(18);
    expect(edgeset2.length()).toBe(18);
    const edgeset3 = edgeset1.merge(edgeset2);
    expect(edgeset3.length()).toBe(36);
    const edgeset4 = edgeset1.removeAll(edgeset2);
    expect(edgeset4.length()).toBe(18);
});

// Test none are connected
test('addAllConnected1', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 10, 10);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    const mesh2 = MeshBuilder.buildCuboid(new Vertex(20, 20, 20), 10, 20, 30);
    const edgeset2 = new EdgeSet(MeshInfo.getEdges(mesh2));
    expect(edgeset1.length()).toBe(18);
    expect(edgeset2.length()).toBe(18);
    const edgeset3 = edgeset1.addAllConnected(edgeset2);
    expect(edgeset3.length()).toBe(18);
});

// Test all are connected
test('addAllConnected2', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 10, 10);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    const mesh2 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 10, 10);
    const edgeset2 = new EdgeSet(MeshInfo.getEdges(mesh2));
    expect(edgeset1.length()).toBe(18);
    expect(edgeset2.length()).toBe(18);
    const edgeset3 = edgeset1.addAllConnected(edgeset2);
    expect(edgeset3.length()).toBe(18);
});

// Test some are connected
test('addAllConnected3', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0, 0, 0), 10, 10, 10);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    const mesh2 = MeshBuilder.buildCuboid(new Vertex(10, 10, 10), 10, 10, 10);
    const edgeset2 = new EdgeSet(MeshInfo.getEdges(mesh2));
    expect(edgeset1.length()).toBe(18);
    expect(edgeset2.length()).toBe(18);
    const edgeset3 = edgeset1.addAllConnected(edgeset2);
    // Only 35 since there is one equal edge
    expect(edgeset3.length()).toBe(35);
});

test('sort', () => {
    const v1: VertexInterface = new Vertex(0, 0, 0);
    const v2: VertexInterface = new Vertex(1, 1, 1);
    const v3: VertexInterface = new Vertex(2, 2, 2);
    const v4: VertexInterface = new Vertex(3, 3, 3);
    const v5: VertexInterface = new Vertex(4, 4, 4);
    const e1: Edge = new Edge(v1, v2);
    const e2: Edge = new Edge(v2, v3);
    const e3: Edge = new Edge(v3, v4);
    const e4: Edge = new Edge(v4, v5);
    const e1r: Edge = new Edge(v2, v1);
    const e2r: Edge = new Edge(v3, v2);
    const e3r: Edge = new Edge(v4, v3);
    const e4r: Edge = new Edge(v5, v4);
    // Test already ordered
    {
        const edges1 = new EdgeSet([e1, e2, e3, e4]);
        const sortedEdges1 = edges1.sort();
        expect(sortedEdges1.edges[0].isEqual(e1));
        expect(sortedEdges1.edges[1].isEqual(e2));
        expect(sortedEdges1.edges[2].isEqual(e3));
        expect(sortedEdges1.edges[3].isEqual(e4));
    }
    // Test already ordered reversed
    {
        const edges1 = new EdgeSet([e1, e2r, e3r, e4]);
        const sortedEdges1 = edges1.sort();
        expect(sortedEdges1.edges[0].isEqual(e1));
        expect(sortedEdges1.edges[1].isEqual(e2));
        expect(sortedEdges1.edges[2].isEqual(e3));
        expect(sortedEdges1.edges[3].isEqual(e4));
    }
    // Test already ordered reversed2
    {
        const edges1 = new EdgeSet([e1r, e2r, e3r, e4r]);
        const sortedEdges1 = edges1.sort();
        expect(sortedEdges1.edges[0].isEqual(e1));
        expect(sortedEdges1.edges[1].isEqual(e2));
        expect(sortedEdges1.edges[2].isEqual(e3));
        expect(sortedEdges1.edges[3].isEqual(e4));
    }

    // Test reverse ordered
    {
        const edges1 = new EdgeSet([e4, e3, e2, e1]);
        const sortedEdges1 = edges1.sort();
        expect(sortedEdges1.edges[0].isEqual(e1));
        expect(sortedEdges1.edges[1].isEqual(e2));
        expect(sortedEdges1.edges[2].isEqual(e3));
        expect(sortedEdges1.edges[3].isEqual(e4));
    }

    // Test mixed ordered 1
    {
        const edges1 = new EdgeSet([e3, e1, e2, e4]);
        const sortedEdges1 = edges1.sort();
        expect(sortedEdges1.edges[0].isEqual(e1));
        expect(sortedEdges1.edges[1].isEqual(e2));
        expect(sortedEdges1.edges[2].isEqual(e3));
        expect(sortedEdges1.edges[3].isEqual(e4));
    }

    // Test mixed ordered 2
    {
        const edges1 = new EdgeSet([e3, e2, e1, e4]);
        const sortedEdges1 = edges1.sort();
        expect(sortedEdges1.edges[0].isEqual(e1));
        expect(sortedEdges1.edges[1].isEqual(e2));
        expect(sortedEdges1.edges[2].isEqual(e3));
        expect(sortedEdges1.edges[3].isEqual(e4));
    }
});

test('toVertices1', () => {
    const v1: VertexInterface = new Vertex(0, 0, 0);
    const v2: VertexInterface = new Vertex(1, 1, 1);
    const v3: VertexInterface = new Vertex(2, 2, 2);
    const v4: VertexInterface = new Vertex(3, 3, 3);
    const v5: VertexInterface = new Vertex(4, 4, 4);
    const e1: Edge = new Edge(v1, v2);
    const e2: Edge = new Edge(v2, v3);
    const e3: Edge = new Edge(v3, v4);
    const e4: Edge = new Edge(v4, v5);
    // Test already ordered
    {
        const edges1 = new EdgeSet([e1, e2, e3, e4]);
        const vertices = edges1.toVertices();
        expect(vertices.length).toBe(5);
        expect(vertices.includes(v1)).toBe(true);
        expect(vertices.includes(v2)).toBe(true);
        expect(vertices.includes(v3)).toBe(true);
        expect(vertices.includes(v4)).toBe(true);
        expect(vertices.includes(v5)).toBe(true);
    }
});

// Not same instance of vertices
test('toVertices2', () => {
    const v1: VertexInterface = new Vertex(0, 0, 0);
    const v2: VertexInterface = new Vertex(1, 1, 1);
    const v3: VertexInterface = new Vertex(2, 2, 2);
    const v3a: VertexInterface = new Vertex(2, 2, 2);
    const v4: VertexInterface = new Vertex(3, 3, 3);
    const v5: VertexInterface = new Vertex(4, 4, 4);
    const e1: Edge = new Edge(v1, v2);
    const e2: Edge = new Edge(v2, v3);
    const e3: Edge = new Edge(v3a, v4);
    const e4: Edge = new Edge(v4, v5);
    // Test already ordered
    {
        const edges1 = new EdgeSet([e1, e2, e3, e4]);
        const vertices = edges1.toVertices();
        expect(vertices.length).toBe(5);
        expect(vertices.includes(v1)).toBe(true);
        expect(vertices.includes(v2)).toBe(true);
        expect(vertices.includes(v3)).toBe(true);
        expect(vertices.includes(v4)).toBe(true);
        expect(vertices.includes(v5)).toBe(true);
    }
});
