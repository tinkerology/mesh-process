
import { MeshInterface } from "../lib/mesh";
import { MeshLoader } from "../lib/meshloader";
import { MeshOperations } from "../lib/meshoperations";
import { STLFile } from "../lib/stlfile";
import { Vertex } from "../lib/vertex";

exports.command = 'scale [x] [y] [z] [infile] [outfile]'
exports.desc = 'Scale the specified STL file'
exports.builder = {
  x: {
    default: 1,
    description: 'X axis scale'
  },
  y: {
    default: 1,
    description: 'Y axis scale'
  },
  z: {
    default: 1,
    description: 'Z axis scale'
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

    const scaledMesh:MeshInterface = MeshOperations.scale(mesh, new Vertex(argv.x, argv.y, argv.z));

    (new STLFile()).writeSTLFile(argv.outfile, "Scale_x" + argv.x + "_y" + argv.y + "_z" + argv.z, scaledMesh);
  }
  catch (e) {
    console.log("Error: Unable to load file\n", (e as Error).message);
  }
}
