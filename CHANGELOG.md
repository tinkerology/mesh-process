# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/tinkerology/mesh-process/compare/v2.0.0...v3.0.0) (2022-02-16)


### ⚠ BREAKING CHANGES

* remove sortEdges

### Bug Fixes

* Fixed sort issues ([a6b13cb](https://github.com/tinkerology/mesh-process/commit/a6b13cb70cd6f5c0b68d684d7e69893aebffa04b))


* remove sortEdges ([314964e](https://github.com/tinkerology/mesh-process/commit/314964ef81047193fa3a819e58923dcb65ce9c04))

## [2.0.0](https://github.com/tinkerology/mesh-process/compare/v1.3.0...v2.0.0) (2022-02-11)


### ⚠ BREAKING CHANGES

* Remove STLFileInterface

### Features

* Add addAllConnected, sort, toVertices ([ee41248](https://github.com/tinkerology/mesh-process/commit/ee41248794da1d34a50905b94173dae9d2e3c699))
* Add clone() function. ([7b3509b](https://github.com/tinkerology/mesh-process/commit/7b3509ba2f474cf0780a88f5ae4634bc826d65e2))
* Add EdgeSet to manipulate and track sets of Edges. ([408d6e7](https://github.com/tinkerology/mesh-process/commit/408d6e70b8431567eeb21e2566872ff0ddfcd458))
* Add EdgeSet to track and manipulate sets of Edges ([3dd9aaa](https://github.com/tinkerology/mesh-process/commit/3dd9aaa0b11bcc657397fd554bf138a5a09c3743))
* Add MeshLoader to eventually cover non-STL files ([3af3871](https://github.com/tinkerology/mesh-process/commit/3af3871a1d57b1ad558e23aa50b56103351429ae))
* Add removeTriangles, closeHoles ([e19c497](https://github.com/tinkerology/mesh-process/commit/e19c49738c8feb433b9a0ee96f63b1875abd8383))
* Add rotate command line option to meshtool ([5ba7505](https://github.com/tinkerology/mesh-process/commit/5ba75057b3435458e47c5b372fd7c23f42598110))
* Add saveMesh ([2ed5538](https://github.com/tinkerology/mesh-process/commit/2ed55384556657a8cebf50b413bc65d9608f7a26))
* Add singleEdgeCount to stats. ([658be84](https://github.com/tinkerology/mesh-process/commit/658be84c6d5102614fb916c1aa87c864d8cec93f))
* Added multiply ([12b60a4](https://github.com/tinkerology/mesh-process/commit/12b60a449583eb856771b920edf455ea972b6bae))
* Added rotate and round ([acba721](https://github.com/tinkerology/mesh-process/commit/acba721879d92663add435192e8a76c6651c5439))
* Added rotate mesh ([08df64a](https://github.com/tinkerology/mesh-process/commit/08df64a3845dacb9216e4d523fc4cef7747a5cc6))
* Added sortEdges to sort an array of edges by matching vertices. ([8353831](https://github.com/tinkerology/mesh-process/commit/8353831784974a53cff80e8b103b5e6f3e7842a7))
* Doc for new command line commands filter-vertex-replace, rotate ([106ab0d](https://github.com/tinkerology/mesh-process/commit/106ab0d69d33647c25818a2f52dcc8705f3d45a0))
* internal utility methods ([3326a53](https://github.com/tinkerology/mesh-process/commit/3326a53e8520538f034b39bc2997e250cce96c4f))
* Swtich to use MeshLoader to support more file types ([bc2384d](https://github.com/tinkerology/mesh-process/commit/bc2384d9c5291a399383fddf1c23212e704d9596))


### Bug Fixes

* Change isConnected to return false for the same Edge ([3f6a4da](https://github.com/tinkerology/mesh-process/commit/3f6a4dad0d4750e973682823a8231fcf3d1f8872))
* Convert caught errors to Error for strict typing ([aeed4f3](https://github.com/tinkerology/mesh-process/commit/aeed4f3fb8079e8b4b7bb55cfe527cc38cdafcd8))
* eslint errors ([0ec94d4](https://github.com/tinkerology/mesh-process/commit/0ec94d45f1d14289368cdc5629ebeb12007a6115))
* eslint errors ([6631761](https://github.com/tinkerology/mesh-process/commit/66317619ea87ca3924309089d2ff0d67cbc1595b))
* eslint errors ([e18a832](https://github.com/tinkerology/mesh-process/commit/e18a832be8ccad36ee3f84a4df88a406a196de3c))
* eslint errors ([cb47093](https://github.com/tinkerology/mesh-process/commit/cb47093504975e5150eee39287b969a896a4de4a))
* eslint issues ([1809cdb](https://github.com/tinkerology/mesh-process/commit/1809cdb93173ae74d6055a25e20f678b3f452e8e))
* lint errors ([e14367d](https://github.com/tinkerology/mesh-process/commit/e14367ddc000bad97ca847640c10bcde9d51c620))
* lint errors ([9df624d](https://github.com/tinkerology/mesh-process/commit/9df624d683e62f39f60a3b22dfcafb00f4cbfcd0))
* lint errors ([2f80610](https://github.com/tinkerology/mesh-process/commit/2f80610b3d780b001444c729abffda9e6138d7c9))
* nyc AVA compile turned off ([40eb3ce](https://github.com/tinkerology/mesh-process/commit/40eb3ce07b0fac8cd55632d47dff4d4c99c56b7f))
* prettier changes ([42d333e](https://github.com/tinkerology/mesh-process/commit/42d333e73132a0509886c6a57caf709001f82332))
* Remove console.log ([97b1fbd](https://github.com/tinkerology/mesh-process/commit/97b1fbdc826f83ba3c48434911c400c728addbae))
* remove nyc due to jest test failure ([9c76527](https://github.com/tinkerology/mesh-process/commit/9c765274e6237c103b67d829998b91ad739bcd4d))
* Remove spell check ([1ab550d](https://github.com/tinkerology/mesh-process/commit/1ab550dd7ad7ecd969c46bd5b0fcbb83770f1c4e))
* remove unneeded coverage check ([ccb02e5](https://github.com/tinkerology/mesh-process/commit/ccb02e5b3f3d024f698d31cc21962cb2ce4ea6bc))
* typedoc options ([6bf32b8](https://github.com/tinkerology/mesh-process/commit/6bf32b84653a686d41e8172a4beae842cae1c081))


### refector

* Remove STLFileInterface ([643f6d2](https://github.com/tinkerology/mesh-process/commit/643f6d2c0eb6654302dfdecbe2d31e8ed1818878))

## [1.3.0](https://github.com/tinkerology/mesh-process/compare/v1.2.1...v1.3.0) (2021-10-11)


### Features

* Added buildCircle ([644cb90](https://github.com/tinkerology/mesh-process/commit/644cb901c09b51ca58a37e787b195cd136a6b36c))


### Bug Fixes

* flip normals on mirror operations ([4c85f12](https://github.com/tinkerology/mesh-process/commit/4c85f126209cb8515547e074803686ba0d745fe9))

### 1.2.1 (2021-10-05)
