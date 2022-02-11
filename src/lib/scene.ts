import { MeshInterface } from './mesh';

export class Scene {
    meshes: MeshInterface[];

    constructor() {
        this.meshes = [];
    }

    clear() {
        this.meshes = [];
    }

    addMesh(mesh: MeshInterface) {
        this.meshes.push(mesh);
    }
}
