
import { VertexInterface } from "./vertex";
import { Vertex } from "./vertex";

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
            // console.log("Replacing vertex: ", vertex);
            return this.v2;
        }
        return vertex;
    }
}
