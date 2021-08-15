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
  
  meshtool crop [location] [infile]         Crop the specified STL file
  [outfile] [minx] [miny] [minz] [maxx]
  [maxy] [maxz]
  
  meshtool drop-to [location] [infile]      Drop the specified STL file to zero
  [outfile]                                 on the specified axes.
  
  meshtool normals [operation] [infile]     Modify the normals of the specified
  [outfile]                                 STL file
  
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

# H1 Examples

```
node meshtool stats ../Samples/Cube.stl
```
