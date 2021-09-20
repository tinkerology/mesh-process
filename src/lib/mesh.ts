
import { TriangleInterface } from "./triangle";


export interface MeshInterface {
    triangles : TriangleInterface[];

    addTriangle(triangle : TriangleInterface) : MeshInterface;

    addMesh(mesh : MeshInterface) : MeshInterface;
}

export class Mesh implements MeshInterface {
    triangles : TriangleInterface[];

    constructor() {
        this.triangles = [];
    }

    addTriangle(triangle : TriangleInterface) : MeshInterface {
        this.triangles.push(triangle);
        return this;
    }

    addMesh(mesh : MeshInterface) : MeshInterface {
        this.triangles.push(...mesh.triangles);
        return this;
    }
} 

export class Scene {
    meshes:MeshInterface[];

    constructor() {
        this.meshes = [];
    }

    clear() {
        this.meshes = [];
    }

    addMesh(mesh:MeshInterface) {
        this.meshes.push(mesh);
    }
}
