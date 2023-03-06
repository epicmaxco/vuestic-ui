import { dirname } from 'pathe';
import { Importer } from './../compiler/create-importer';
import { readdir } from 'fs/promises'
import { existsSync } from 'fs'

export const exportTranslations = async (importer: Importer, configPath: string) => {
  const translations = dirname(configPath) + '/translation'

  if (!existsSync(translations)) { return '' }

  const files = await readdir(translations)

  if (!files.length) { return '' }

  const imports = files.map((file) => {
    const [name] = file.split('/').slice(-1)

    return importer.importDefault(name.replace('.json', ''), translations + '/' + file)
  })

  return `
export const translations = {
  ${imports.join(',')}
}
  `.trim()
}
