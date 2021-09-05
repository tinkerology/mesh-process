
import { VertexInterface } from "./vertex";
import { Vertex } from "./vertex";

export interface TriangleFilterInterface {
    filter(vertex : TriangleInterface) : TriangleInterface;
}

export class TriangleFilterNoOp implements TriangleFilterInterface {
    filter(triangle : TriangleInterface) : TriangleInterface {
        return triangle;
    }
}

export interface TriangleInterface {
    v1 : VertexInterface;
    v2 : VertexInterface;
    v3 : VertexInterface;
    normal? : VertexInterface; 

    clone() : TriangleInterface;

    calculateNormal() : VertexInterface;
    flipNormal() : TriangleInterface;
    getEdges() : Edge[];
    getCenterCentroid() : VertexInterface;
}

export class Triangle {
    v1 : VertexInterface = new Vertex(0,0,0);
    v2 : VertexInterface = new Vertex(0,0,0);
    v3 : VertexInterface = new Vertex(0,0,0);
    normal? : VertexInterface = undefined;

    constructor(v1 : VertexInterface, v2 : VertexInterface, v3 : VertexInterface) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }

    clone() : TriangleInterface {
        return new Triangle(this.v1,this.v2,this.v3);
    }

    toString() : string {
        return "Triangle " + this.v1 + ", " + this.v2 + ", " + this.v3;
    }

    calculateNormal() : VertexInterface {
        return this.v1.cross(this.v2);
    }

    flipNormal() : TriangleInterface {
        return new Triangle(this.v3.clone(), this.v2.clone(), this.v1.clone());
    }

    getEdges() : Edge[] {
        return [new Edge(this.v1, this.v2),
                new Edge(this.v2, this.v3),
                new Edge(this.v3, this.v1)];
    }

    getCenterCentroid() : VertexInterface {
        return new Vertex((this.v1.x+this.v2.x+this.v3.x)/3,
                          (this.v1.y+this.v2.y+this.v3.y)/3,
                          (this.v1.z+this.v2.z+this.v3.z)/3);   
    }
}

export class Edge {
    v1 : VertexInterface;
    v2 : VertexInterface;

    constructor(v1:VertexInterface,v2:VertexInterface) {
        this.v1 = v1;
        this.v2 = v2;
    }

    equal(e:Edge) : boolean {
        if ( (this.v1.equal(e.v1) && this.v2.equal(e.v2)) ||
             (this.v1.equal(e.v2) && this.v2.equal(e.v1)) ) {
            return true;
        }
        return false;
    }

    isConnected(e:Edge) : boolean {
        if ( (this.v1.equal(e.v1) || this.v2.equal(e.v2)) ||
             (this.v1.equal(e.v2) || this.v2.equal(e.v1)) ) {
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
        if (e1.v2.equal(e2.v1)) {
            return [e1,e2];
        }
        else if (e2.v2.equal(e1.v1)) {
            return [e2,e1];
        }
        else if (e1.v1.equal(e2.v1)) {
            return [new Edge(e1.v2,e1.v1),e2]
        }
        else if (e1.v2.equal(e2.v2)) {
            return [e1, new Edge(e2.v2,e2.v1)]
        }
        return [];
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
