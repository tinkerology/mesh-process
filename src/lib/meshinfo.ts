
import { MeshInterface } from "./mesh";
import { VertexInterface } from "./vertex";
import { TriangleInterface } from "./triangle";
import { Edge } from "./edge";


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

    static getVertices(mesh:MeshInterface) : VertexInterface[] {
        let allVertices:VertexInterface[] = [];
        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            allVertices.push(...triangle.getVertices());
        });
        return allVertices;
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

