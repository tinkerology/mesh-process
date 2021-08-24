
import { MeshInterface } from "../lib/mesh";
import { MeshOperations } from "../lib/mesh";
import { STLFile } from "../lib/stlfile";

exports.command = 'replicate [xCount] [xSpacing] [ySpacing] [totalCount] [infile] [outfile]'
exports.desc = 'Replicate the specified STL file in a grid'
exports.builder = {
  xCount: {
    default: 1,
    description: 'Max number of columns along the X axis'
  },
  xSpacing: {
    default: 10,
    description: 'Spacing between copies along the X axis'
  },
  ySpacing: {
    default: 10,
    description: 'Spacing between copies along the Y axis'
  },
  totalCount: {
    default: 2,
    description: 'Total number of copies (including the original)'
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


    let combinedMesh:MeshInterface = MeshOperations.replicate(mesh, argv.xCount, argv.xSpacing, argv.ySpacing, argv.totalCount);
    
    stlFile.writeSTLFile(argv.outfile, "Replicate_" + argv.totalCount, combinedMesh);

  }
  catch (e) {
    console.log("Error: Unable to load file\n", e.message);
  }
}
