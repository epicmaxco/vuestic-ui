import { Plugin } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { parseJSON5 } from 'confbox'
import { logger } from "../logger";
import { formatString } from "../shared/color";


const include = [
  "node_modules/.vuestic/**/*",
  "node_modules/vuestic-ui/**/*"
]

function fileName(filePath: string): string {
  return path.basename(filePath);
}

function hasInclude(array: string[]): boolean {
  return include.every((item) => {
    return array.includes(item);
  })
}

export const vuesticTsConfig = (): Plugin[] => {
  return [
    {
      name: "vuestic:tsconfig",

      // On vite start save makeTsConfig to node_modules/.vuestic/tsconfig.json

      buildStart: async () => {
        const tsconfigAppPath = path.resolve("tsconfig.app.json");
        const tsconfigGlobalPath = path.resolve("tsconfig.json");

        if (await fs.stat(tsconfigAppPath).catch(() => false)) {
          const tsconfigApp = await fs.readFile(tsconfigAppPath, "utf-8");
          const tsconfigAppJson = parseJSON5<{ include?: string[] }>(tsconfigApp);

          if (!tsconfigAppJson.include) {
            tsconfigAppJson.include = [];
          }

          if (hasInclude(tsconfigAppJson.include)) {
            return
          }

          tsconfigAppJson.include.push(...include);

          await fs.writeFile(tsconfigAppPath, JSON.stringify(tsconfigAppJson, null, 2), "utf-8");

          logger.info(formatString(`tsconfig.app.json found, updated ${fileName(tsconfigAppPath)} with default include.`), { timestamp: true });
        } else if (await fs.stat(tsconfigGlobalPath).catch(() => false)) {
          const tsconfigGlobal = await fs.readFile(tsconfigGlobalPath, "utf-8");
          const tsconfigGlobalJson = parseJSON5<{ include?: string[] }>(tsconfigGlobal);

          if (!tsconfigGlobalJson.include) {
            tsconfigGlobalJson.include = [];
          }

          if (hasInclude(tsconfigGlobalJson.include)) {
            return
          }

          tsconfigGlobalJson.include.push(...include);

          await fs.writeFile(tsconfigGlobalPath, JSON.stringify(tsconfigGlobalJson, null, 2), "utf-8");

          logger.info(formatString(`tsconfig.app.json found, updated ${fileName(tsconfigGlobalPath)} with default include.`), { timestamp: true });
        } else {
          await fs.mkdir(path.dirname(tsconfigGlobalPath), { recursive: true });
          await fs.writeFile(tsconfigGlobalPath, JSON.stringify({
            "include": [...include]
          }, null, 2), "utf-8");

          logger.warn(formatString(`!!! No tsconfig.app.json or tsconfig.json found. Created ${fileName(tsconfigGlobalPath)} with default include.`), { timestamp: true });
        }
      }
    },
  ];
}
