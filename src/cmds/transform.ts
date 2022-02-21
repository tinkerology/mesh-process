import { all, create } from 'mathjs';

import { MeshInterface } from '../lib/mesh';
import { MeshInfo } from '../lib/meshinfo';
import { MeshLoader } from '../lib/meshloader';
import { MeshOperations } from '../lib/meshoperations';
import { STLFile } from '../lib/stlfile';
import { Vertex, VertexInterface } from '../lib/vertex';
import { VertexFilterInterface } from '../lib/vertexfilter';

exports.command =
    'transform [xtransform] [ytransform] [ztransform] [infile] [outfile]';
exports.desc = 'Transform the specified STL file';
exports.builder = {
    xtransform: {
        default: 'x',
        description: 'X axis translation',
    },
    ytransform: {
        default: 'y',
        description: 'Y axis translation',
    },
    ztransform: {
        default: 'z',
        description: 'Z axis translation',
    },
    infile: {
        default: '',
        demandOption: true,
    },
    outfile: {
        default: '',
        demandOption: true,
    },
};

exports.handler = function (argv: any) {
    try {
        const mesh: MeshInterface = MeshLoader.loadMesh(argv.infile);

        const meshExtents = MeshInfo.getExtents(mesh);
        const scope = {
            minx: meshExtents.minx,
            miny: meshExtents.miny,
            minz: meshExtents.minz,
            maxx: meshExtents.maxx,
            maxy: meshExtents.maxy,
            maxz: meshExtents.maxz,

            // Derived
            sizex: meshExtents.maxx - meshExtents.minx,
            sizey: meshExtents.maxy - meshExtents.miny,
            sizez: meshExtents.maxz - meshExtents.minz,
        };

        const expTransform = new VertexFilterTransform(
            argv.xtransform,
            argv.ytransform,
            argv.ztransform,
            scope
        );

        const translatedMesh: MeshInterface = MeshOperations.transform(
            mesh,
            expTransform
        );

        new STLFile().writeSTLFile(
            argv.outfile,
            'Transform_x' +
                argv.xtransform +
                '_y' +
                argv.ytransform +
                '_z' +
                argv.ztransform,
            translatedMesh
        );
    } catch (e) {
        console.log('Error: Unable to load file\n', (e as Error).message);
    }
};

class VertexFilterTransform implements VertexFilterInterface {
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
