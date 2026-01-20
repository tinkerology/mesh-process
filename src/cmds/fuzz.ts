import { MeshInterface } from '../lib/mesh';
import { MeshInfo } from '../lib/meshinfo';
import { MeshLoader } from '../lib/meshloader';
import { MeshOperations } from '../lib/meshoperations';
import { STLFile } from '../lib/stlfile';
import { Vertex } from '../lib/vertex';
import { VertexFilterMap } from '../lib/vertexfilter';

exports.command =
    'fuzz [xFuzzMin] [xFuzzMax] [yFuzzMin] [yFuzzMax] [zFuzzMin] [zFuzzMax] [infile] [outfile]';
exports.desc = 'Introduce randomness to the vertices of the specified STL file';
exports.builder = {
    xFuzzMin: {
        default: '0',
        description: 'X axis random range minimum',
    },
    xFuzzMax: {
        default: '0',
        description: 'X axis random range maximum',
    },
    yFuzzMin: {
        default: '0',
        description: 'Y axis random range minimum',
    },
    yFuzzMax: {
        default: '0',
        description: 'Y axis random range maximum',
    },
    zFuzzMin: {
        default: '0',
        description: 'Z axis random range minimum',
    },
    zFuzzMax: {
        default: '0',
        description: 'Z axis random range maximum',
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

        const xRange = argv.xFuzzMax - argv.xFuzzMin;
        const yRange = argv.yFuzzMax - argv.yFuzzMin;
        const zRange = argv.zFuzzMax - argv.zFuzzMin;

        const originalVertices = MeshInfo.getVertices(mesh);
        const newVertices: Vertex[] = [];
        for (let i = 0; i < originalVertices.length; i++) {
            const newX =
                originalVertices[i].x + Math.random() * xRange + argv.xFuzzMin;
            const newY =
                originalVertices[i].y + Math.random() * yRange + argv.yFuzzMin;
            const newZ =
                originalVertices[i].z + Math.random() * zRange + argv.zFuzzMin;

            const newVertex = new Vertex(newX, newY, newZ);
            newVertices.push(newVertex);
        }

        const translatedMesh: MeshInterface = MeshOperations.filterVertices(
            mesh,
            new VertexFilterMap(originalVertices, newVertices)
        );

        new STLFile().writeSTLFile(
            argv.outfile,
            'Fuzz_x' +
                argv.xFuzzMin +
                '_' +
                argv.xFuzzMax +
                '_y' +
                argv.yFuzzMin +
                '_' +
                argv.yFuzzMax +
                '_z' +
                argv.zFuzzMin +
                '_' +
                argv.zFuzzMax,
            translatedMesh
        );
    } catch (e) {
        console.log('Error: Unable to load file\n', (e as Error).message);
    }
};
