import { useUserAnswers } from '../useUserAnswers';
import treeShaking from "./configTreeShaking"
import defaultConfig from "./configDefault"

export const useVuesticConfig = async () => {
  const answers = await useUserAnswers()
  let config = defaultConfig

  if (answers.vuesticFeatures.includes('treeShaking')) {
    config = treeShaking
  }

  return {
    import: typeof config.import === 'function' ? config.import(answers) : config.import,
    css: typeof config.css === 'function' ? config.css(answers) : config.css,
    plugin: config.plugin,
  }
}
