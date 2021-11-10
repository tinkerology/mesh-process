
import { MeshInterface } from "../lib/mesh";
import { MeshLoader } from "../lib/meshloader";
import { MeshOperations } from "../lib/meshoperations";
import { STLFile } from "../lib/stlfile";

exports.command = 'rotate [x] [y] [z] [infile] [outfile]'
exports.desc = 'Rotate the specified STL file by the specified degrees in X, Y, and Z'
exports.builder = {
  x: {
    default: 0,
    description: 'X rotation in degrees'
  },
  y: {
    default: 0,
    description: 'Y rotation in degrees'
  },
  z: {
    default: 0,
    description: 'Z rotation in degrees'
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

    const rotatedMesh:MeshInterface = MeshOperations.rotate(mesh, argv.x, argv.y, argv.z);

    (new STLFile()).writeSTLFile(argv.outfile, "Rotate_" + argv.x + "_" + argv.y + "_" + argv.z, rotatedMesh);
  }
  catch (e) {
    console.log("Error: Unable to load file\n", (e as Error).message);
  }
}
