import { languages } from '../components/languages'

const translations = languages.reduce((result, { code, name }) => ({
  ...result,
  [code]: {
    name,
    load: () => import(`./${code}/${code}.json`),
  },
}), {})

export default translations
