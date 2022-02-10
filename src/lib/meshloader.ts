
import { Mesh } from "./mesh";
import { MeshInterface } from "./mesh";
import { STLFile } from "./stlfile";

export enum MeshFileTypes {
    UNKNOWN = 0,
    STL = 1,
}
export class MeshLoader {

    static loadMesh(filename:string) : MeshInterface {
        let mesh:MeshInterface = new Mesh();

        // Check extensions
        if ( filename.toLowerCase().endsWith('.stl') ) {
            const stlFile = new STLFile();
            mesh = stlFile.readSTLFile(filename);
        }
        return mesh;
    }

    static saveMesh(mesh:MeshInterface, name:string, filename:string) {
        (new STLFile()).writeSTLFile(filename, name, mesh);
    }
}
