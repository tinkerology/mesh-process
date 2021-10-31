import { VertexInterface } from "./vertex";

export class Edge {
    v1 : VertexInterface;
    v2 : VertexInterface;

    constructor(v1:VertexInterface,v2:VertexInterface) {
        this.v1 = v1;
        this.v2 = v2;
    }

    isEqual(e:Edge) : boolean {
        if ( (this.v1.isEqual(e.v1) && this.v2.isEqual(e.v2)) ||
             (this.v1.isEqual(e.v2) && this.v2.isEqual(e.v1)) ) {
            return true;
        }
        return false;
    }

    isConnected(e:Edge) : boolean {
        if ( (this.v1.isEqual(e.v1) || this.v2.isEqual(e.v2)) ||
             (this.v1.isEqual(e.v2) || this.v2.isEqual(e.v1)) ) {
            return true;
        }
        return false;
    }

    length() : number {
        return Math.sqrt((this.v1.x-this.v2.x)*(this.v1.x-this.v2.x)+
                         (this.v1.y-this.v2.y)*(this.v1.y-this.v2.y)+
                         (this.v1.z-this.v2.z)*(this.v1.z-this.v2.z));
    }

    static orderEdges(e1:Edge, e2:Edge) : Edge[] {
        if (e1.v2.isEqual(e2.v1)) {
            return [e1,e2];
        }
        else if (e2.v2.isEqual(e1.v1)) {
            return [e2,e1];
        }
        else if (e1.v1.isEqual(e2.v1)) {
            return [new Edge(e1.v2,e1.v1),e2];
        }
        else if (e1.v2.isEqual(e2.v2)) {
            return [e1, new Edge(e2.v2,e2.v1)];
        }
        return [];
    }

    static findMatchingEdges(edges1:Edge[], edges2:Edge[]) : Edge[]
    {
        const matchingEdges:Edge[] = [];
        for ( const edge1 of edges1 ) {
            for ( const edge2 of edges2 ) {
                if ( edge1.isEqual(edge2) ) {
                    matchingEdges.push(edge1);
                }
            }
        }
        return matchingEdges;
    }

    static hasMatchingEdges(edges1:Edge[], edges2:Edge[]) : boolean
    {
        for ( const edge1 of edges1 ) {
            for ( const edge2 of edges2 ) {
                if ( edge1.isEqual(edge2) ) {
                    return true;
                }
            }
        }
        return false;
    }
}

// export class EdgeSet {
//     edges : Edge[];

//     constructor() {
//         this.edges = [];
//     }

//     addEdge(e:Edge) {
//         this.edges.push(e);
//     }

//     containsEdge(e:Edge) : boolean {
//         return this.edges.some( (edge, index, array) => { return e.equal(edge) } );
//     }
// }
