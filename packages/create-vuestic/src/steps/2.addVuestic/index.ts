import { withSpinner } from '../../utils/with-spinner';
import { UserAnswers } from '../../prompts';
import { addVuesticToVue3App } from './vue-app';
import { addVuesticToNuxtApp } from './nuxt-app';

export const addVuestic = async (options: UserAnswers) => {
  const { projectType } = options

  await withSpinner('Adding Vuestic...', async () => {
    if (projectType === 'create-vue') {
      await addVuesticToVue3App()
    } else if (projectType === 'nuxt') {
      await addVuesticToNuxtApp()
    }
  })
}
