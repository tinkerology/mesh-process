
import { Mesh, MeshInterface } from '../mesh';
import { MeshInfo, MeshExtents } from '../meshinfo';
import { Triangle } from '../triangle';
import { Vertex } from '../vertex';

test('MeshExtents_extend', () => {
    let extents:MeshExtents = new MeshExtents();
    extents.extend(new Vertex(10,20,30));
    expect(extents.minx).toBe(10);
    expect(extents.miny).toBe(20);
    expect(extents.minz).toBe(30);
    expect(extents.maxx).toBe(10);
    expect(extents.maxy).toBe(20);
    expect(extents.maxz).toBe(30);
});

test('getExtents', () => {
    let mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    expect(MeshInfo.getExtents(mesh).minx).toBe(0);
    expect(MeshInfo.getExtents(mesh).miny).toBe(0);
    expect(MeshInfo.getExtents(mesh).minz).toBe(0);
    expect(MeshInfo.getExtents(mesh).maxx).toBe(10);
    expect(MeshInfo.getExtents(mesh).maxy).toBe(10);
    expect(MeshInfo.getExtents(mesh).maxz).toBe(0);
});


test('getEdges', () => {
    let extents:MeshExtents = new MeshExtents();
    extents.extend(new Vertex(10,20,30));
    expect(extents.minx).toBe(10);
    expect(extents.miny).toBe(20);
    expect(extents.minz).toBe(30);
    expect(extents.maxx).toBe(10);
    expect(extents.maxy).toBe(20);
    expect(extents.maxz).toBe(30);
});

