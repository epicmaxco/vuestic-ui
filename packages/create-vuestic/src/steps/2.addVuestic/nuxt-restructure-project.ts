import { VUESTIC_LOGO, APP_TEMPLATE } from './files-content';
import { useFiles } from '../../composables/useFiles';


export const restructureProject = async () => {
  const { addFile, replaceFileContent } = await useFiles()

  await Promise.all([
    addFile('assets/logo.svg', VUESTIC_LOGO),
    replaceFileContent('app.vue', () => APP_TEMPLATE)
  ])
}
