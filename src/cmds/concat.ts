
import { MeshInterface } from "../lib/mesh";
import { MeshLoader } from "../lib/meshloader";
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
    const mesh1:MeshInterface = MeshLoader.loadMesh(argv.infile1);
    const mesh2:MeshInterface = MeshLoader.loadMesh(argv.infile2);

    mesh1.addMesh(mesh2);
    
    (new STLFile()).writeSTLFile(argv.outfile, "Concat_" + argv.infile1 +"_" + argv.infile2, mesh1);
  }
  catch (e) {
    console.log("Error: Unable to load file\n", (e as Error).message);
  }
}
