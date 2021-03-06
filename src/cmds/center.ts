import { MeshInterface } from '../lib/mesh';
import { MeshInfo } from '../lib/meshinfo';
import { MeshLoader } from '../lib/meshloader';
import { MeshOperations } from '../lib/meshoperations';
import { STLFile } from '../lib/stlfile';
import { VertexInterface } from '../lib/vertex';
import { Vertex } from '../lib/vertex';

exports.command = 'center [location] [infile] [outfile]';
exports.desc = 'Center the specified STL file';
exports.builder = {
    location: {
        choices: ['xyz', 'x', 'y', 'z', 'xy', 'xz', 'yz'] as const,
        default: 'xyz',
        description: 'Center the STL file',
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

        let xOffset = 0;
        let yOffset = 0;
        let zOffset = 0;
        const meshExtents = MeshInfo.getExtents(mesh);
        if (argv.location.indexOf('x') >= 0) {
            xOffset =
                (-1 * (meshExtents.maxx - meshExtents.minx)) / 2 -
                meshExtents.minx;
        }
        if (argv.location.indexOf('y') >= 0) {
            yOffset =
                (-1 * (meshExtents.maxy - meshExtents.miny)) / 2 -
                meshExtents.miny;
        }
        if (argv.location.indexOf('z') >= 0) {
            zOffset =
                (-1 * (meshExtents.maxz - meshExtents.minz)) / 2 -
                meshExtents.minz;
        }

        const offset: VertexInterface = new Vertex(xOffset, yOffset, zOffset);
        const translatedMesh: MeshInterface = MeshOperations.translate(
            mesh,
            offset
        );

        new STLFile().writeSTLFile(
            argv.outfile,
            'Center_' + argv.location,
            translatedMesh
        );
    } catch (e) {
        console.log('Error: Unable to load file\n', (e as Error).message);
    }
};
