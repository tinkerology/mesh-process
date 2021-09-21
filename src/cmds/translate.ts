
import { MeshInterface } from "../lib/mesh";
import { MeshOperations } from "../lib/meshoperations";
import { STLFile } from "../lib/stlfile";
import { Vertex } from "../lib/vertex";

exports.command = 'translate [x] [y] [z] [infile] [outfile]'
exports.desc = 'Translate the specified STL file'
exports.builder = {
  x: {
    default: 0,
    description: 'X axis translation'
  },
  y: {
    default: 0,
    description: 'Y axis translation'
  },
  z: {
    default: 0  ,
    description: 'Z axis translation'
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

    let translatedMesh:MeshInterface = MeshOperations.translate(mesh, new Vertex(argv.x, argv.y, argv.z));

    stlFile.writeSTLFile(argv.outfile, "Translate_x" + argv.x + "_y" + argv.y + "_z" + argv.z, translatedMesh);
  }
  catch (e) {
    console.log("Error: Unable to load file\n", e.message);
  }
}
