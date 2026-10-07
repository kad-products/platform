## [1.20.0](https://github.com/kad-products/platform/compare/v1.19.3...v1.20.0) (2026-10-07)

### Features

* add a way for CI tests to be captured ([208cb7e](https://github.com/kad-products/platform/commit/208cb7e3dd312527d576c312aa7c7748b83d8bd6))

## [1.19.3](https://github.com/kad-products/platform/compare/v1.19.2...v1.19.3) (2026-10-06)

### Bug Fixes

* **deps:** update dependency @octokit/rest to v22 ([5e94a04](https://github.com/kad-products/platform/commit/5e94a04ccc4e8ea88c20208fcd2773ae703a3c75))

## [1.19.2](https://github.com/kad-products/platform/compare/v1.19.1...v1.19.2) (2026-10-06)

### Bug Fixes

* give our cf token read perms on d1 for migration purposes ([f033e93](https://github.com/kad-products/platform/commit/f033e932f4b0fb94d2c398b38eb447517b015635))

## [1.19.1](https://github.com/kad-products/platform/compare/v1.19.0...v1.19.1) (2026-10-06)

### Bug Fixes

* disable review requirements for now ([e2ed9db](https://github.com/kad-products/platform/commit/e2ed9db1d9dc24ff86f68188df5cb6f8bc264aa7))

## [1.19.0](https://github.com/kad-products/platform/compare/v1.18.0...v1.19.0) (2026-10-06)

### Features

* increase rules and boundaries on the default branch ([fa7e7b3](https://github.com/kad-products/platform/commit/fa7e7b3076892620db330fc321473c12d0fa3958))

### Bug Fixes

* have this repo use the repo module via local pathing ([c8c5263](https://github.com/kad-products/platform/commit/c8c5263fe52c5dc485c8fb0b52a0ec7fe46455e5))

## [1.18.0](https://github.com/kad-products/platform/compare/v1.17.0...v1.18.0) (2026-10-06)

### Features

* add more perms to allow the cf token to actually deploy things ([3213841](https://github.com/kad-products/platform/commit/321384191256e0648e73510f0bda9108a7d50aa9))

## [1.17.0](https://github.com/kad-products/platform/compare/v1.16.3...v1.17.0) (2026-10-06)

### Features

* add cli pr-checks command ([fcc94a9](https://github.com/kad-products/platform/commit/fcc94a9b146ca5399942a6af137b0c1a0dd565c0))

### Bug Fixes

* include cli package.json bump in release ([106e9f6](https://github.com/kad-products/platform/commit/106e9f6cd87fc9a70d314daf72e2e88c211e4c33))
* standardize shared workflows to not have job names ([8aee8fe](https://github.com/kad-products/platform/commit/8aee8fe6b7bc7068cf70059fb785b3c334c84e6a))

## [1.16.3](https://github.com/kad-products/platform/compare/v1.16.2...v1.16.3) (2026-10-06)

### Bug Fixes

* use latest tag for gh repo module ([dcab1d2](https://github.com/kad-products/platform/commit/dcab1d280372e5c9e9682bd3a8731bbe833beaf5))

## [1.16.2](https://github.com/kad-products/platform/compare/v1.16.1...v1.16.2) (2026-10-06)

### Bug Fixes

* align secrets to usage patterns ([28c4e65](https://github.com/kad-products/platform/commit/28c4e6530bfa10a835150785da67df2540734264))
* use latest repo module ([21d7bce](https://github.com/kad-products/platform/commit/21d7bce7fb63ac3744bccf69153262487279d73f))

## [1.16.1](https://github.com/kad-products/platform/compare/v1.16.0...v1.16.1) (2026-10-06)

### Bug Fixes

* align cf token name to variable name ([6af92c1](https://github.com/kad-products/platform/commit/6af92c1b653128e6c6b48bcab2c18c41dd76222b))

## [1.16.0](https://github.com/kad-products/platform/compare/v1.15.5...v1.16.0) (2026-10-06)

### Features

* automate initial pre-tofu resources ([7d281ba](https://github.com/kad-products/platform/commit/7d281baf3f92972986cb881f455a253a752b8bd3))

### Bug Fixes

* ignore and remove dist of cli ([3282413](https://github.com/kad-products/platform/commit/3282413f501578261e23516d3e55702c345885d4))

### Code Refactoring

* align to new secret naming system ([9d79ad6](https://github.com/kad-products/platform/commit/9d79ad64cc297334c04d24f70ad563f257aee660))

## [1.15.5](https://github.com/kad-products/platform/compare/v1.15.4...v1.15.5) (2026-10-01)

### Bug Fixes

* deploy settings for ci and gh pkgs ([680be7d](https://github.com/kad-products/platform/commit/680be7dc179c9c092dc6d35a3fc60c1266c7928c))

## [1.15.4](https://github.com/kad-products/platform/compare/v1.15.3...v1.15.4) (2026-10-01)

### Bug Fixes

* integration has no reviews, not staging ([3e74f4d](https://github.com/kad-products/platform/commit/3e74f4de636a5bbff35f8838511180472e7b8ff1))

## [1.15.3](https://github.com/kad-products/platform/compare/v1.15.2...v1.15.3) (2026-10-01)

### Bug Fixes

* give deploy jobs perms to read packages ([157fca3](https://github.com/kad-products/platform/commit/157fca31147ad91a16b133bcd049655c5dbb9020))

## [1.15.2](https://github.com/kad-products/platform/compare/v1.15.1...v1.15.2) (2026-10-01)

### Bug Fixes

* staging needs no reviewers ([3822aae](https://github.com/kad-products/platform/commit/3822aae7964783a909abf0441d3b15485646e9d5))

## [1.15.1](https://github.com/kad-products/platform/compare/v1.15.0...v1.15.1) (2026-10-01)

### Bug Fixes

* only adam as reviewer for lower environments ([55896f6](https://github.com/kad-products/platform/commit/55896f630389a3a32f387074ba4cdd0bc2770ca1))

## [1.15.0](https://github.com/kad-products/platform/compare/v1.14.1...v1.15.0) (2026-09-30)

### Features

* give repo access to the workflow secret ([33b9e35](https://github.com/kad-products/platform/commit/33b9e357c771847caf23fe3662a9242b98bbf814))

## [1.14.1](https://github.com/kad-products/platform/compare/v1.14.0...v1.14.1) (2026-09-29)

### Bug Fixes

* import github and provide repo name var ([efb32b3](https://github.com/kad-products/platform/commit/efb32b386b3ec0b9a7f5ac9975d6b0a25f3d8538))

## [1.14.0](https://github.com/kad-products/platform/compare/v1.13.1...v1.14.0) (2026-09-29)

### Features

* add github repo config tf ([1b41453](https://github.com/kad-products/platform/commit/1b41453dcdbcb80b89f38df5f5d76325da27918d))

### Bug Fixes

* clearer plan comments in PR ([c747a29](https://github.com/kad-products/platform/commit/c747a29874cd5a640af988cdc0e1b4615fb3e6c2))
* i like checkmarks ([51364bd](https://github.com/kad-products/platform/commit/51364bdbffc3105fb02db29dd742136c759f55dd))
* include state type in PR comments ([ff09b6d](https://github.com/kad-products/platform/commit/ff09b6d1636c720e108d2c7d41aa35e8d90a8bbe))
* plan comment for success and no changes ([c09a4da](https://github.com/kad-products/platform/commit/c09a4da13dec1db2af5fde1e276dea4dd63705d1))

## [1.13.1](https://github.com/kad-products/platform/compare/v1.13.0...v1.13.1) (2026-09-29)

### Bug Fixes

* better tofu plan summary ([c321bc8](https://github.com/kad-products/platform/commit/c321bc81efe7f76e70ab6c07d2ca5310260af503))

## [1.13.0](https://github.com/kad-products/platform/compare/v1.12.2...v1.13.0) (2026-09-29)

### Features

* enable publishing of cli package ([52c6443](https://github.com/kad-products/platform/commit/52c64439bc05032496bbec2e83606b81f7792edd))

### Bug Fixes

* clean up renovate packageRules ([462ed65](https://github.com/kad-products/platform/commit/462ed655b87c0842308fec152e9a5fb247c70e47))
* workflow inputs should always be kebab case ([2d92170](https://github.com/kad-products/platform/commit/2d92170893917d7e9fa01c493253b660e342cd43))

## [1.12.2](https://github.com/kad-products/platform/compare/v1.12.1...v1.12.2) (2026-09-29)

### Bug Fixes

* provide means to authenticate to private registry ([f710c38](https://github.com/kad-products/platform/commit/f710c3870c355ac8ab5cc428914cb953fb3d9237))

## [1.12.1](https://github.com/kad-products/platform/compare/v1.12.0...v1.12.1) (2026-09-29)

### Bug Fixes

* renovate config properly group biome changes ([982f49f](https://github.com/kad-products/platform/commit/982f49f99fa1e365838acb1b58032b67e41d52fd))

## [1.12.0](https://github.com/kad-products/platform/compare/v1.11.0...v1.12.0) (2026-09-29)

### Features

* include upgrade deps workflow ([6ba5306](https://github.com/kad-products/platform/commit/6ba5306533f990760a63fe584aeef972a4bef458))
* initial build of a kad cli ([48a9a36](https://github.com/kad-products/platform/commit/48a9a3651d3efa9e62997087d75b829db6e264f8))

### Bug Fixes

* better resource name for deployment policies ([6b602b0](https://github.com/kad-products/platform/commit/6b602b0cdbfca43ccc003e7fc74379c32d77a123))

## [1.11.0](https://github.com/kad-products/platform/compare/v1.10.1...v1.11.0) (2026-09-28)

### Features

* initial renovate config ([c6bc8c2](https://github.com/kad-products/platform/commit/c6bc8c23b40be727c8e01146780bfc055e02df05))

## [1.10.1](https://github.com/kad-products/platform/compare/v1.10.0...v1.10.1) (2026-09-27)

### Bug Fixes

* tofu plan shouldn't bother having color ([79cd670](https://github.com/kad-products/platform/commit/79cd6709d6de97feec5a733e7e12b48869076a3d))

## [1.10.0](https://github.com/kad-products/platform/compare/v1.9.0...v1.10.0) (2026-09-27)

### Features

* include automation PAT in tofu workflows ([5f8023d](https://github.com/kad-products/platform/commit/5f8023d49e9a3e3fdb1b6577be00b9e7dbeebb10))

## [1.9.0](https://github.com/kad-products/platform/compare/v1.8.1...v1.9.0) (2026-09-27)

### Features

* provide clear and useful workflow step names ([164adea](https://github.com/kad-products/platform/commit/164adeab69478e733d7e7041b63f77501c399ea4))

### Bug Fixes

* no input for tofu workflows ([db18109](https://github.com/kad-products/platform/commit/db181093150a68225d630fe3528a113621cd746b))

## [1.8.1](https://github.com/kad-products/platform/compare/v1.8.0...v1.8.1) (2026-09-27)

### Bug Fixes

* can't use template files from calling repo workflows ([cb4c8b4](https://github.com/kad-products/platform/commit/cb4c8b42914b3d79c6be9ed7cd65e81274fa9a88))

## [1.8.0](https://github.com/kad-products/platform/compare/v1.7.0...v1.8.0) (2026-09-27)

### Features

* adding a tf plan workflow and related docs ([d0a83b2](https://github.com/kad-products/platform/commit/d0a83b239dd11214fb3dffc224c342343016cb28))

## [1.7.0](https://github.com/kad-products/platform/compare/v1.6.1...v1.7.0) (2026-09-27)

### Features

* add state_type to the tf state key paths ([aca3dc5](https://github.com/kad-products/platform/commit/aca3dc56630d0cafb219c6df88950e10635537ed))

### Bug Fixes

* better path for product homepage ([4ddc1e3](https://github.com/kad-products/platform/commit/4ddc1e3ccb1a1e465cca97a3dca5aac833a8f987))

## [1.6.1](https://github.com/kad-products/platform/compare/v1.6.0...v1.6.1) (2026-09-26)

### Bug Fixes

* clean up tofu test workflow and related docs ([10bb13d](https://github.com/kad-products/platform/commit/10bb13dc951c0300a58088b3e82f532bd715ee47))
* move tf modules to better directory names ([7bff794](https://github.com/kad-products/platform/commit/7bff7940b6971a22522d8527a139a2d79c850de3))

## [1.6.0](https://github.com/kad-products/platform/compare/v1.5.0...v1.6.0) (2026-09-26)

### Features

* add initial apply tofu shared workflow ([d417ad3](https://github.com/kad-products/platform/commit/d417ad3cc6b5d6bacb25882df08d549776adf698))

## [1.5.0](https://github.com/kad-products/platform/compare/v1.4.0...v1.5.0) (2026-09-26)

### Features

* add state-storage locally run TF for solving chicken/egg problem ([c22765d](https://github.com/kad-products/platform/commit/c22765dbf475c568813103a0a7667faa71995401))

## [1.4.0](https://github.com/kad-products/platform/compare/v1.3.0...v1.4.0) (2026-09-23)

### Features

* initial opentofu modules ([d5932d7](https://github.com/kad-products/platform/commit/d5932d7dda8d97478e8235860f47e3d5b99a6e10))

### Bug Fixes

* get tests passing for tofu modules ([5cac183](https://github.com/kad-products/platform/commit/5cac1831054e82d7056a3af547a74228a2ff225b))
* repo name as input for env module ([14b7dff](https://github.com/kad-products/platform/commit/14b7dff614344cde8fd0afa44ce5cd9ada9c8cb3))

## [1.3.0](https://github.com/kad-products/platform/compare/v1.2.2...v1.3.0) (2026-09-22)

### Features

* add workflow for deploying to cloudflare ([ad39a28](https://github.com/kad-products/platform/commit/ad39a281802d1ee92af11f01a8c1c83fda55f44f))

## [1.2.2](https://github.com/kad-products/platform/compare/v1.2.1...v1.2.2) (2026-09-22)

### Bug Fixes

* callers control the ceiling perms on ci tokens ([6890f41](https://github.com/kad-products/platform/commit/6890f415ff3afe4448e88472097a6f80decd69cc))
* workflows request enough perms to pull private pkg ([be1fc63](https://github.com/kad-products/platform/commit/be1fc63d538233f06765f475995616cddbc150f4))

## [1.2.1](https://github.com/kad-products/platform/compare/v1.2.0...v1.2.1) (2026-09-22)

### Bug Fixes

* pass a node token to the setup action ([4e96596](https://github.com/kad-products/platform/commit/4e965965cc718ef2a78dd011dbaa0c8d381c4a55))

## [1.2.0](https://github.com/kad-products/platform/compare/v1.1.1...v1.2.0) (2026-09-22)

### Features

* point node setup at github pkg registry for design system ([b453f38](https://github.com/kad-products/platform/commit/b453f38a64a834a059bbb353d7e0824b4dcfbab5))

## [1.1.1](https://github.com/kad-products/platform/compare/v1.1.0...v1.1.1) (2026-09-22)

### Bug Fixes

* docs for local npmrc ([b29c808](https://github.com/kad-products/platform/commit/b29c808a95d066de3b5ca790e5b8faace12dccdd))

## [1.1.0](https://github.com/kad-products/platform/compare/v1.0.0...v1.1.0) (2026-09-21)

### Features

* docs for github packages in other projects ([16b1b73](https://github.com/kad-products/platform/commit/16b1b73618768ec26f712f00baa287ee1be5d87f))

## 1.0.0 (2026-09-21)

### Features

* add semantic release workflows ([01824c1](https://github.com/kad-products/platform/commit/01824c1ee496e8eb30327b2b0d412d30d197bd0e))
* adding pnpm docs starting stuff ([18a104a](https://github.com/kad-products/platform/commit/18a104ac183c7cd0f78890cb31b11055a784a9a1))
* first release of commitlint workflow ([c81f1a7](https://github.com/kad-products/platform/commit/c81f1a744c88f19f4cb5728ebce7e0fc161024cf))
* make this into a pnpm project and add baseline config ([5ab50a6](https://github.com/kad-products/platform/commit/5ab50a6c7d0ec5ca1583bd24dc14a852d9bb5b1e))
* use latest semantic-release mechanics ([9d15180](https://github.com/kad-products/platform/commit/9d1518070652911e1fb5eb8f07cedd6ef294d435))
* verify changes workflows ([a8ea681](https://github.com/kad-products/platform/commit/a8ea681f51dfaaf869158aba3ec84b50480e35c5))

### Bug Fixes

* adding output for dry run debugging ([680de11](https://github.com/kad-products/platform/commit/680de11c808bc40d2a815d88498881de2a0872be))
* align workflows to naming convention ([57c97c0](https://github.com/kad-products/platform/commit/57c97c03d5e730cc53e64b5b36e302be8ad65743))
* don't provide specific branch to semantic release ([84fb839](https://github.com/kad-products/platform/commit/84fb83944db3fcf6fc715fe8ad1ec782d069ca3c))
* fetch more history for commitlint ([c1dc44e](https://github.com/kad-products/platform/commit/c1dc44e96c0944923c029a7d1aa02c232fd04929))
* flip package script names in verify changes workflows ([906e8c2](https://github.com/kad-products/platform/commit/906e8c28b7c3c450b203febe49b62af4e486fb2b))
* install pnpm before node ([5ca262e](https://github.com/kad-products/platform/commit/5ca262e5e7143adc4b2ecb11ff8a190af82dc929))
* more tweaks to semantic release dry run ([b5e89d7](https://github.com/kad-products/platform/commit/b5e89d7fea120f0dd5eb46ad63f13c5eabab2e7a))
* remove old commitlint workflow ([f6c59bd](https://github.com/kad-products/platform/commit/f6c59bd0e395845a543c4c53b6e42a85668201ae))
* try another approach for semantic release dry run ([4d95a90](https://github.com/kad-products/platform/commit/4d95a90f42ad3c9cac4970676c376b584e4f6bae))
* trying a different action for semantic release dry run ([09f44da](https://github.com/kad-products/platform/commit/09f44daa088717d9e1c9a80c2561f05a1f548a5f))
* use new convention for pkg scripts ([3a8a4cc](https://github.com/kad-products/platform/commit/3a8a4ccf8f895edf73de2963c0ad6b1ced4e8cda))
