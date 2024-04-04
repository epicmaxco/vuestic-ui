import { useUserAnswers } from '../../composables/useUserAnswers';
import { VUESTIC_LOGO, APP_TEMPLATE, EMPTY_TEMPLATE, MAIN_CSS_STYLES } from './files-content';
import { useFiles } from '../../composables/useFiles';


export const restructureProject = async () => {
  const { projectFeatures } = await useUserAnswers()

  const { removeFile, replaceFileContent } = await useFiles()

  await Promise.all([
    removeFile('src/assets/base.css'),
    replaceFileContent('src/assets/main.css', () => MAIN_CSS_STYLES),

    removeFile('src/components/icons/'),
    removeFile('src/components/TheWelcome.vue'),
    removeFile('src/components/WelcomeItem.vue'),
    replaceFileContent('src/components/HelloWorld.vue', () => EMPTY_TEMPLATE),
    replaceFileContent('src/assets/logo.svg', () => VUESTIC_LOGO),
    replaceFileContent('src/App.vue', () => APP_TEMPLATE),
  ])

  // clean up views
  if (projectFeatures && projectFeatures.includes('router')) {
    await Promise.all([
      replaceFileContent('src/views/AboutView.vue', () => EMPTY_TEMPLATE),
      replaceFileContent('src/views/HomeView.vue', () => EMPTY_TEMPLATE),
    ])
  }
}
