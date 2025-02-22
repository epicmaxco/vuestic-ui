import { readFile } from 'fs/promises'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { parseVueTemplate } from '../template-parser'

const componentRawCode = await readFile(resolve(dirname(fileURLToPath(import.meta.url)), './Input.vue'))
const component = parseVueTemplate(componentRawCode.toString())

export default component
