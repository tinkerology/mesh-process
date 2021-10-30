
import { MeshInterface } from "../lib/mesh";
import { STLFile } from "../lib/stlfile";

exports.command = 'concat [infile1] [infile2] [outfile]'
exports.desc = 'Add two meshes into one file'
exports.builder = {
  infile1: {
    default: '',
    demandOption: true
  },
  infile2: {
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
    const stlFile : STLFile = new STLFile();
    const mesh1:MeshInterface = stlFile.readSTLFile(argv.infile1);
    const mesh2:MeshInterface = stlFile.readSTLFile(argv.infile2);

    mesh1.addMesh(mesh2);
    
    stlFile.writeSTLFile(argv.outfile, "Concat_" + argv.infile1 +"_" + argv.infile2, mesh1);

  }
  catch (e) {
    console.log("Error: Unable to load file\n", (e as Error).message);
  }
}
