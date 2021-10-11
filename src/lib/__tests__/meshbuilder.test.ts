
import { MeshInterface } from '../mesh';
import { MeshBuilder } from '../meshbuilder';
import { STLFile } from '../stlfile';
import { Vertex } from '../vertex';

test('buildConvexFanSurfaceWithEdgeVertices', () => {
    let vertices:Vertex[] = [
        new Vertex(0,0,0),
        new Vertex(10,10,0),
        new Vertex(20,15,0),
        new Vertex(30,20,0),
        new Vertex(40,0,0)
    ];
    let mesh:MeshInterface = MeshBuilder.buildConvexFanSurfaceWithEdgeVertices(vertices);;
    expect(mesh.triangles.length).toBe(4);

    let stlFile:STLFile = new STLFile();
    stlFile.writeSTLFile("__testout__/MeshBuilderTest_buildConvexFanSurfaceWithEdgeVertices.stl", "test", mesh);
});

test('buildRectangle', () => {
    let mesh:MeshInterface = MeshBuilder.buildRectangle(
        new Vertex(0,0,0),
        new Vertex(10,0,0),
        new Vertex(10,20,0),
        new Vertex(0,20,0)
        );;
    expect(mesh.triangles.length).toBe(2);

    let stlFile:STLFile = new STLFile();
    stlFile.writeSTLFile("__testout__/MeshBuilderTest_buildRectangle.stl", "test", mesh);
});

test('buildCuboid', () => {
    let mesh:MeshInterface = MeshBuilder.buildCuboid(new Vertex(1,2,3), 10, 30, 60);;
    expect(mesh.triangles.length).toBe(6*2);

    let stlFile:STLFile = new STLFile();
    stlFile.writeSTLFile("__testout__/MeshBuilderTest_buildCuboid.stl", "test", mesh);
});

test('buildCircle', () => {
    let mesh:MeshInterface = MeshBuilder.buildCircle(100, 30);;
//    expect(mesh.triangles.length).toBe(30);

    let stlFile:STLFile = new STLFile();
    stlFile.writeSTLFile("__testout__/MeshBuilderTest_buildCircle.stl", "test", mesh);
});
