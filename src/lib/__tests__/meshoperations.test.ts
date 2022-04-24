import { BoundingBox } from '../boundingbox';
import { MeshBuilder } from '../meshbuilder';
import { MeshInfo } from '../meshinfo';
import { MeshOperations } from '../meshoperations';
import { Triangle } from '../triangle';
import { Vertex } from '../vertex';
import { VertexFilterNoOp, VertexFilterTransform } from '../vertexfilter';

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

test('crop2', () => {
    const mesh = MeshBuilder.buildCuboid(
        new Vertex(0, 0, 0), 10, 10, 10
    );
    expect(mesh.triangles.length).toBe(12);
    const scene1 = MeshOperations.crop(
        mesh,
        new BoundingBox(0, 0, 0, 10, 10, 10)
    );
    expect(scene1.meshes.length).toBe(2);
    expect(scene1.meshes[MeshOperations.CROP_INSIDE].triangles.length).toBe(0);
    expect(scene1.meshes[MeshOperations.CROP_OUTSIDE].triangles.length).toBe(12);

    const scene2 = MeshOperations.crop(
        mesh,
        new BoundingBox(-1, -1, -1, 5, 11, 11)
    );
    expect(scene2.meshes.length).toBe(2);
    expect(scene2.meshes[MeshOperations.CROP_INSIDE].triangles.length).toBe(2);
    expect(scene2.meshes[MeshOperations.CROP_OUTSIDE].triangles.length).toBe(10);
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

test('transform', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.transform(mesh, new VertexFilterTransform("x", "y", "z", {}));
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
    const mesh2 = MeshOperations.scaleToSize(mesh, 'x', 40);
    expect(mesh2.triangles.length).toBe(2);
    const mesh3 = MeshOperations.scaleToSize(mesh, 'y', 40);
    expect(mesh3.triangles.length).toBe(2);
    const mesh4 = MeshOperations.scaleToSize(mesh, 'z', 40);
    expect(mesh4.triangles.length).toBe(2);
});

test('addVerticalTriangles', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    MeshOperations.addVerticalTriangles(mesh, MeshInfo.getSingleEdges(MeshInfo.getEdges(mesh)), 20);
    expect(mesh.triangles.length).toBe(2+8);
});

test('addBaseAndVerticalTriangles', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    MeshOperations.addBaseAndVerticalTriangles(mesh, 20);
    expect(mesh.triangles.length).toBe(2+8+2);
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

test('translateFiltered', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.translateFiltered(mesh, new VertexFilterNoOp());
    expect(mesh2.triangles.length).toBe(2);
});

test('filterVertices', () => {
    const mesh = MeshBuilder.buildRectangle(
        new Vertex(0, 0, 0),
        new Vertex(10, 0, 0),
        new Vertex(10, 10, 0),
        new Vertex(0, 10, 0)
    );
    expect(mesh.triangles.length).toBe(2);
    const mesh2 = MeshOperations.filterVertices(mesh, new VertexFilterNoOp());
    expect(mesh2.triangles.length).toBe(2);
});
