
import { MeshInterface } from "./mesh";
import { Triangle } from "./triangle";
import { VertexInterface } from "./vertex";

export class MeshBuilder {

    static buildRectangle(mesh:MeshInterface, v1:VertexInterface, v2:VertexInterface,
                          v3:VertexInterface, v4:VertexInterface) {
        let triangle1 = new Triangle(v1,v3,v2);
        mesh.addTriangle(triangle1);
        let triangle2 = new Triangle(v2,v3,v4);
        mesh.addTriangle(triangle2);
    }
    
}