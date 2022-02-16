import { BoundingBox } from '../boundingbox';
import { MeshBuilder } from '../meshbuilder';
import { MeshOperations } from '../meshoperations';
import { Triangle } from '../triangle';
import { Vertex } from '../vertex';

test('removeTriangles', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.removeTriangles(mesh, [
        new Triangle(
            new Vertex(0, 0, 0),
            new Vertex(10, 0, 0),
            new Vertex(10, 10, 0)
        ),
    ]);
    expect(mesh2.triangles.length).toBe(1);
});

test('rotate', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.rotate(mesh, 0, 0, 0);
    expect(mesh2.triangles.length).toBe(2);
    const mesh3 = MeshOperations.rotate(mesh, 0, 0, 45);
    expect(mesh3.triangles.length).toBe(2);
});

test('crop', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const scene1 = MeshOperations.crop(
        mesh,
        new BoundingBox(0, 0, 0, 10, 10, 10)
    );
    expect(scene1.meshes.length).toBe(2);
    expect(scene1.meshes[0].triangles.length).toBe(0);
    expect(scene1.meshes[1].triangles.length).toBe(2);
});

test('mirror', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.mirror(mesh, true, false, false);
    expect(mesh2.triangles.length).toBe(2);
});

test('translate', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.translate(mesh, new Vertex(20, 30, 40));
    expect(mesh2.triangles.length).toBe(2);
});

test('scale', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.scale(mesh, new Vertex(20, 30, 40));
    expect(mesh2.triangles.length).toBe(2);
});

test('scaleToSize', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.scaleToSize(mesh, 'xyz', 40);
    expect(mesh2.triangles.length).toBe(2);
});

test('flipNormals', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.flipNormals(mesh);
    expect(mesh2.triangles.length).toBe(2);
});

test('replicate', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.replicate(mesh, 10, 5, 5, 100);
    expect(mesh2.triangles.length).toBe(2 * 100);
});

test('center', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.center(mesh);
    expect(mesh2.triangles.length).toBe(2);
});
