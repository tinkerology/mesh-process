
import { Edge } from '../edge';
import { Mesh, MeshInterface } from '../mesh';
import { MeshExtents, MeshInfo } from '../meshinfo';
import { Triangle } from '../triangle';
import { Vertex, VertexInterface } from '../vertex';

test('MeshExtents_extend', () => {
    const extents:MeshExtents = new MeshExtents();
    extents.extend(new Vertex(10,20,30));
    expect(extents.minx).toBe(10);
    expect(extents.miny).toBe(20);
    expect(extents.minz).toBe(30);
    expect(extents.maxx).toBe(10);
    expect(extents.maxy).toBe(20);
    expect(extents.maxz).toBe(30);
});

test('getExtents', () => {
    const mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    expect(MeshInfo.getExtents(mesh).minx).toBe(0);
    expect(MeshInfo.getExtents(mesh).miny).toBe(0);
    expect(MeshInfo.getExtents(mesh).minz).toBe(0);
    expect(MeshInfo.getExtents(mesh).maxx).toBe(10);
    expect(MeshInfo.getExtents(mesh).maxy).toBe(10);
    expect(MeshInfo.getExtents(mesh).maxz).toBe(0);
});

test('getEdges', () => {
    const mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    const edges:Edge[] = MeshInfo.getEdges(mesh);
    expect(edges.length).toBe(6);
});

test('getSingleEdges', () => {
    const mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    const edges:Edge[] = MeshInfo.getEdges(mesh);
    const singleEdges:Edge[] = MeshInfo.getSingleEdges(edges);
    expect(singleEdges.length).toBe(4);
});

test('getEdgesAtVertex', () => {
    const mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    const edges:Edge[] = MeshInfo.getEdges(mesh);
    expect(edges.length).toBe(6);

    // Test for partial match
    const edgesAtVertex1 = MeshInfo.getEdgesAtVertex(edges, new Vertex(0,0,0));
    expect(edgesAtVertex1.length).toBe(2);
    const connectedEdges:Edge[] = edgesAtVertex1[0];
    expect(connectedEdges.length).toBe(4);
    const disconnectedEdges:Edge[] = edgesAtVertex1[1];
    expect(disconnectedEdges.length).toBe(2);

    // Test for no matches
    const edgesAtVertex2 = MeshInfo.getEdgesAtVertex(edges, new Vertex(100,100,100));
    expect(edgesAtVertex2.length).toBe(2);
    expect(edgesAtVertex2[0].length).toBe(0);
    expect(edgesAtVertex2[1].length).toBe(6);
});

test('getEdgesConnectedTo', () => {
    const mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    mesh.addTriangle(new Triangle(new Vertex(100,100,100), new Vertex(110,100,100), new Vertex(100,110,110)));
    const edges:Edge[] = MeshInfo.getEdges(mesh);
    expect(edges.length).toBe(9);
    const connectedEdges1 = MeshInfo.getEdgesConnectedTo([new Edge(new Vertex(0,0,0), new Vertex(10,0,0))], edges);
    expect(connectedEdges1.length).toBe(4);
    const connectedEdges2 = MeshInfo.getEdgesConnectedTo([new Edge(new Vertex(100,100,100), new Vertex(11,0,0))], edges);
    expect(connectedEdges2.length).toBe(2);
});

test('getEdgeLengths', () => {
    const mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    const edges:Edge[] = MeshInfo.getEdges(mesh);
    const lengths:number[] = MeshInfo.getEdgeLengths(edges);
    expect(lengths.length).toBe(6);
    expect(lengths[0]).toBe(10);
});

// test('getConnectedEdges', () => {
//     let mesh:MeshInterface = new Mesh();
//     mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
//     mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
//     let edges:Edge[] = MeshInfo.getEdges(mesh);
//     let connectedEdges:Edge[] = MeshInfo.getConnectedEdges(edges);
//     expect(connectedEdges.length).toBe(6);
// });

test('getVertices', () => {
    const mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    const vertices:VertexInterface[] = MeshInfo.getVertices(mesh);
    expect(vertices.length).toBe(6);
});

test('getVertexDistances', () => {
    const mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    const vertices:VertexInterface[] = MeshInfo.getVertices(mesh);
    const distances:number[] = MeshInfo.getVertexDistances(new Vertex(0,0,0), vertices);
    expect(distances.length).toBe(6);
});

test('logEdgeCounts', () => {
    const mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    MeshInfo.logEdgesCounts(MeshInfo.getEdges(mesh));
});
