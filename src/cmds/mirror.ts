
import { MeshInterface } from "../lib/mesh";
import { MeshLoader } from "../lib/meshloader";
import { MeshOperations } from "../lib/meshoperations";
import { STLFile } from "../lib/stlfile";

exports.command = 'mirror [location] [infile] [outfile]'
exports.desc = 'Mirror the specified STL file on the specified axis'
exports.builder = {
  location: {
    choices: ['xyz', 'x', 'y', 'z', 'xy', 'xz', 'yz'] as const,
    default: 'xyz',
    description: 'Mirror the STL file'
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

    let x = false; 
    let y = false; 
    let z = false; 
    if ( argv.location.indexOf('x') >= 0 ) {
      x = true;
    }
    if ( argv.location.indexOf('y') >= 0 ) {
      y = true;
    }
    if ( argv.location.indexOf('z') >= 0 ) {
      z = true;
    }

    const translatedMesh:MeshInterface = MeshOperations.mirror(mesh, x, y, z);

    (new STLFile()).writeSTLFile(argv.outfile, "Mirror_" + argv.location, translatedMesh);

  }
  catch (e) {
    console.log("Error: Unable to load file\n", (e as Error).message);
  }
}
