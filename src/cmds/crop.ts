
import { BoundingBox } from "../lib/boundingbox";
import { MeshInterface } from "../lib/mesh";
import { MeshOperations } from "../lib/meshoperations";
import { STLFile } from "../lib/stlfile";

exports.command = 'crop [location] [minx] [miny] [minz] [maxx] [maxy] [maxz] [infile] [outfile] '
exports.desc = 'Crop the specified STL file'
exports.builder = {
  location: {
    choices: ['inside', 'outside'] as const,
    default: 'inside',
    description: 'Whether to save vertices inside the bounding box our outside'
  },
  minx: {
    default: Number.MIN_SAFE_INTEGER
  },
  miny: {
    default: Number.MIN_SAFE_INTEGER
  },
  minz: {
    default: Number.MIN_SAFE_INTEGER
  },
  maxx: {
    default: Number.MAX_SAFE_INTEGER
  },
  maxy: {
    default: Number.MAX_SAFE_INTEGER
  },
  maxz: {
    default: Number.MAX_SAFE_INTEGER
  },
  infile: {
    default: '',
    demandOption: true
  },
  outfile: {
    default: '',
    demandOption: true
  }
}
exports.handler = function (argv:any) {
  try {
    const stlFile : STLFile = new STLFile();
    const mesh:MeshInterface = stlFile.readSTLFile(argv.infile);

    const boundingBox = new BoundingBox();
    boundingBox.minx = argv.minx;
    boundingBox.miny = argv.miny;
    boundingBox.minz = argv.minz;
    boundingBox.maxx = argv.maxx;
    boundingBox.maxy = argv.maxy;
    boundingBox.maxz = argv.maxz;

    const location:number = argv.location=="inside" ? MeshOperations.CROP_INSIDE : MeshOperations.CROP_OUTSIDE;
    const croppedMesh:MeshInterface = MeshOperations.crop(mesh, boundingBox).meshes[location];

    stlFile.writeSTLFile(argv.outfile, "Cropped", croppedMesh);

  }
  catch (e) {
    console.log("Error: Unable to load file\n", (e as Error).message);
  }
}
