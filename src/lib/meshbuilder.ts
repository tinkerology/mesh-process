
import { Mesh } from "./mesh";
import { MeshInterface } from "./mesh";
import { Triangle } from "./triangle";
import { Vertex, VertexInterface } from "./vertex";

export class MeshBuilder {

    static buildConvexFanSurfaceWithEdgeVertices(vertices:VertexInterface[]) : MeshInterface {
        let mesh:MeshInterface = new Mesh();
        if ( vertices.length > 2 ) {
            for ( let i=0; i < vertices.length-2; i++ ) {
                let triangle = new Triangle(vertices[0],vertices[i+2],vertices[i+1]);
                mesh.addTriangle(triangle);
            }
            let triangle = new Triangle(vertices[0],vertices[vertices.length-1],vertices[vertices.length-2]);
            mesh.addTriangle(triangle);
        }
        return mesh;
    }

    static buildCircle(radius:number, facets:number) : MeshInterface {
        const mesh:MeshInterface = new Mesh();
        const center:VertexInterface = new Vertex(0,0,0);

        // Math.sin/cos are in radians
        const angle = (2*Math.PI)/facets;

        for ( let i=0; i < facets; i++ ) {
            let edgeV1:VertexInterface = new Vertex(Math.cos(i*angle)*radius, Math.sin(i*angle)*radius, 0);
            let edgeV2:VertexInterface = new Vertex(Math.cos((i+1)*angle)*radius, Math.sin((i+1)*angle)*radius, 0);
            let triangle = new Triangle(center,edgeV1,edgeV2);
            mesh.addTriangle(triangle);
        }
        return mesh;
    }

    static buildRectangle(v1:VertexInterface, v2:VertexInterface,
                          v3:VertexInterface, v4:VertexInterface) : MeshInterface {
        let mesh:MeshInterface = new Mesh();
        let triangle1 = new Triangle(v1,v2,v3);
        mesh.addTriangle(triangle1);
        let triangle2 = new Triangle(v1,v3,v4);
        mesh.addTriangle(triangle2);
        return mesh;
    }

    static buildCuboid(vertex:VertexInterface, xSize:number, ySize:number, zSize:number) : MeshInterface {
        let mesh:MeshInterface = new Mesh();
        // Bottom
        mesh.addMesh(MeshBuilder.buildRectangle(vertex,
                                    new Vertex(vertex.x,vertex.y+ySize,vertex.z),
                                    new Vertex(vertex.x+xSize,vertex.y+ySize,vertex.z),
                                    new Vertex(vertex.x+xSize,vertex.y,vertex.z)
                                    ));
        // Top
        mesh.addMesh(MeshBuilder.buildRectangle(new Vertex(vertex.x,vertex.y,vertex.z+zSize),
                                    new Vertex(vertex.x+xSize,vertex.y,vertex.z+zSize),
                                    new Vertex(vertex.x+xSize,vertex.y+ySize,vertex.z+zSize),
                                    new Vertex(vertex.x,vertex.y+ySize,vertex.z+zSize)));
        // Left
        mesh.addMesh(MeshBuilder.buildRectangle(vertex,
                                    new Vertex(vertex.x,vertex.y,vertex.z+zSize),
                                    new Vertex(vertex.x,vertex.y+ySize,vertex.z+zSize),
                                    new Vertex(vertex.x,vertex.y+ySize,vertex.z)));
        // Rightx
        mesh.addMesh(MeshBuilder.buildRectangle(new Vertex(vertex.x+xSize,vertex.y,vertex.z),
                                    new Vertex(vertex.x+xSize,vertex.y+ySize,vertex.z),
                                    new Vertex(vertex.x+xSize,vertex.y+ySize,vertex.z+zSize),
                                    new Vertex(vertex.x+xSize,vertex.y,vertex.z+zSize)
                                    ));
        // Front
        mesh.addMesh(MeshBuilder.buildRectangle(vertex,
                                    new Vertex(vertex.x+xSize,vertex.y,vertex.z),
                                    new Vertex(vertex.x+xSize,vertex.y,vertex.z+zSize),
                                    new Vertex(vertex.x,vertex.y,vertex.z+zSize)));
        // Back
        mesh.addMesh(MeshBuilder.buildRectangle(new Vertex(vertex.x+xSize,vertex.y+ySize,vertex.z),
                                    new Vertex(vertex.x,vertex.y+ySize,vertex.z),
                                    new Vertex(vertex.x,vertex.y+ySize,vertex.z+zSize),
                                    new Vertex(vertex.x+xSize,vertex.y+ySize,vertex.z+zSize)));

        return mesh;
    }

}
