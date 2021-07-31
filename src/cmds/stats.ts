
import { MeshInterface } from "../lib/mesh";
import { MeshInfo } from "../lib/mesh";
import { MeshExtents } from "../lib/mesh";
import { STLFile } from "../lib/stlfile";

exports.command = 'stats [file]'
exports.desc = 'Print info about the specified STL file'
exports.builder = {
  file: {
    default: ''
  }
}
exports.handler = function (argv:any) {
    try {
      let stlFile : STLFile = new STLFile();
      let mesh:MeshInterface = stlFile.readSTLFile(argv.file);
      let triangleCount:number = mesh.triangles.length;
      let meshExtents:MeshExtents = MeshInfo.getExtents(mesh);
      console.log({
          "file": argv.file,
          "triangleCount" : triangleCount,
          "meshExtents" : meshExtents
      });
    }
    catch (e) {
      console.log("Error: Unable to load file\n", e.message);
    }
}
