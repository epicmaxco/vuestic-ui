import { useUserAnswers } from '../../composables/useUserAnswers';
import { resolvePath } from '../../utils/resolve-path';
import { writeFile } from 'fs/promises';
import { rmSync } from 'fs';
import { VUESTIC_LOGO, APP_TEMPLATE, EMPTY_TEMPLATE, MAIN_CSS_STYLES } from './files-content';

export const restructureProject = async () => {
  const { projectName, projectFeatures } = await useUserAnswers()

  // remove base.css
  const baseCss = resolvePath(process.cwd(), projectName, 'src/assets/base.css')
  rmSync(baseCss, { recursive: true, force: true })
  // replace content inside main.css
  const mainCss = resolvePath(process.cwd(), projectName, 'src/assets/main.css')
  await writeFile(mainCss, MAIN_CSS_STYLES)

  // clean up components folder
  const iconsFolderPath = resolvePath(process.cwd(), projectName, 'src/components/icons/')
  const theWelcomePath = resolvePath(process.cwd(), projectName, 'src/components/TheWelcome.vue')
  const welcomeItemPath = resolvePath(process.cwd(), projectName, 'src/components/WelcomeItem.vue')
  const helloWorldPath = resolvePath(process.cwd(), projectName, 'src/components/HelloWorld.vue')

  rmSync(iconsFolderPath, { recursive: true, force: true })
  rmSync(theWelcomePath, { recursive: true, force: true })
  rmSync(welcomeItemPath, { recursive: true, force: true })
  await writeFile(helloWorldPath, EMPTY_TEMPLATE)

  // overwrite logo
  const logoPath = resolvePath(process.cwd(), projectName, 'src/assets/logo.svg')
  await writeFile(logoPath, VUESTIC_LOGO)

  // clean up views
  if (projectFeatures.includes('router')) {
    const aboutViewPath = resolvePath(process.cwd(), projectName, 'src/views/AboutView.vue')
    const homeViewPath = resolvePath(process.cwd(), projectName, 'src/views/HomeView.vue')

    await writeFile(homeViewPath, EMPTY_TEMPLATE)
    await writeFile(aboutViewPath, EMPTY_TEMPLATE)
  }

  // overwrite App.vue
  const appPath = resolvePath(process.cwd(), projectName, 'src/App.vue')
  await writeFile(appPath, APP_TEMPLATE)
}
