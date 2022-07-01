# Release script

This document is about `release` script.

The script is meant to automate release procedure. So far it doesn't cover full release flow, but gets rid of some tedious procedures.

Here's what script does:

* perform checks if we can release (no uncommitted changes, correct branch);
* update version strings in files;
* add and push commit and tag;
* build vuestic-ui;
* publish vuestic-ui to npm.

There are a couple of cli arguments you can pass to script to modify its behaviour:

```sh
npx tsx build/release-script.ts

  # release type (required) - large | tiny | development | experimental
  --release-type=experimental

  # for testing - doesn't push changes anywhere and performs a cleanup
  --dry-run 
```

### Repo root commands
You have the following commands from repo root to simplify script usage:
> **Note**
> Run this commands with npm instead of yarn to prevent auth issues
```bash
npm run release:large
npm run release:tiny
npm run release:next
npm run release:experimental
```

### Release types

|                     | **large** | **tiny** |            **next**            |            **experimental**            |
|---------------------|:-----------:|:----------:|:------------------------------:|:--------------------------------------:|
| **git tag**         |      +      |     +      |               -                |                   -                    |
| **dist tag**        |  `latest`   |  `latest`  |             `next`             |             `experimental`             |
| **dist version**    |   `1.2.0`   |  `1.2.1`   | `1.2.1-next-de4db33f-20220608` | `0.0.0-experimental-de4db33f-20220608` |
| **commits version** |      +      |     +      |               -                |                   -                    |
| **branch**          |  `master`   | `develop`  |           `develop`            |                  any                   |

* **large** - large release - we should advertize it and include fancy features;
* **tiny** - once-in-a-week release, includes all current features;
* **next** - release for each commit in `develop` branch;
* **exprimental** - release for developer to showcase the build.

### Further development

Let's keep this script well documented and smooth to use. We want painless releases.
