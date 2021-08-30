# mesh-process

## Purpose
STL file reader/writer and mesh processing library

## Building

yarn build

## Syntax
```
$ node meshtool 
meshtool <command>

Commands:
  meshtool about                            Print information about MeshTool

  meshtool center [location] [infile]       Center the specified STL file
  [outfile]

  meshtool concat [infile1] [infile2]       Add two meshes into one file
  [outfile]

  meshtool crop [location] [minx] [miny]    Crop the specified STL file
  [minz] [maxx] [maxy] [maxz] [infile]
  [outfile]

  meshtool drop-to [location] [infile]      Drop the specified STL file to zero
  [outfile]                                 on the specified axes.

  meshtool mirror [location] [infile]       Mirror the specified STL file on the
  [outfile]                                 specified axis

  meshtool normals [operation] [infile]     Modify the normals of the specified
  [outfile]                                 STL file

  meshtool replicate [xCount] [xSpacing]    Replicate the specified STL file in
  [ySpacing] [totalCount] [infile]          a grid
  [outfile]

  meshtool scale-to-size [axis] [size]      Scale the specified STL file to
  [infile] [outfile]                        [size] along the [axis]
  
  meshtool scale [x] [y] [z] [infile]       Scale the specified STL file
  [outfile]

  meshtool stats [file]                     Print info about the specified STL
                                            file
  meshtool translate-above [xThreshold]     Translate the vertices in the
  [yThreshold] [zThreshold] [x] [y] [z]     specified STL file above xThreshhold
  [infile] [outfile]

  meshtool translate [x] [y] [z] [infile]   Translate the specified STL file
  [outfile]
  
Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## Examples

Get statistics for the sample Cube.stl:
```
node meshtool stats ../Samples/Cube.stl
```

Translate Cube.stl by x+=10, y+=10, z+=10 and save in xCube101010.stl
```
node meshtool translate 10 10 10 ../Samples/Cube.stl ../Samples/xCube101010.stl
```



