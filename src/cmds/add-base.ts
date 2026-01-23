import { MeshInterface } from '../lib/mesh';
import { MeshLoader } from '../lib/meshloader';
import { MeshOperations } from '../lib/meshoperations';
import { STLFile } from '../lib/stlfile';

// Define an interface for the argv parameter
interface AddBaseArgs {
    baseHeight: number;
    infile: string;
    outfile: string;
}

exports.command =
    'add-base [baseHeight] [infile] [outfile]';
exports.desc = 'Create an enclosed volumn for a 2D mesh in the specified STL file';
exports.builder = {
    baseHeight: {
        default: '10',
        description: 'Distance from the 2D mesh to create the base',
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

exports.handler = function (argv: AddBaseArgs) {
    try {
        const mesh: MeshInterface = MeshLoader.loadMesh(argv.infile);

        MeshOperations.addBaseAndVerticalTriangles(
            mesh,
            argv.baseHeight
        );

        new STLFile().writeSTLFile(
            argv.outfile,
            'AddBase_baseHeight_' + argv.baseHeight,
            mesh
        );
    } catch (e) {
        console.error('Error: Unable to load file\n', (e as Error).message);
    }
};
