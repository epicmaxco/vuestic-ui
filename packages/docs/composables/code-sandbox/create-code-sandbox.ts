import { getParameters } from 'codesandbox/lib/api/define'
import { defaultExample, tsconfig, tsconfigNode, viteConfig, viteEnv } from "./templates";
import { CodeSandboxConfig } from "./types";
import { getCodeSandboxHtml, getCodeSandboxMain, packageJson } from "./generators";

export const createCodeSandbox = (code: string = defaultExample, config: CodeSandboxConfig = {}): string => getParameters({
  files: {
    'package.json': {
      content: packageJson(config),
      isBinary: false,
    },
    'vite.config.js': {
      content: viteConfig,
      isBinary: false,
    },
    'tsconfig.json': {
      content: JSON.stringify(tsconfig),
      isBinary: false,
    },
    'tsconfig.node.json': {
      content: JSON.stringify(tsconfigNode),
      isBinary: false,
    },
    'src/vite-env.d.ts': {
      content: viteEnv,
      isBinary: false,
    },
    'src/main.ts': {
      content: getCodeSandboxMain(config),
      isBinary: false,
    },
    'src/App.vue': {
      content: code,
      isBinary: false,
    },
    'index.html': {
      content: getCodeSandboxHtml(config),
      isBinary: false,
    },
  },
})
