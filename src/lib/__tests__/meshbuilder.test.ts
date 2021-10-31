
import { MeshInterface } from '../mesh';
import { MeshBuilder } from '../meshbuilder';
import { STLFile } from '../stlfile';
import { Vertex } from '../vertex';

test('buildConvexFanSurfaceWithEdgeVertices', () => {
    const vertices:Vertex[] = [
        new Vertex(0,0,0),
        new Vertex(10,10,0),
        new Vertex(20,15,0),
        new Vertex(30,20,0),
        new Vertex(40,0,0)
    ];
    const mesh:MeshInterface = MeshBuilder.buildConvexFanSurfaceWithEdgeVertices(vertices);;
    expect(mesh.triangles.length).toBe(4);

    const stlFile:STLFile = new STLFile();
    stlFile.writeSTLFile("__testout__/MeshBuilderTest_buildConvexFanSurfaceWithEdgeVertices.stl", "test", mesh);
});

test('buildRectangle', () => {
    const mesh:MeshInterface = MeshBuilder.buildRectangle(
        new Vertex(0,0,0),
        new Vertex(10,0,0),
        new Vertex(10,20,0),
        new Vertex(0,20,0)
        );;
    expect(mesh.triangles.length).toBe(2);

    const stlFile:STLFile = new STLFile();
    stlFile.writeSTLFile("__testout__/MeshBuilderTest_buildRectangle.stl", "test", mesh);
});

test('buildCuboid', () => {
    const mesh:MeshInterface = MeshBuilder.buildCuboid(new Vertex(1,2,3), 10, 30, 60);;
    expect(mesh.triangles.length).toBe(6*2);

    const stlFile:STLFile = new STLFile();
    stlFile.writeSTLFile("__testout__/MeshBuilderTest_buildCuboid.stl", "test", mesh);
});

test('buildCircle', () => {
    const mesh:MeshInterface = MeshBuilder.buildCircle(100, 30);;
//    expect(mesh.triangles.length).toBe(30);

    const stlFile:STLFile = new STLFile();
    stlFile.writeSTLFile("__testout__/MeshBuilderTest_buildCircle.stl", "test", mesh);
});
