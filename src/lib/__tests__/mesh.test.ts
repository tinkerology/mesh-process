
import { Mesh, MeshInterface } from '../mesh';
import { MeshInfo } from '../meshinfo';
import { Triangle } from '../triangle';
import { Vertex } from '../vertex';

test('contructor', () => {
    let mesh:MeshInterface = new Mesh();
    expect(mesh.triangles.length).toBe(0);
});

test('addTriangle', () => {
    let mesh:MeshInterface = new Mesh();
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    expect(mesh.triangles.length).toBe(1);
    mesh.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    expect(mesh.triangles.length).toBe(2);
});

test('addMesh', () => {
    let mesh1:MeshInterface = new Mesh();
    let mesh2:MeshInterface = new Mesh();
    mesh1.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,0)));
    mesh1.addMesh(mesh2);
    expect(mesh1.triangles.length).toBe(1);

    mesh2.addTriangle(new Triangle(new Vertex(0,0,0), new Vertex(10,0,0), new Vertex(0,10,10)));
    mesh1.addMesh(mesh2);
    expect(mesh1.triangles.length).toBe(2);
});

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

