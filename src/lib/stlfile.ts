
import { VertexInterface } from "./vertex";
import { Vertex } from "./vertex";
import { TriangleInterface } from "./triangle";
import { Triangle } from "./triangle";
import { MeshInterface } from "./mesh";
import { Mesh } from "./mesh";

const fs = require("fs");

// This file is MIT license due to copying code from:
// https://github.com/johannesboyne/node-stl
// This software is released under the MIT license:

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

export interface STLFileInterface {
    readSTLFile(path: string) : MeshInterface;
    readSTLBuffer(buffer : Buffer) : MeshInterface;
    readSTLString(buffer : string) : MeshInterface;
    writeSTLFile(path:string, name:string, mesh:MeshInterface) : any;
    writeSTLString(name: string, mesh:MeshInterface) : string;
}

export class STLFile implements STLFileInterface {
    constructor() {
    }

    readSTLFile(path: string) : MeshInterface {
        // console.log("readSTLFile: " + path);

        let buffer : Buffer = fs.readFileSync(path);
        let isBinary : boolean = this._isBinary(buffer);
        // console.log("isBinary: " + isBinary);
        if ( isBinary ) {
            return this.readSTLBuffer(buffer);
        }
        return this.readSTLString(buffer.toString());
    }
    
    readSTLBuffer(buffer : Buffer) : MeshInterface {
        // (borrowed some code from here: https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/STLLoader.js)

        const mesh = new Mesh();
        const faces = buffer.readUInt32LE(80);
        const dataOffset = 84;
        const faceLength = 12 * 4 + 2;
    
        for (let face = 0; face < faces; face++) {
          const start = dataOffset + face * faceLength;
    
          let vertexes = new Array(3);
    
          for (let i = 1; i <= 3; i++) {
            const vertexstart = start + i * 12;
    
            vertexes[i - 1] = new Vertex(
              buffer.readFloatLE(vertexstart),
              buffer.readFloatLE(vertexstart + 4),
              buffer.readFloatLE(vertexstart + 8)
            );
          }
    
          mesh.addTriangle(new Triangle(vertexes[0], vertexes[1], vertexes[2]));
        }
    
        return mesh;
    }

    readSTLString(buffer : string) : MeshInterface {
        // Create a new Mesh
        let mesh:MeshInterface = new Mesh();

        // yes, this is the regular expression, matching the vertexes
        // it was kind of tricky but it is fast and does the job
        let vertexes : string[]|null = buffer.match(
            /facet\s+normal\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+outer\s+loop\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+endloop\s+endfacet/g
        );
    
        if ( vertexes != null ) {
            vertexes.forEach( (vert) => {
                if ( vert != null ) {
                    // console.log("   vert string: " + vert);
                    let vectors : RegExpMatchArray|null = vert.match(
                        /vertex\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s+([-+]?\b(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?\b)\s/g
                    );
                    if ( vectors != null ) {
                        const triangle = new Array(3);
                        vectors.forEach((vertex, i) => {
                            const xyz : RegExpMatchArray|null = vertex
                            .replace("vertex", "")
                            .match(/[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/g);
                
                            if ( xyz != null ) {
                                triangle[i] = new Vertex(Number(xyz[0]), Number(xyz[1]), Number(xyz[2]));
                            }
                        });
                        mesh.addTriangle(new Triangle(triangle[0],triangle[1],triangle[2]));
                    }
                }
            });
        }
        return mesh;
    }

    writeSTLFile(path:string, name:string, mesh:MeshInterface) {
        fs.writeFile(path, this.writeSTLString(name, mesh),  function(err:any) {
            if (err) {
                console.error(err);
            } else {
                console.log("STL File created: ", name);
            }
        });
    }

    writeSTLString(name: string, mesh:MeshInterface) : string {
        let buffer : string = "solid " + name + "\n";

        // Write out all the triangles
        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            let normal : VertexInterface = triangle.calculateNormal();

            buffer += " facet normal " + normal.x + " " + normal.y + " " + normal.z + "\n";
            buffer += "  outer loop\n";
            buffer += "   vertex " + triangle.v1.x + " " + triangle.v1.y + " " + triangle.v1.z + "\n";
            buffer += "   vertex " + triangle.v2.x + " " + triangle.v2.y + " " + triangle.v2.z + "\n";
            buffer += "   vertex " + triangle.v3.x + " " + triangle.v3.y + " " + triangle.v3.z + "\n";
            buffer += "  endloop\n";
            buffer += " endfacet\n";
        });
            
        buffer += "endsolid " + name + "\n";
        return buffer;
    }

    /**
     * check if stl is binary vs ASCII
     * (borrowed some code from here: https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/STLLoader.js)
     * @param {buffer} buffer
     * @returns {boolean}
     */
    _isBinary(buffer : Buffer) {
        const MAX_ASCII_CHAR_CODE = 127;
        const header_size = 84;
        const str = buffer.toString()

        if (buffer.length <= header_size) {
            return false; // an empty binary STL must be at least 84 bytes
        }

        for (var i = 0, strLen = str.length; i < strLen; ++i) {
            if (str.charCodeAt(i) > MAX_ASCII_CHAR_CODE) {
                return true;
            }
        }

        let expected_size, face_size, n_faces;
        face_size = 50;
        n_faces = buffer.readUInt32LE(80);

        // An ASCII STL data must begin with 'solid ' as the first six bytes.
        // However, ASCII STLs lacking the SPACE after the 'd' are known to be
        // plentiful. There are also many binary STL that start with solid
        // regardless of this standard, so we check if offset 80, the location of
        // the number of triangles in a binary STL matches the expected file size.

        expected_size = header_size + n_faces * face_size;
        return buffer.length === expected_size;
    }

}
