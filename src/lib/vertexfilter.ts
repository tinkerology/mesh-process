import { all, create } from 'mathjs';

import { VertexInterface } from './vertex';
import { Vertex } from './vertex';

export interface VertexFilterInterface {
    filter(vertex: VertexInterface): VertexInterface;
}

export class VertexFilterNoOp implements VertexFilterInterface {
    filter(vertex: VertexInterface): VertexInterface {
        return vertex;
    }
}
export class VertexFilterTranslate implements VertexFilterInterface {
    offset: VertexInterface = new Vertex(0, 0, 0);

    constructor(offset: VertexInterface) {
        this.offset = offset;
    }

    filter(vertex: VertexInterface): VertexInterface {
        return vertex.add(this.offset);
    }
}
export class VertexFilterAbove implements VertexFilterInterface {
    xThreshold: number = Number.MAX_VALUE;
    yThreshold: number = Number.MAX_VALUE;
    zThreshold: number = Number.MAX_VALUE;
    operation: VertexFilterInterface = new VertexFilterNoOp();

    constructor(
        xThreshold: number,
        yThreshold: number,
        zThreshold: number,
        operation: VertexFilterInterface
    ) {
        this.xThreshold = xThreshold;
        this.yThreshold = yThreshold;
        this.zThreshold = zThreshold;
        this.operation = operation;
    }

    filter(vertex: VertexInterface): VertexInterface {
        if (
            vertex.x >= this.xThreshold ||
            vertex.y >= this.yThreshold ||
            vertex.z >= this.zThreshold
        ) {
            //            console.log("Filtering vertex: ", vertex);
            return this.operation.filter(vertex);
        }
        return vertex;
    }
}

export class VertexFilterReplace implements VertexFilterInterface {
    v1: VertexInterface = new Vertex(0, 0, 0);
    v2: VertexInterface = new Vertex(0, 0, 0);

    constructor(v1: VertexInterface, v2: VertexInterface) {
        this.v1 = v1;
        this.v2 = v2;
    }

    filter(vertex: VertexInterface): VertexInterface {
        if (
            vertex.x == this.v1.x &&
            vertex.y == this.v1.y &&
            vertex.z == this.v1.z
        ) {
            // console.log("Replacing vertex: ", vertex);
            return this.v2;
        }
        return vertex;
    }
}

export class VertexFilterTransform implements VertexFilterInterface {
    xExpression = 'x';
    yExpression = 'y';
    zExpression = 'z';

    xExpressionParsed;
    yExpressionParsed;
    zExpressionParsed;

    scope;

    constructor(
        xExpression: string,
        yExpression: string,
        zExpression: string,
        scope: any
    ) {
        this.xExpression = xExpression;
        this.yExpression = yExpression;
        this.zExpression = zExpression;

        const math = create(all);

        this.xExpressionParsed = math.parse(this.xExpression);
        this.yExpressionParsed = math.parse(this.yExpression);
        this.zExpressionParsed = math.parse(this.zExpression);

        this.scope = scope;
    }

    filter(vertex: VertexInterface): VertexInterface {
        this.scope.x = vertex.x;
        this.scope.y = vertex.y;
        this.scope.z = vertex.z;

        return vertex.add(
            new Vertex(
                this.xExpressionParsed.evaluate(this.scope),
                this.yExpressionParsed.evaluate(this.scope),
                this.zExpressionParsed.evaluate(this.scope)
            )
        );
    }
}
