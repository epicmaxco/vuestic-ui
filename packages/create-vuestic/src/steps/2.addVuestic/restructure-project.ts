import { useUserAnswers } from '../../composables/useUserAnswers';
import { resolvePath } from '../../utils/resolve-path';
import { writeFile } from 'fs/promises';
import { rmSync, mkdirSync } from 'fs';

const vuesticLogo = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="180"
    height="20"
    fill="none"
    viewBox="0 0 180 20"
  ><path
    fill="#ffffff"
    d="M170.47 8.9c-1.14 0-1.99-.33-2.54-.99-.56-.66-.83-1.7-.83-3.08V.63h2.15v4.45c0 .72.1 1.23.29 1.53.2.3.51.44.94.44.42 0 .73-.15.93-.44.21-.3.31-.81.31-1.54V.63h2.08v4.2c0 1.4-.27 2.43-.81 3.1-.55.65-1.38.98-2.52.98ZM176.8 8.75V.62h2.15v8.13h-2.15Z"
  /><path
    fill="url(#paint0_linear)"
    d="M7.95 19.2 0 .6h4.59l3.63 8.67L11.85.6h4.59L8.49 19.2h-.54Zm19.23-6.66V.6h4.38v11.28c0 2.4 1.14 3.24 2.67 3.24 1.68 0 2.73-.84 2.73-3.24V.6h4.41v11.94c0 4.26-3.18 6.66-7.14 6.66-4.11 0-7.05-2.52-7.05-6.66Zm26.07 6.06V.6h11.91v3.9h-7.5v3.24h6.93v3.84h-6.93v3.24h7.83v3.78H53.25Zm23.28-5.28h4.29c0 1.05.84 1.89 1.86 1.89 1.11 0 1.8-.63 1.8-1.56 0-1.35-1.77-1.74-3.24-2.25-3.03-1.08-4.71-2.49-4.71-5.58 0-3.18 2.73-5.82 6.12-5.82 3.99 0 5.88 2.55 6.12 5.88h-4.14c0-1.02-.63-1.86-1.86-1.86-.96 0-1.89.57-1.89 1.74 0 1.35 1.65 1.59 3.18 2.04 3.21.96 4.71 2.76 4.71 5.58 0 3.18-2.7 5.82-6.09 5.82-3.93 0-6.15-2.64-6.15-5.88Zm27.09 5.28V4.5H99.6V.6h12.54v3.9h-4.08v14.1h-4.44Zm19.56 0V.6h4.41v18h-4.41Zm16.47-9c0-5.37 4.05-9.6 9.75-9.6 3.42 0 5.79 1.29 7.71 3.3l-3.03 2.88a6.69 6.69 0 0 0-4.68-2.01c-3.21 0-5.28 2.4-5.28 5.43s2.07 5.43 5.28 5.43c1.8 0 3.42-.78 4.68-2.01l2.94 2.88a10.22 10.22 0 0 1-7.62 3.3c-5.7 0-9.75-4.23-9.75-9.6Z"
  /><defs><linearGradient
    id="paint0_linear"
    x1="0"
    x2="178"
    y1="10"
    y2="10"
    gradientUnits="userSpaceOnUse"
  ><stop stop-color="#ffffff" /><stop
    stop-color="#ffffff"
    offset="1"
  /></linearGradient></defs></svg>`

const basicTemplate = `<template></template>`.trim()

const appTemplate = `
<script setup>
const nextSteps = [
  { icon: 'settings', title: 'Configuration', text: 'Deeply customize your project with our convenient mechanism.', link: 'https://ui.vuestic.dev/getting-started/configuration-guide'},
  { icon: 'handshake', title: 'Contribution', text: 'Become a part of the ongoing development of Vuestic UI.', link: 'https://ui.vuestic.dev/contribution/guide'},
  { icon: 'group', title: 'Community', text: 'Join our friendly community.', link: 'https://discord.gg/u7fQdqQt8c'},
  { icon: 'dashboard', title: 'Tree shaking', text: 'Optimize your bundle size.', link: 'https://ui.vuestic.dev/getting-started/tree-shaking'},
  { icon: 'dashboard', title: 'Kitchensink', text: 'Showcase of all components.', link: 'https://ui.vuestic.dev/getting-started/kitchensink'},
  { icon: 'star', title: 'Vuestic Admin', text: 'Try our admin template project.', link: 'https://admin.vuestic.dev/'},
]
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="300" height="125" />
  </header>

  <main>
    <h5 class="va-h5 mb-1 va-text-center">
      Congratulations!
    </h5>
    <h5 class="va-h5 va-text-center">You've successfully installed the project.</h5>

    <h5 class="va-h6 mt-5 va-text-center">What's next?</h5>
    <div>
      <div class="mt-5 row steps-row">
        <div v-for="step in nextSteps" class="flex flex-col xs12 md6 pa-3">
          <VaCard
            :href="step.link"
            target="_blank"
          >
            <VaCardTitle><VaIcon class="mr-2" :name="step.icon"></VaIcon>{{ step.title }}</VaCardTitle>
            <VaCardContent>
              {{ step.text }}
            </VaCardContent>
          </VaCard>
        </div>
      </div>

    </div>
  </main>
