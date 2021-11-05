
import { MeshInterface } from '../mesh';
import { MeshLoader } from '../meshloader';

test('loadMesh_binary', () => {
    const mesh:MeshInterface = MeshLoader.loadMesh("samples/cube.stl");
    expect(mesh.triangles.length).toBeGreaterThan(0);
});

test('loadMesh_text', () => {
    const mesh:MeshInterface = MeshLoader.loadMesh("samples/cube_c.stl");
    expect(mesh.triangles.length).toBeGreaterThan(0);
});
