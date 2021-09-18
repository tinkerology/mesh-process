
import { Mesh, MeshInfo } from '../mesh';
import { Triangle } from '../triangle';
import { Vertex } from '../vertex';

test('getExtents_1_triangle', () => {
    let mesh1:Mesh = new Mesh();
    const minX = 0;
    const minY = -1;
    const minZ = -2;
    const maxX = 11;
    const maxY = 12;
    const maxZ = 3;

    mesh1.addTriangle(new Triangle(new Vertex(minX,minY,minZ), new Vertex(10,0,0), new Vertex(maxX,maxY,3)));
    expect(MeshInfo.getExtents(mesh1).minx).toBe(minX);
    expect(MeshInfo.getExtents(mesh1).miny).toBe(minY);
    expect(MeshInfo.getExtents(mesh1).minz).toBe(minZ);
    expect(MeshInfo.getExtents(mesh1).maxx).toBe(maxX);
    expect(MeshInfo.getExtents(mesh1).maxy).toBe(maxY);
    expect(MeshInfo.getExtents(mesh1).maxz).toBe(maxZ);
});

test('getExtents_2_triangles', () => {
    let mesh1:Mesh = new Mesh();
    const minX = 0;
    const minY = -1;
    const minZ = -2;
    const maxX = 11;
    const maxY = 12;
    const maxZ = 3;

    mesh1.addTriangle(new Triangle(new Vertex(minX,minY,minZ), new Vertex(10,0,0), new Vertex(maxX,maxY,3)));
    mesh1.addTriangle(new Triangle(new Vertex(minX+1,minY+1,minZ+1), new Vertex(10,0,0), new Vertex(maxX-1,maxY,3)));
    expect(MeshInfo.getExtents(mesh1).minx).toBe(minX);
    expect(MeshInfo.getExtents(mesh1).miny).toBe(minY);
    expect(MeshInfo.getExtents(mesh1).minz).toBe(minZ);
    expect(MeshInfo.getExtents(mesh1).maxx).toBe(maxX);
    expect(MeshInfo.getExtents(mesh1).maxy).toBe(maxY);
    expect(MeshInfo.getExtents(mesh1).maxz).toBe(maxZ);
});

