
import { Edge } from "./edge";
import { VertexInterface } from "./vertex";
import { Vertex } from "./vertex";

export interface TriangleInterface {
    v1 : VertexInterface;
    v2 : VertexInterface;
    v3 : VertexInterface;
    normal? : VertexInterface; 

    clone() : TriangleInterface;

    isEqual(t : TriangleInterface) : boolean;
    isAdjacent( t : TriangleInterface) : boolean;
    hasVertex( v : VertexInterface) : boolean;

    calculateNormal() : VertexInterface;
    flipNormal() : TriangleInterface;
    getVertices() : VertexInterface[];
    getEdges() : Edge[];
    getCenterCentroid() : VertexInterface;

    getPerimeter() : number;
    getArea() : number;
}

export class Triangle implements TriangleInterface {
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

    isEqual(t : TriangleInterface) : boolean {
        const edges:Edge[] = this.getEdges();
        const tEdges:Edge[] = t.getEdges();

        const matchingEdges:Edge[] = Edge.findMatchingEdges(edges,tEdges);
        return matchingEdges.length == 3;
    }

    isAdjacent( t : TriangleInterface) : boolean {
        const edges:Edge[] = this.getEdges();
        const tEdges:Edge[] = t.getEdges();

        return Edge.hasMatchingEdges(edges,tEdges);
    }

    hasVertex( v : VertexInterface) : boolean {
        if ( this.v1.isEqual(v) || this.v2.isEqual(v) || this.v3.isEqual(v) ) {
            return true;
        }
        return false;
    }

    toString() : string {
        return "Triangle " + this.v1 + ", " + this.v2 + ", " + this.v3;
    }

    calculateNormal() : VertexInterface {
        const v1v2:VertexInterface = this.v2.subtract(this.v1);
        const v1v3:VertexInterface = this.v3.subtract(this.v1);
        return v1v2.cross(v1v3);
    }

    flipNormal() : TriangleInterface {
        return new Triangle(this.v3.clone(), this.v2.clone(), this.v1.clone());
    }

    getVertices() : VertexInterface[] {
        return [this.v1,this.v2,this.v3];
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

    getPerimeter() : number {
        const edges:Edge[] = this.getEdges();
        const perimeter = edges[0].length() + edges[1].length() + edges[2].length();
        return perimeter;
    }

    getArea() : number {
        const edges:Edge[] = this.getEdges();
        const s = this.getPerimeter()/2;
        const area = Math.sqrt(s * ( s-edges[0].length()) * (s-edges[1].length()) * (s-edges[2].length()));
        return area;
    }
}
