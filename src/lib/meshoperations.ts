
import { BoundingBox } from "./boundingbox";
import { Edge } from "./edge";
import { Mesh, MeshInterface } from "./mesh";
import { MeshExtents } from "./meshinfo";
import { MeshInfo } from "./meshinfo";
import { Scene } from "./scene";
import { Triangle } from "./triangle";
import { TriangleInterface } from "./triangle";
import { Vertex } from "./vertex";
import { VertexInterface } from "./vertex";
import { VertexFilterInterface } from "./vertexfilter";


export class MeshOperations {
    static CROP_INSIDE  = 0;
    static CROP_OUTSIDE  = 1;

    static removeTriangles(mesh:MeshInterface, trianglesToRemove:TriangleInterface[]) : MeshInterface
    {
        const removedMesh = new Mesh();

        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            let found = false;
            trianglesToRemove.forEach( function(triangleToRemove:TriangleInterface) {
                if ( triangle.isEqual(triangleToRemove) ) {
                    found = true;
                }
            });
            if ( !found ) {
                removedMesh.addTriangle(triangle);
            }
        });

        return removedMesh;
    }

    static rotate(mesh:MeshInterface, x:number, y:number, z:number) : MeshInterface
    {
        const rotatedMesh = new Mesh();

        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            const rotatedTriangle = new Triangle( triangle.v1.rotate(x,y,z),
                                                  triangle.v2.rotate(x,y,z),
                                                  triangle.v3.rotate(x,y,z)
            );
            rotatedMesh.addTriangle(rotatedTriangle);
        });

        return rotatedMesh;
    }

    static crop(mesh:MeshInterface, boundingBox:BoundingBox) : Scene {
        const insideMesh:MeshInterface = new Mesh();
        const outsideMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach(function(triangle:TriangleInterface) {
            if ( triangle.v1.isInside(boundingBox) &&
                 triangle.v2.isInside(boundingBox) && 
                 triangle.v3.isInside(boundingBox) ) {
                insideMesh.addTriangle(triangle.clone());
            }
            else {
                outsideMesh.addTriangle(triangle.clone());
            }
        });
        const scene = new Scene();
        scene.addMesh(insideMesh);
        scene.addMesh(outsideMesh);
        return scene;
    }

    static mirror(mesh:MeshInterface, x:boolean, y:boolean, z:boolean) : MeshInterface {
        const mirroredMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            mirroredMesh.addTriangle(new Triangle(
                                            triangle.v1.mirror(x,y,z),
                                            triangle.v2.mirror(x,y,z),
                                            triangle.v3.mirror(x,y,z)).flipNormal()
            );
        });
        return mirroredMesh;
    }


    static translate(mesh:MeshInterface, offset:VertexInterface) : MeshInterface {
        const translatedMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            translatedMesh.addTriangle(new Triangle(
                                            triangle.v1.add(offset),
                                            triangle.v2.add(offset),
                                            triangle.v3.add(offset))
            );
        });
        return translatedMesh;
    }

    static translateFiltered(mesh:MeshInterface, vertexFilter:VertexFilterInterface) : MeshInterface {
        const translatedMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            translatedMesh.addTriangle(new Triangle(
                                       vertexFilter.filter(triangle.v1),
                                       vertexFilter.filter(triangle.v2),
                                       vertexFilter.filter(triangle.v3) ) );
        });
        return translatedMesh;
    }

    static filterVertices(mesh:MeshInterface, vertexFilter:VertexFilterInterface) : MeshInterface {
        const filteredMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            filteredMesh.addTriangle(new Triangle(
                                       vertexFilter.filter(triangle.v1),
                                       vertexFilter.filter(triangle.v2),
                                       vertexFilter.filter(triangle.v3) ) );
        });
        return filteredMesh;
    }

    static scale(mesh:MeshInterface, scale:VertexInterface) : MeshInterface {
        const scaledMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            scaledMesh.addTriangle(new Triangle(
                                            triangle.v1.scale(scale),
                                            triangle.v2.scale(scale),
                                            triangle.v3.scale(scale))
            );
        });
        return scaledMesh;
    }

    static scaleToSize(mesh:MeshInterface, axisName:string, size:number) {
        const extents:MeshExtents = MeshInfo.getExtents(mesh);

        let xScale = 1;
        let yScale = 1;
        let zScale = 1;
    
        let axis:string = axisName;
        axis = axis.toLowerCase();
        if ( axis === 'x' ) {
          xScale = size / (extents.maxx - extents.minx);
          yScale = xScale;
          zScale = xScale;
        }
        else if ( axis === 'y' ) {
          yScale = size / (extents.maxy - extents.miny);
          xScale = yScale;
          zScale = yScale;
        }
        else if ( axis === 'z' ) {
          zScale = size / (extents.maxz - extents.minz);
          xScale = zScale;
          yScale = zScale;
        }
        const scaledMesh:MeshInterface = MeshOperations.scale(mesh, new Vertex(xScale, yScale, zScale));
        return scaledMesh;
    }

    static flipNormals(mesh:MeshInterface) : MeshInterface {
        const flippedMesh:MeshInterface = new Mesh();
        mesh.triangles.forEach( (triangle:TriangleInterface) => {
            flippedMesh.addTriangle(triangle.flipNormal());
        });
        return flippedMesh;
    }

    static replicate(mesh:MeshInterface,
                     xCount:number,
                     xSpacing:number, ySpacing:number,
                     totalCount:number) : MeshInterface {
        // Copy mesh by making new mesh with duplicate triangles
        const combinedMesh:MeshInterface = new Mesh();
        combinedMesh.addMesh(mesh);

        // Figure out spacing and initial placement
        const extents:MeshExtents = MeshInfo.getExtents(mesh);
        let xOffset = (extents.maxx - extents.minx) + xSpacing;
        let yOffset = 0;
        let xIndex = 1;
        // Subtract off the original copy of the mesh fromt he total
        totalCount--;

        // Keep going until we place all the copies
        while (totalCount > 0) {
            const translatedMesh = MeshOperations.translate(mesh, new Vertex(xOffset, yOffset, 0) );
            combinedMesh.addMesh(translatedMesh);

            // Move along X axis
            xOffset += (extents.maxx - extents.minx) + xSpacing;

            // See if we're at the end of an X axis row
            xIndex++;
            if ( xIndex >= xCount ) {
                xOffset = 0;
                yOffset += (extents.maxy - extents.miny) + ySpacing;
                xIndex = 0;
            }
            totalCount--;
        }
        return combinedMesh;
    }

    static addVerticalTriangles(mesh:MeshInterface, edges:Edge[], z:number) {
        edges.forEach( (edge:Edge) => {
            const v1 = edge.v1;
            const v2 = edge.v2;
            const v3 = new Vertex(v1.x, v1.y, z);
            const v4 = new Vertex(v2.x, v2.y, z);
            const triangle1 = new Triangle(v1,v3,v2);
            mesh.addTriangle(triangle1);
            const triangle2 = new Triangle(v2,v3,v4);
            mesh.addTriangle(triangle2);
        });
    }

    static addBaseAndVerticalTriangles(mesh:MeshInterface, extraZHeight:number) {
        const extents:MeshExtents = MeshInfo.getExtents(mesh);
        const minx = extents.minx;
        const maxx = extents.maxx;
        const miny = extents.miny;
        const maxy = extents.maxy;
        const minz = extents.minz-extraZHeight;

        const singleEdges:Edge[] = MeshInfo.getSingleEdges(MeshInfo.getEdges(mesh));
        MeshOperations.addVerticalTriangles(mesh, singleEdges, minz);

        // Add base
        mesh.addTriangle(new Triangle(new Vertex(minx,miny,minz), new Vertex(maxx,maxy,minz), new Vertex(maxx,miny,minz)));
        mesh.addTriangle(new Triangle(new Vertex(minx,miny,minz), new Vertex(minx,maxy,minz), new Vertex(maxx,maxy,minz)));
    }

    static closeHoles(mesh:MeshInterface, edges:Edge[]) : MeshInterface {

        // Check case where there are less than 3 edges
        if ( edges.length < 3 ) {
            return mesh;
        }

        const closedMesh = mesh.clone();

        // // Check simple degeneratecase of 3 edges
        // if ( edges.length == 3 ) {
        //     const triangle = new Triangle(edges[0], edges[1], edges[2]);
        //     closedMesh.addTriangle(triangle);
        //     return closedMesh;
        // }

        // Find center of edges

        return closedMesh;
    }

    static center(mesh:MeshInterface) : MeshInterface {
        const extents:MeshExtents = MeshInfo.getExtents(mesh);
        const xOffset = -1*(extents.maxx-extents.minx)/2;
        const yOffset = -1*(extents.maxy-extents.miny)/2;
        const zOffset = -1*(extents.maxz-extents.minz)/2;
        return this.translate(mesh, new Vertex(xOffset,yOffset,zOffset));
    }
}
