#!/usr/bin/env bash

echo Covered commands : `grep "node meshtool" test_cmds.sh | grep -v grep | awk '{print $3}' | sort | uniq | wc -l`
grep "node meshtool" test_cmds.sh | grep -v grep | awk '{print $3}' | sort | uniq
echo

cd src

echo Testing: about
node meshtool about

echo Testing: center
node meshtool center xyz ../samples/Cube.stl ../samples/testout_cube_center_xyz.stl
node meshtool center x ../samples/Cube.stl ../samples/testout_cube_center_x.stl
node meshtool center y ../samples/Cube.stl ../samples/testout_cube_center_y.stl
node meshtool center z ../samples/Cube.stl ../samples/testout_cube_center_z.stl
node meshtool center xy ../samples/Cube.stl ../samples/testout_cube_center_xy.stl
node meshtool center xz ../samples/Cube.stl ../samples/testout_cube_center_xz.stl
node meshtool center yz ../samples/Cube.stl ../samples/testout_cube_center_yz.stl

echo Testing: concat
node meshtool translate 100 100 100 ../samples/Cube.stl ../samples/testout_cube_concat_temp.stl
node meshtool concat ../samples/Cube.stl ../samples/testout_cube_concat_temp.stl ../samples/testout_cube_concat.stl

echo Testing: crop
node meshtool crop inside 0 0 0 40 40 40 ../samples/testout_cube_concat.stl ../samples/testout_cube_crop_inside.stl
node meshtool crop outside 0 0 0 40 40 40 ../samples/testout_cube_concat.stl ../samples/testout_cube_crop_outside.stl

echo Testing: drop-to
node meshtool drop-to xyz ../samples/Cube.stl ../samples/testout_cube_drop_to_xyz.stl
node meshtool drop-to x ../samples/Cube.stl ../samples/testout_cube_drop_to_x.stl
node meshtool drop-to y ../samples/Cube.stl ../samples/testout_cube_drop_to_y.stl
node meshtool drop-to z ../samples/Cube.stl ../samples/testout_cube_drop_to_z.stl
# Could do more tests for xy, yz, xz

echo Testing: filter-vertex-replace
node meshtool filter-vertext-replace 0 0 0 5 6 7 ../samples/Cube.stl ../samples/testout_cube_filter_vertex_replace.stl

echo Testing: mirror
node meshtool mirror x ../samples/Cube.stl ../samples/testout_cube_mirror_x.stl
node meshtool mirror y ../samples/Cube.stl ../samples/testout_cube_mirror_y.stl
node meshtool mirror z ../samples/Cube.stl ../samples/testout_cube_mirror_z.stl
# Could do more tests for location

echo Testing: normals
node meshtool normals flip ../samples/Cube.stl ../samples/testout_cube_replicate.stl

echo Testing: replicate
node meshtool replicate 5 10 10 7  ../samples/Cube.stl ../samples/testout_cube_replicate.stl

echo Testing: rotate
node meshtool rotate 0 0 45  ../samples/Cube.stl ../samples/testout_cube_scaled.stl

echo Testing: scale-to-size
node meshtool scale-to-size x 300  ../samples/Cube.stl ../samples/testout_cube_scale_to_size_x.stl
node meshtool scale-to-size y 300  ../samples/Cube.stl ../samples/testout_cube_scale_to_size_y.stl
node meshtool scale-to-size z 300  ../samples/Cube.stl ../samples/testout_cube_scale_to_size_z.stl

echo Testing: scale
node meshtool scale 2 2 3  ../samples/Cube.stl ../samples/testout_cube_scaled.stl

echo Testing: stats
node meshtool stats  ../samples/Cube.stl

echo Testing: translate-above
node meshtool translate-above 5 20 20 20 0 0 ../samples/Cube.stl ../samples/testout_cube_translate_above_x.stl

echo Testing: translate
node meshtool translate 20 30 40 ../samples/Cube.stl ../samples/testout_cube_translate.stl

