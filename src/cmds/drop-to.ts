
import { MeshInterface } from "../lib/mesh";
import { MeshInfo } from "../lib/meshinfo";
import { MeshLoader } from "../lib/meshloader";
import { MeshOperations } from "../lib/meshoperations";
import { STLFile } from "../lib/stlfile";
import { VertexInterface } from "../lib/vertex";
import { Vertex } from "../lib/vertex";

exports.command = 'drop-to [location] [infile] [outfile]'
exports.desc = 'Drop the specified STL file to zero on the specified axes.'
exports.builder = {
  location: {
    choices: ['xyz', 'x', 'y', 'z', 'xy', 'xz', 'yz'] as const,
    default: 'z',
    description: 'Set lower bound of model on specified axis or axes.'
  },
  infile: {
    default: '',
    demandOption: true
  },
  outfile: {
    default: '',
    demandOption: true
  },
}

exports.handler = function (argv:any) {
  try {
    const mesh:MeshInterface = MeshLoader.loadMesh(argv.infile);

    let xOffset = 0; 
    let yOffset = 0; 
    let zOffset = 0; 
    const meshExtents = MeshInfo.getExtents(mesh);
    if ( argv.location.indexOf('x') >= 0 ) {
      xOffset = -1*meshExtents.minx;
    }
    if ( argv.location.indexOf('y') >= 0 ) {
      yOffset = -1*meshExtents.miny;
    }
    if ( argv.location.indexOf('z') >= 0 ) {
      zOffset = -1*meshExtents.minz;
    }

    const offset:VertexInterface = new Vertex(xOffset,yOffset,zOffset);
    const translatedMesh:MeshInterface = MeshOperations.translate(mesh, offset);

    (new STLFile()).writeSTLFile(argv.outfile, "DropTo_" + argv.location, translatedMesh);
  }
  catch (e) {
    console.log("Error: Unable to load file\n", (e as Error).message);
  }
}
