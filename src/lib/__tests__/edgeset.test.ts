
import { Edge } from '../edge';
import { EdgeSet } from '../edgeset';
import { MeshBuilder } from '../meshbuilder';
import { MeshInfo } from '../meshinfo';
import { Vertex } from '../vertex';

test('constructor1', () => {
    const edgeset1 = new EdgeSet([]);
    expect(edgeset1.length()).toBe(0);
});

test('constructor2', () => {
    const edgeset1 = new EdgeSet([ new Edge(new Vertex(0,0,0), new Vertex(10,10,10))]);
    expect(edgeset1.length()).toBe(1);
});

test('constructor2', () => {
    const mesh1 = MeshBuilder.buildCuboid(new Vertex(0,0,0), 10, 20, 30);
    const edgeset1 = new EdgeSet(MeshInfo.getEdges(mesh1));
    expect(edgeset1.length()).toBe(18);
});
