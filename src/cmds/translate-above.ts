import { MeshInterface } from '../lib/mesh';
import { MeshLoader } from '../lib/meshloader';
import { MeshOperations } from '../lib/meshoperations';
import { STLFile } from '../lib/stlfile';
import { Vertex } from '../lib/vertex';
import { VertexFilterAbove, VertexFilterTranslate } from '../lib/vertexfilter';

exports.command =
    'translate-above [xThreshold] [yThreshold] [zThreshold] [x] [y] [z] [infile] [outfile]';
exports.desc =
    'Translate the vertices in the specified STL file above xThreshhold';
exports.builder = {
    xThreshold: {
        default: Number.MAX_VALUE,
        description: 'X axis vertex threshold',
    },
    yThreshold: {
        default: Number.MAX_VALUE,
        description: 'Y axis vertex threshold',
    },
    zThreshold: {
        default: Number.MAX_VALUE,
        description: 'Z axis vertex threshold',
    },
    x: {
        default: 0,
        description: 'X axis translation',
    },
    y: {
        default: 0,
        description: 'Y axis translation',
    },
    z: {
        default: 0,
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
        if (argv.xThreshold === '-') {
            console.log('X threshold set to max');
            argv.xThreshhold = Number.MAX_VALUE;
        }
        if (argv.yThreshold === '-') {
            console.log('Y threshold set to max');
            argv.yThreshhold = Number.MAX_VALUE;
        }
        if (argv.zThreshold === '-') {
            console.log('Z threshold set to max');
            argv.zThreshhold = Number.MAX_VALUE;
        }
        const mesh: MeshInterface = MeshLoader.loadMesh(argv.infile);

        const translatedMesh: MeshInterface = MeshOperations.translateFiltered(
            mesh,
            new VertexFilterAbove(
                argv.xThreshold,
                argv.yThreshold,
                argv.zThreshold,
                new VertexFilterTranslate(new Vertex(argv.x, argv.y, argv.z))
            )
        );

        new STLFile().writeSTLFile(
            argv.outfile,
            'TranslateAbove_x' + argv.x + '_y' + argv.y + '_z' + argv.z,
            translatedMesh
        );
    } catch (e) {
        console.log('Error: Unable to load file\n', (e as Error).message);
    }
};
