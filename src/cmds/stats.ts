
import { Edge } from "../lib/edge";
import { MeshInterface } from "../lib/mesh";
import { MeshInfo } from "../lib/meshinfo";
import { MeshExtents } from "../lib/meshinfo";
import { MeshLoader } from "../lib/meshloader";

exports.command = 'stats [file]'
exports.desc = 'Print info about the specified STL file'
exports.builder = {
  file: {
    default: ''
  }
}
exports.handler = function (argv:any) {
    try {
      const mesh:MeshInterface = MeshLoader.loadMesh(argv.file);
      const triangleCount:number = mesh.triangles.length;
      const meshExtents:MeshExtents = MeshInfo.getExtents(mesh);
      const singleEdges:Edge[] = MeshInfo.getSingleEdges(MeshInfo.getEdges(mesh));
      console.log({
          "file": argv.file,
          "triangleCount" : triangleCount,
          "meshExtents" : meshExtents,
          "singleEdgeCount" : singleEdges.length
      });
    }
    catch (e) {
      console.log("Error: Unable to load file\n", (e as Error).message);
    }
}
