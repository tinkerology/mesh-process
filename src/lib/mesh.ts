
import { BoundingBox } from "./boundingbox";
import { VertexInterface } from "./vertex";
import { Vertex } from "./vertex";
import { TriangleInterface } from "./triangle";
import { Triangle } from "./triangle";
import { Edge } from "./edge";

export interface VertexFilterInterface {
    filter(vertex : VertexInterface) : VertexInterface;
}

export class VertexFilterNoOp implements VertexFilterInterface {
    filter(vertex : VertexInterface) : VertexInterface {
        return vertex;
    }
}
export class VertexFilterTranslate implements VertexFilterInterface {
    offset:VertexInterface = new Vertex(0,0,0);

    constructor(offset:VertexInterface) {
        this.offset = offset;
    }

    filter(vertex : VertexInterface) : VertexInterface {
        return vertex.add(this.offset);
    }
    
}
export class VertexFilterAbove implements VertexFilterInterface {
    xThreshold:number = Number.MAX_VALUE;
    yThreshold:number = Number.MAX_VALUE;
    zThreshold:number = Number.MAX_VALUE;
    operation:VertexFilterInterface = new VertexFilterNoOp();

    constructor(xThreshold:number, yThreshold:number, zThreshold:number, operation:VertexFilterInterface) {
        this.xThreshold = xThreshold;
        this.yThreshold = yThreshold;
        this.zThreshold = zThreshold;
        this.operation = operation;
    }

    filter(vertex : VertexInterface) : VertexInterface {
        if ( vertex.x >= this.xThreshold || vertex.y >= this.yThreshold || vertex.z >= this.zThreshold ) {
//            console.log("Filtering vertex: ", vertex);
            return this.operation.filter(vertex);
        }
        return vertex;
    }
}

export class VertexFilterReplace implements VertexFilterInterface {
    v1:VertexInterface = new Vertex(0,0,0);
    v2:VertexInterface = new Vertex(0,0,0);

    constructor(v1:VertexInterface, v2:VertexInterface) {
        this.v1 = v1;
        this.v2 = v2;
    }

    filter(vertex : VertexInterface) : VertexInterface {
        if ( vertex.x == this.v1.x && vertex.y == this.v1.y && vertex.z == this.v1.z ) {
            console.log("Replacing vertex: ", vertex);
            return this.v2;
        }
        return vertex;
    }
}

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


export class MeshExtents {
    minx : number = Number.MAX_SAFE_INTEGER;
    miny : number = Number.MAX_SAFE_INTEGER;
    minz : number = Number.MAX_SAFE_INTEGER;
    maxx : number = Number.MIN_SAFE_INTEGER;
    maxy : number = Number.MIN_SAFE_INTEGER;
    maxz : number = Number.MIN_SAFE_INTEGER;

    extend(v : VertexInterface) {
        if ( v.x < this.minx ) {
            this.minx = v.x;
        }
        if ( v.y < this.miny ) {
            this.miny = v.y;
        }
        if ( v.z < this.minz ) {
            this.minz = v.z;
        }

        // Max
        if ( v.x > this.maxx ) {
            this.maxx = v.x;
        }
        if ( v.y > this.maxy ) {
            this.maxy = v.y;
        }
        if ( v.z > this.maxz ) {
            this.maxz = v.z;
        }
    }
}

