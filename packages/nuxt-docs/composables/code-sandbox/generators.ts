import packageUi from 'vuestic-ui/package.json'
import { iconsConfig, iconsStyles, main } from './templates'
import { CodeSandboxConfig } from './types'

export const getCodeSandboxHtml = ({ requireIcons = false }: CodeSandboxConfig): string => {
  return `
    <link
      href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap"
      rel="stylesheet"
    >
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    >
    <link
      href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    >
    ${requireIcons ? iconsStyles : ''}
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  `
}

export const getCodeSandboxMain = ({ requireIcons = false }: CodeSandboxConfig): string => {
  if (requireIcons) { return iconsConfig }

  return main
}

export const packageJson = ({ dependencies = {}, devDependencies = {} }: CodeSandboxConfig): string => {
  const commonDeps = {
    vue: 'latest',
    'vuestic-ui': `${packageUi.version}`,
  }
  const commonDevDeps = {
    '@vitejs/plugin-vue': '~3.0.0',
    typescript: '^4.7.4',
    'vue-tsc': 'latest',
    vite: 'latest',
    sass: 'latest',
  }
  return JSON.stringify({
    type: 'module',
    scripts: {
      serve: 'vite',
    },
    dependencies: Object.assign(commonDeps, dependencies),
    devDependencies: Object.assign(commonDevDeps, devDependencies),
  }, null, 2)
}
