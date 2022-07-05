# JSON builder

## Description

JSON builder should collect events, methods, props and slots names from all Vuestic UI components and put them into structured json file.

## Current implementation problems

It takes data not from components, but from docs api. This means that something not described in docs won't get into json builder result. 
Also, we don't need to build this script via rollup - we just can execute it via tsx while common build and put to the destination directory a json, not executable js file.

## Next implementation steps

1. Update importer.ts file - fix routes, check components list completeness.
2. Make script from json.ts to take data not from docs api, but directly from components.
3. Add tsx json.ts to the yarn build command.