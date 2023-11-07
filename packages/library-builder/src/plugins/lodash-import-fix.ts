import { Plugin } from 'rollup';

/** 
 *
  Replace imports statment for better Tree Shaking

  From:
  ```
  import {  isObject, capitalize } from 'lodash'
  ```

  To:
  ```
  import isObject from 'lodash/isObject.js'
  import capitalize from 'lodash/capitalize.js'
  ```
*/
const lodashPlugin: Plugin = {
  name: 'lodash-import-fix-plugin',
  transform(code, id) {
    if (id.endsWith('.ts') || id.endsWith('.js')) {
      const lodashImportRegex = /\bimport\s+\{\s*([^}]+)\s*\}\s+from\s+['"]lodash['"]/g;
      let transformedCode = code;
      let match;
      while ((match = lodashImportRegex.exec(code)) !== null) {
        const lodashImports = match[1]
          .replace(/\n/gm, '')
          .split(',')
          .map((importSpecifier) => importSpecifier.trim())
          .filter(Boolean);

        let imports = ""
        lodashImports.forEach((importSpecifier) => {
          const [originalName, alliasName=originalName] = importSpecifier.split(' as ');

          imports += `import ${alliasName} from 'lodash/${originalName.trim()}.js';\n`
        });
        transformedCode = transformedCode.replace(
          match![0],
          imports
        );
      }
      return {
        code: transformedCode,
        map: null,
      };
    }
    return null;
  },
};

export default lodashPlugin;