</template>

`.trim()

const mainCssStyles = `
body {
  margin: 0;
}

html {
  background-color: #2450be;
}

#app {
  min-height: 100vh;
  height: 100%;
  background: linear-gradient(180deg, #2450be, #557de2);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fafafa;
  padding: 2rem;
}

.steps-row {
  max-width: 800px;
}

`.trim()

const restructureProjectWithRouter = async () => {
  const { projectName } = await useUserAnswers()

  const appPath = resolvePath(process.cwd(), projectName, 'src/App.vue')
  const aboutViewPath = resolvePath(process.cwd(), projectName, 'src/views/AboutView.vue')
  const homeViewPath = resolvePath(process.cwd(), projectName, 'src/views/HomeView.vue')

  await writeFile(homeViewPath, basicTemplate)
  await writeFile(aboutViewPath, basicTemplate)
  await writeFile(appPath, appTemplate)
}

const restructureProjectWithoutRouter = async () => {
  const { projectName } = await useUserAnswers()
  const appPath = resolvePath(process.cwd(), projectName, 'src/App.vue')

  await writeFile(appPath, appTemplate)

}
export const restructureProject = async () => {
  const { projectName, projectFeatures } = await useUserAnswers()

  // remove base.css
  const baseCss = resolvePath(process.cwd(), projectName, 'src/assets/base.css')
  rmSync(baseCss, { recursive: true, force: true })
  // replace content inside main.css
  const mainCss = resolvePath(process.cwd(), projectName, 'src/assets/main.css')
  await writeFile(mainCss, mainCssStyles)

  const iconsFolderPath = resolvePath(process.cwd(), projectName, 'src/components/icons/')
  const theWelcomePath = resolvePath(process.cwd(), projectName, 'src/components/TheWelcome.vue')
  const welcomeItemPath = resolvePath(process.cwd(), projectName, 'src/components/WelcomeItem.vue')

  rmSync(iconsFolderPath, { recursive: true, force: true })
  rmSync(theWelcomePath, { recursive: true, force: true })
  rmSync(welcomeItemPath, { recursive: true, force: true })

  const helloWorldPath = resolvePath(process.cwd(), projectName, 'src/components/HelloWorld.vue')
  await writeFile(helloWorldPath, basicTemplate)

  // replace logo
  const logoPath = resolvePath(process.cwd(), projectName, 'src/assets/logo.svg')
  await writeFile(logoPath, vuesticLogo)

  if (projectFeatures.includes('router')) {
    await restructureProjectWithRouter()
  } else {
    await restructureProjectWithoutRouter()
  }
}
