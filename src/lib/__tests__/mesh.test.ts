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

// import { Vertex } from "./vertex";

// // Test Vertex.distance
// let v1 = new Vertex(0,0,0);
// let v2 = new Vertex(1,0,0);
// let v3 = new Vertex(1,1,1);
// console.log("d1=", v1.distance(v2));
// console.log("d2=", v1.distance(v3));


// let stlFile : STLFile = new STLFile();
// let mesh:MeshInterface = stlFile.readSTLFile("mesh_crop_rot.stl");
// console.log("Triangle Count=", mesh.triangles.length);
// console.log("Mesh extents: ", MeshInfo.getExtents(mesh));
// let boundingBox = new BoundingBox();
// boundingBox.minx = 120;
// boundingBox.miny = 140;
// let croppedMesh:MeshInterface = MeshOperations.crop(mesh, boundingBox).meshes[MeshOperations.CROP_INSIDE];
// //croppedMesh = MeshOperations.translate(croppedMesh, new Vertex(0,0,-5));
// // croppedMesh = MeshOperations.scale(croppedMesh, new Vertex(1,1,2));
// // croppedMesh = MeshOperations.flipNormals(croppedMesh);
// // MeshOperations.addBaseAndVerticalTriangles(croppedMesh, 3);
// stlFile.writeSTLFile("cropped.stl", "Door", croppedMesh);
// console.log("Triangle Count=", mesh.triangles.length);
// console.log("Mesh extents: ", MeshInfo.getExtents(mesh));


// console.log("Done");
// // let miniMesh = new Mesh();
// // miniMesh.addTriangle(new Triangle(new Vertex(120,140,0), new Vertex(160,180,0), new Vertex(160,140,0)));
// // miniMesh.addTriangle(new Triangle(new Vertex(120,140,0), new Vertex(120,180,0), new Vertex(160,180,0)));
// // console.log(MeshInfo.getEdges(miniMesh));
// // console.log("===================");
// // MeshInfo.logEdgesCounts(MeshInfo.getEdges(miniMesh));
// // console.log(MeshInfo.getSingleEdges(MeshInfo.getEdges(miniMesh)));
