
import { Edge } from "./edge";
import { MeshInterface } from "./mesh";
import { TriangleInterface } from "./triangle";
import { VertexInterface } from "./vertex";


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
        const extents : MeshExtents = new MeshExtents();
        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            extents.extend(triangle.v1);
            extents.extend(triangle.v2);
            extents.extend(triangle.v3);
        });
        return extents;
    }

    static getVertices(mesh:MeshInterface) : VertexInterface[] {
        const allVertices:VertexInterface[] = [];
        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            allVertices.push(...triangle.getVertices());
        });
        return allVertices;
    }

    static getEdges(mesh:MeshInterface) : Edge[] {
        const allEdges:Edge[] = [];
        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            allEdges.push(...triangle.getEdges());
        });
        return allEdges;
    }

    static getSingleEdges(edges:Edge[]) : Edge[] {
        const singleEdges:Edge[] = [];
        edges.forEach( (edge:Edge) => {
            let count = 0;
            for ( const edgeToCount of edges ) {
                if ( edge.isEqual(edgeToCount) ) {
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
        const connectedEdges:Edge[] = [];
        const disconnectedEdges:Edge[] = [];
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

    static getEdgesConnectedTo(edges:Edge[], edgesToSearch:Edge[]):Edge[] {
        const connectedEdges:Edge[] = [];
        edges.forEach( (edge:Edge) => {
            edgesToSearch.forEach( (edgeToSearch:Edge) => {
                if ( edgeToSearch.isConnected(edge) && !edgeToSearch.isEqual(edge) ) {
                    // TODO: Should I copy this Edge?
                    connectedEdges.push(edge);
                }
            });
        });
        return connectedEdges;
    }

    static getEdgeLengths(edges:Edge[]) : number[] {
        const edgeLengths:number[] = [];
        edges.forEach( (edge:Edge) => {
            edgeLengths.push(edge.length());
        });
        return edgeLengths;
    }

    static getVertexDistances(vertex:VertexInterface, vertexes:VertexInterface[]) : number[] {
        const vertexDistances:number[] = [];
        vertexes.forEach( (toVertex:VertexInterface) => {
            vertexDistances.push(vertex.distance(toVertex));    
        });
        return vertexDistances;
    }

    static logEdgesCounts(edges:Edge[]) {
        edges.forEach( (edge:Edge) => {
            let count = 0;
            edges.forEach( (edgeToCount:Edge) => {
                if ( edge.isEqual(edgeToCount) ) {
                    count++;
                }
            });
            console.log("Edge: ", edge, " Count=", count);
        });
    }
}

