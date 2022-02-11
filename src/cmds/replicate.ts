import { MeshInterface } from '../lib/mesh';
import { MeshLoader } from '../lib/meshloader';
import { MeshOperations } from '../lib/meshoperations';
import { STLFile } from '../lib/stlfile';

exports.command =
    'replicate [xCount] [xSpacing] [ySpacing] [totalCount] [infile] [outfile]';
exports.desc = 'Replicate the specified STL file in a grid';
exports.builder = {
    xCount: {
        default: 1,
        description: 'Max number of columns along the X axis',
    },
    xSpacing: {
        default: 10,
        description: 'Spacing between copies along the X axis',
    },
    ySpacing: {
        default: 10,
        description: 'Spacing between copies along the Y axis',
    },
    totalCount: {
        default: 2,
        description: 'Total number of copies (including the original)',
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

        const combinedMesh: MeshInterface = MeshOperations.replicate(
            mesh,
            argv.xCount,
            argv.xSpacing,
            argv.ySpacing,
            argv.totalCount
        );

        new STLFile().writeSTLFile(
            argv.outfile,
            'Replicate_' + argv.totalCount,
            combinedMesh
        );
    } catch (e) {
        console.log('Error: Unable to load file\n', (e as Error).message);
    }
};
