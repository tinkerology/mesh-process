import { MeshBuilder } from '../meshbuilder';
import { Scene } from '../scene';
import { Vertex } from '../vertex';

test('clear_no_meshes', () => {
    let scene = new Scene();
    scene.clear();
    expect(scene.meshes.length).toBe(0);
});

test('clear_one_mesh', () => {
    let scene = new Scene();
    scene.addMesh(MeshBuilder.buildRectangle(new Vertex(0,0,0),
                                             new Vertex(0,10,0),
                                             new Vertex(10,10,0),
                                             new Vertex(10,0,0),));
    scene.clear();
    expect(scene.meshes.length).toBe(0);
});
