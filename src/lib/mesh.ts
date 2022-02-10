
import { TriangleInterface } from "./triangle";


export interface MeshInterface {
    triangles : TriangleInterface[];

    addTriangle(triangle : TriangleInterface) : MeshInterface;

    addMesh(mesh : MeshInterface) : MeshInterface;

    clone() : MeshInterface;
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

    clone() : MeshInterface {
        const cloneMesh = new Mesh();

        this.triangles.forEach( triangle => {
            cloneMesh.addTriangle(triangle.clone() );
        });

        return cloneMesh;
    }
} 
