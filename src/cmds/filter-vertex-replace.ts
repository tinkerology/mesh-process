
import { MeshInterface } from "../lib/mesh";
import { VertexFilterReplace } from "../lib/vertexfilter";
import { MeshOperations } from "../lib/meshoperations";
import { STLFile } from "../lib/stlfile";
import { Vertex } from "../lib/vertex";

exports.command = 'filter-vertex-replace [xOrig] [yOrig] [zOrig] [xNew] [yNew] [zNew] [infile] [outfile]'
exports.desc = 'Change the location of the vertex in the specified STL file'
exports.builder = {
  xOrig: {
    default: Number.MAX_VALUE,
    description: 'Vertex to move: x'
  },
  yOrig: {
    default: Number.MAX_VALUE,
    description: 'Vertex to move: y'
  },
  zOrig: {
    default: Number.MAX_VALUE,
    description: 'Vertex to move: z'
  },
  xNew: {
    default: Number.MAX_VALUE,
    description: 'New vertex location: x'
  },
  yNew: {
    default: Number.MAX_VALUE,
    description: 'New vertex location: y'
  },
  zNew: {
    default: Number.MAX_VALUE,
    description: 'New vertex location: z'
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

    let translatedMesh:MeshInterface = MeshOperations.filterVertices(mesh,
          new VertexFilterReplace(new Vertex(argv.xOrig, argv.yOrig, argv.zOrig),
                                  new Vertex(argv.xNew, argv.yNew, argv.zNew) ) );

    stlFile.writeSTLFile(argv.outfile, "FilterVertexReplace_x" + argv.x + "_y" + argv.y + "_z" + argv.z, translatedMesh);
  }
  catch (e) {
    console.log("Error: Unable to load file\n", e.message);
  }
}
