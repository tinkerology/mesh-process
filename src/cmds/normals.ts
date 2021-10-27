
import { MeshInterface } from "../lib/mesh";
import { MeshOperations } from "../lib/meshoperations";
import { STLFile } from "../lib/stlfile";

exports.command = 'normals [operation] [infile] [outfile]'
exports.desc = 'Modify the normals of the specified STL file'
exports.builder = {
  operation: {
    choices: ['flip'] as const,
    default: 'flip',
    description: 'Flip all normals'
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

    if ( argv.operation == 'flip') {
      mesh = MeshOperations.flipNormals(mesh);
    }

    stlFile.writeSTLFile(argv.outfile, "Normals_" + argv.operation, mesh);
  }
  catch (e) {
    console.log("Error: Unable to load file\n", (e as Error).message);
  }
}
