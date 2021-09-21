
import { MeshInterface } from "../lib/mesh";
import { MeshOperations } from "../lib/meshoperations";
import { STLFile } from "../lib/stlfile";

exports.command = 'scale-to-size [axis] [size] [infile] [outfile]'
exports.desc = 'Scale the specified STL file to [size] along the [axis]'
exports.builder = {
  axis: {
    default: 'x',
    description: 'Axis to scale along'
  },
  size: {
    default: 100,
    description: 'The size to scale the axis to'
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

    let scaledMesh:MeshInterface = MeshOperations.scaleToSize(mesh, argv.axis, argv.size);

    stlFile.writeSTLFile(argv.outfile, "ScaleToSize_axis" + argv.axis + "_size" + argv.size, scaledMesh);
  }
  catch (e) {
    console.log("Error: Unable to load file\n", e.message);
  }
}
