// Copy of @nuxt/module-builder with some modifications


import { promises, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import { resolve } from 'pathe';
import consola from 'consola';
import { findExports } from 'mlly';

async function buildModule(opts) {
  const { build } = await import('unbuild');
  const outDir = opts.outDir || "dist";
  await build(opts.rootDir, false, {
    failOnWarn: false, // Disable process.exit(1) on warnings
    declaration: true,
    stub: opts.stub,
    outDir,
    entries: [
      "src/module",
      { input: "src/runtime/", outDir: `${outDir}/runtime`, ext: "mjs" }
    ],
    rollup: {
      emitCJS: false,
      cjsBridge: true
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
      "vue-demi"
    ],
    hooks: {
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
  });
}
async function writeTypes(distDir, meta) {
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
  const hasTypeExport = (name) => isStub || typeExports.find((exp) => exp.names.includes(name));
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
async function writeCJSStub(distDir) {
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
