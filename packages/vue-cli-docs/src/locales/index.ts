import { languages } from '../components/languages'

const translations = languages.reduce((result, { code, name }) => ({
  ...result,
  [code]: {
    name,
    messages: require(`./${code}/${code}.json`),
    // load: () => import(`./${code}/${code}.json`),
  },
}), {})

export default translations