export class MeshInfo {
    static getExtents(mesh:MeshInterface) : MeshExtents {
        let extents : MeshExtents = new MeshExtents();
        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            extents.extend(triangle.v1);
            extents.extend(triangle.v2);
            extents.extend(triangle.v3);
        });
        return extents;
    }

    static getEdges(mesh:MeshInterface) : Edge[] {
        let allEdges:Edge[] = [];
        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            allEdges.push(...triangle.getEdges());
        });
        return allEdges;
    }

    static getSingleEdges(edges:Edge[]) : Edge[] {
        let singleEdges:Edge[] = [];
        edges.forEach( (edge:Edge) => {
            let count:number = 0;
            for ( let edgeToCount of edges ) {
                if ( edge.isEqual(edgeToCount ) ) {
                    count++;
                }
                if ( count > 1 ) {
                    break;
                }
            }
            if ( count == 1 ) {
                singleEdges.push(edge);
            }
        });
        return singleEdges;
    }

    static getEdgesAtVertex(edges:Edge[], vertex: VertexInterface) : Edge[][] {
        let connectedEdges:Edge[] = [];
        let disconnectedEdges:Edge[] = [];
        edges.forEach( (edge:Edge) => {
            if ( edge.v1.isEqual(vertex) || edge.v2.isEqual(vertex) ) {
                connectedEdges.push(edge);
            }
            else {
                disconnectedEdges.push(edge);
            }
        });
        return [connectedEdges,disconnectedEdges];
    }

    static getConnectedEdges(edges:Edge[]) : Edge[] {
        let connectedEdges:Edge[] = [];
        let done:boolean = (edges.length == 0);
        while (!done) {
            let v1Connections:Edge[][] = this.getEdgesAtVertex(edges, edges[0].v1);
            connectedEdges = connectedEdges.concat(v1Connections[0]);
            let v2Connections:Edge[][] = this.getEdgesAtVertex(edges, edges[0].v2);
            connectedEdges = connectedEdges.concat(v2Connections[0]);

            if (v1Connections[0].length == 0 && v2Connections[0].length == 0 ) {
                done = true;
            }
        }
        return connectedEdges;
    }

    static getEdgeLengths(edges:Edge[]) : number[] {
        let edgeLengths:number[] = [];
        edges.forEach( (edge:Edge) => {
            edgeLengths.push(edge.length());
        });
        return edgeLengths;
    }

    static getVertexDistances(vertex:VertexInterface, vertexes:VertexInterface[]) : number[] {
        let vertexDistances:number[] = [];
        vertexes.forEach( (toVertex:VertexInterface) => {
            vertexDistances.push(vertex.distance(toVertex));    
        });
        return vertexDistances;
    }

    // static getEdgeChain(edges:Edge[]) : Edge[] {
    //     let edgeChain:Edge[] = [];

    //     // edges.forEach( (edge:Edge) => {
    //     //     if ( )
    //     //     edgeChain.push(edge);
    //     // });

    //     return edgeChain;
    // }

    static logEdgesCounts(edges:Edge[]) {
        edges.forEach( (edge:Edge) => {
            let count:number = 0;
            edges.forEach( (edgeToCount:Edge) => {
                if ( edge.isEqual(edgeToCount) ) {
                    count++;
                }
            });
            console.log("Edge: ", edge, " Count=", count);
        });
    }
}

export class MeshOperations {
    static CROP_INSIDE : number = 0;
    static CROP_OUTSIDE : number = 1;

