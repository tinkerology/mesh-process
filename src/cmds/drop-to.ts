
import { MeshInterface } from "../lib/mesh";
import { MeshOperations } from "../lib/mesh";
import { STLFile } from "../lib/stlfile";
import { MeshInfo } from "../lib/mesh";
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
    let stlFile : STLFile = new STLFile();
    let mesh:MeshInterface = stlFile.readSTLFile(argv.infile);

    let xOffset:number = 0; 
    let yOffset:number = 0; 
    let zOffset:number = 0; 
    var meshExtents = MeshInfo.getExtents(mesh);
    if ( argv.location.indexOf('x') >= 0 ) {
      xOffset = -1*meshExtents.minx;
    }
    if ( argv.location.indexOf('y') >= 0 ) {
      yOffset = -1*meshExtents.miny;
    }
    if ( argv.location.indexOf('z') >= 0 ) {
      zOffset = -1*meshExtents.minz;
    }

    let offset:VertexInterface = new Vertex(xOffset,yOffset,zOffset);
    let translatedMesh:MeshInterface = MeshOperations.translate(mesh, offset);

    stlFile.writeSTLFile(argv.outfile, "DropTo_" + argv.location, translatedMesh);

  }
  catch (e) {
    console.log("Error: Unable to load file\n", e.message);
  }
}
