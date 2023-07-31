// Copy of @nuxt/module-builder with some modifications

import { promises, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { join, resolve } from 'pathe';
import consola from 'consola';
import { findExports } from 'mlly';
import { replaceNext } from '../plugins/replace-next';

async function buildModule(opts: {
  cwd: string,
  rootDir: string,
  externals?: string[],
  paths?: Record<string, string[]>,
  outDir?: string,
}) {
  const { build } = await import('unbuild');
  const outDir = opts.outDir || "dist";
  const { externals = [], paths = {} } = opts

  return build(opts.cwd, false, {
    failOnWarn: false, // Disable process.exit(1) on warnings
    declaration: true,
    stub: false,
    outDir,
    entries: [
      join(opts.rootDir, "module"),
      // Runtime handled by vite in ./runtime-builder.ts
      // { input: "runtime/**/*", outDir: `${outDir}/runtime`, builder: "rollup" },
    ],
    rollup: {
      emitCJS: false,
      cjsBridge: true,
      dts: {
        tsconfig: join(opts.cwd, "tsconfig.json"),
        compilerOptions: {
          moduleResolution: 2,
          paths: paths,
          skipLibCheck: true,
          strict: false,
          skipDefaultLibCheck: true,
          rootDir: '',
          emitDeclarationOnly: true,
        },
      },
    },
    externals: [
      "@nuxt/schema",
      "@nuxt/schema-edge",
      "@nuxt/kit",
      "@nuxt/kit-edge",
      "nuxt",
      "nuxt-edge",
      "nuxt3",
      "vue",
      "vue-demi",
      ...externals,
    ],
    hooks: {
      "rollup:options"(_ctx, options) {
        const plugin = replaceNext

        if (options.plugins === undefined) {
          options.plugins = [plugin];
        } else if (Array.isArray(options.plugins)) {
          options.plugins.unshift(plugin);
        } else {
          options.plugins = [plugin, options.plugins];
        }

        options.external = (source, importer, isResolved) => {
          // Resolve '#app' imports
          if (source.startsWith('#')) {
            return true
          }

          if (source.includes('node_modules')) {
            return true
          }

          if (source.startsWith('/') || source.startsWith('.')) {
            return false
          }
          return true
        }
      },
      async "rollup:done"(ctx) {
        await writeCJSStub(ctx.options.outDir);
        const moduleEntryPath = resolve(ctx.options.outDir, "module.mjs");
        const moduleFn = await import(pathToFileURL(moduleEntryPath).toString()).then((r) => r.default || r).catch((err) => {
          consola.error(err);
          consola.error("Cannot load module. Please check dist:", moduleEntryPath);
          return null;
        });
        if (!moduleFn) {
          return;
        }
        const moduleMeta = await moduleFn.getMeta();
        if (ctx.pkg) {
          if (!moduleMeta.name) {
            moduleMeta.name = ctx.pkg.name;
          }
          if (!moduleMeta.version) {
            moduleMeta.version = ctx.pkg.version;
          }
        }
        const metaFile = resolve(ctx.options.outDir, "module.json");
        await promises.writeFile(metaFile, JSON.stringify(moduleMeta, null, 2), "utf8");
        await writeTypes(ctx.options.outDir, moduleMeta);
      }
    }
  })
}
async function writeTypes(distDir: string, meta: any) {
  const dtsFile = resolve(distDir, "types.d.ts");
  if (existsSync(dtsFile)) {
    return;
  }
  const moduleTypesFile = resolve(distDir, "module.d.ts");
  const moduleTypes = await promises.readFile(moduleTypesFile, "utf8").catch(() => "");
  const typeExports = findExports(moduleTypes);
  const isStub = moduleTypes.includes("export *");
  const schemaShims: string[] = [];
  const moduleImports: string[] = [];
  const hasTypeExport = (name: string) => isStub || typeExports.find((exp) => exp.names.includes(name));
  if (meta.configKey && hasTypeExport("ModuleOptions")) {
    moduleImports.push("ModuleOptions");
    schemaShims.push(`  interface NuxtConfig { ['${meta.configKey}']?: Partial<ModuleOptions> }`);
    schemaShims.push(`  interface NuxtOptions { ['${meta.configKey}']?: ModuleOptions }`);
  }
  if (hasTypeExport("ModuleHooks")) {
    moduleImports.push("ModuleHooks");
    schemaShims.push("  interface NuxtHooks extends ModuleHooks {}");
  }
  if (hasTypeExport("ModuleRuntimeConfig")) {
    moduleImports.push("ModuleRuntimeConfig");
    schemaShims.push("  interface RuntimeConfig extends ModuleRuntimeConfig {}");
  }
  if (hasTypeExport("ModulePublicRuntimeConfig")) {
    moduleImports.push("ModulePublicRuntimeConfig");
    schemaShims.push("  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {}");
  }
  const dtsContents = `
import { ${moduleImports.join(", ")} } from './module'

${schemaShims.length ? `declare module '@nuxt/schema' {
${schemaShims.join("\n")}
}
` : ""}

export { ${typeExports[0].names.join(", ")} } from './module'
`;
  await promises.writeFile(dtsFile, dtsContents, "utf8");
}
async function writeCJSStub(distDir: string) {
  const cjsStubFile = resolve(distDir, "module.cjs");
  if (existsSync(cjsStubFile)) {
    return;
  }
  const cjsStub = `module.exports = function(...args) {
  return import('./module.mjs').then(m => m.default.call(this, ...args))
}
const _meta = module.exports.meta = require('./module.json')
module.exports.getMeta = () => Promise.resolve(_meta)
`;
  await promises.writeFile(cjsStubFile, cjsStub, "utf8");
}

export { buildModule };