    static crop(mesh:MeshInterface, boundingBox:BoundingBox) : Scene {
        let insideMesh:MeshInterface = new Mesh();
        let outsideMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            if ( triangle.v1.isInside(boundingBox) &&
                 triangle.v2.isInside(boundingBox) && 
                 triangle.v3.isInside(boundingBox) ) {
                insideMesh.addTriangle(triangle.clone());
            }
            else {
                outsideMesh.addTriangle(triangle.clone());
            }
        });
        let scene = new Scene();
        scene.addMesh(insideMesh);
        scene.addMesh(outsideMesh);
        return scene;
    }

    static mirror(mesh:MeshInterface, x:boolean, y:boolean, z:boolean) : MeshInterface {
        let mirroredMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            mirroredMesh.addTriangle(new Triangle(
                                            triangle.v1.mirror(x,y,z),
                                            triangle.v2.mirror(x,y,z),
                                            triangle.v3.mirror(x,y,z))
            );
        });
        return mirroredMesh;
    }


    static translate(mesh:MeshInterface, offset:VertexInterface) : MeshInterface {
        let translatedMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            translatedMesh.addTriangle(new Triangle(
                                            triangle.v1.add(offset),
                                            triangle.v2.add(offset),
                                            triangle.v3.add(offset))
            );
        });
        return translatedMesh;
    }

    static translateFiltered(mesh:MeshInterface, vertexFilter:VertexFilterInterface) : MeshInterface {
        let translatedMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            translatedMesh.addTriangle(new Triangle(
                                       vertexFilter.filter(triangle.v1),
                                       vertexFilter.filter(triangle.v2),
                                       vertexFilter.filter(triangle.v3) ) );
        });
        return translatedMesh;
    }

    static filterVertices(mesh:MeshInterface, vertexFilter:VertexFilterInterface) : MeshInterface {
        let filteredMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            filteredMesh.addTriangle(new Triangle(
                                       vertexFilter.filter(triangle.v1),
                                       vertexFilter.filter(triangle.v2),
                                       vertexFilter.filter(triangle.v3) ) );
        });
        return filteredMesh;
    }

    static scale(mesh:MeshInterface, scale:VertexInterface) : MeshInterface {
        let scaledMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            scaledMesh.addTriangle(new Triangle(
                                            triangle.v1.scale(scale),
                                            triangle.v2.scale(scale),
                                            triangle.v3.scale(scale))
            );
        });
        return scaledMesh;
    }

    static scaleToSize(mesh:MeshInterface, axisName:string, size:number) {
        let extents:MeshExtents = MeshInfo.getExtents(mesh);

        let xScale:number = 1;
        let yScale:number = 1;
        let zScale:number = 1;
    
        let axis:string = axisName;
        axis = axis.toLowerCase();
        if ( axis === 'x' ) {
          xScale = size / (extents.maxx - extents.minx);
          yScale = xScale;
          zScale = xScale;
        }
        else if ( axis === 'y' ) {
          yScale = size / (extents.maxy - extents.miny);
          xScale = yScale;
          zScale = yScale;
        }
        else if ( axis === 'z' ) {
          zScale = size / (extents.maxz - extents.minz);
          xScale = zScale;
          yScale = zScale;
        }
        let scaledMesh:MeshInterface = MeshOperations.scale(mesh, new Vertex(xScale, yScale, zScale));
        return scaledMesh;
    }

    static flipNormals(mesh:MeshInterface) : MeshInterface {
        let flippedMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            flippedMesh.addTriangle(triangle.flipNormal());
        });
        return flippedMesh;
    }

    static replicate(mesh:MeshInterface,
                     xCount:number,
                     xSpacing:number, ySpacing:number,
                     totalCount:number) : MeshInterface {
        // Copy mesh by making new mesh with duplicate triangles
        let combinedMesh:MeshInterface = new Mesh();
        combinedMesh.addMesh(mesh);

        // Figure out spacing and initial placement
        let extents:MeshExtents = MeshInfo.getExtents(mesh);
        let xOffset = (extents.maxx - extents.minx) + xSpacing;
        let yOffset = 0;
        let xIndex = 1;
        // Subtract off the original copy of the mesh fromt he total
        totalCount--;

        // Keep going until we place all the copies
        while (totalCount > 0) {
            let translatedMesh = MeshOperations.translate(mesh, new Vertex(xOffset, yOffset, 0) );
            combinedMesh.addMesh(translatedMesh);

            // Move along X axis
            xOffset += (extents.maxx - extents.minx) + xSpacing;

            // See if we're at the end of an X axis row
            xIndex++;
            if ( xIndex >= xCount ) {
                xOffset = 0;
                yOffset += (extents.maxy - extents.miny) + ySpacing;
                xIndex = 0;
            }
            totalCount--;
        }
        return combinedMesh;
    }

    static addVerticalTriangles(mesh:MeshInterface, edges:Edge[], z:number) {
        edges.forEach( (edge:Edge) => {
            let v1 = edge.v1;
            let v2 = edge.v2;
            let v3 = new Vertex(v1.x, v1.y, z);
            let v4 = new Vertex(v2.x, v2.y, z);
            let triangle1 = new Triangle(v1,v3,v2);
            mesh.addTriangle(triangle1);
            let triangle2 = new Triangle(v2,v3,v4);
            mesh.addTriangle(triangle2);
        });
    }

    static addBaseAndVerticalTriangles(mesh:MeshInterface, extraZHeight:number) {
        let extents:MeshExtents = MeshInfo.getExtents(mesh);
        let minx = extents.minx;
        let maxx = extents.maxx;
        let miny = extents.miny;
        let maxy = extents.maxy;
        let minz = extents.minz-extraZHeight;

        let singleEdges:Edge[] = MeshInfo.getSingleEdges(MeshInfo.getEdges(mesh));
        MeshOperations.addVerticalTriangles(mesh, singleEdges, minz);

        // Add base
        mesh.addTriangle(new Triangle(new Vertex(minx,miny,minz), new Vertex(maxx,maxy,minz), new Vertex(maxx,miny,minz)));
        mesh.addTriangle(new Triangle(new Vertex(minx,miny,minz), new Vertex(minx,maxy,minz), new Vertex(maxx,maxy,minz)));
    }

    // static closeHoles(mesh:MeshInterface) {

    // }

    static center(mesh:MeshInterface) : MeshInterface {
        let extents:MeshExtents = MeshInfo.getExtents(mesh);
        let xOffset = -1*(extents.maxx-extents.minx)/2;
        let yOffset = -1*(extents.maxy-extents.miny)/2;
        let zOffset = -1*(extents.maxz-extents.minz)/2;
        return this.translate(mesh, new Vertex(xOffset,yOffset,zOffset));
    }
}
