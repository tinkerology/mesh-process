
import { BoundingBox } from "./boundingbox";

export interface VertexInterface {
    x : number;
    y : number;
    z : number;

    clone() : VertexInterface;

    isInside(boundingBox:BoundingBox) : boolean;

    distance( v: VertexInterface) : number;

    scale(v : VertexInterface) : VertexInterface;
    add(v : VertexInterface) : VertexInterface;
    equal(v : VertexInterface) : boolean;
    dot(v : VertexInterface) : number;
    cross(v : VertexInterface) : VertexInterface;
    length() : number;
}

export class Vertex implements VertexInterface {
    x = 0;
    y = 0;
    z = 0;

    constructor(x : number, y : number, z : number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toString() : string {
        return "Vertex " + this.x + ", " + this.y + ", " + this.z;
    }

    clone() : VertexInterface {
        return new Vertex(this.x, this.y, this.z);
    }

    isInside(boundingBox:BoundingBox) : boolean {
        return boundingBox.isInside(this.x, this.y, this.z);
    }

    distance( v:VertexInterface) : number {
        return new Vertex(this.x-v.x, this.y-v.y, this.z-v.z).length();
    }

    scale(v:VertexInterface) : VertexInterface {
        return new Vertex(this.x*v.x, this.y*v.y, this.z*v.z);
    }

    add(v : VertexInterface) : VertexInterface {
        return new Vertex(this.x+v.x, this.y+v.y, this.z+v.z);
    }

    equal(v : VertexInterface) : boolean {
        if (this.x != v.x || this.y != v.y || this.z != v.z) {
          return false;
        }
        return true;
    }

    dot(v : VertexInterface) : number {
        return ( this.x * v.x + this.y * v.y + this.z * v.z);
      }
    
    cross(v : VertexInterface) : VertexInterface {
        return new Vertex(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x);
    }
    
    length() : number {
        return Math.sqrt(
            this.x * this.x +
            this.y * this.y +
            this.z * this.z);
    }
    
}