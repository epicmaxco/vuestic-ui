import { Plugin } from "vite";
import { writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'

export const appendStyle = (outFile: string): Plugin => {
  let outDir = ''

  return {
    name: 'vuestic:append-style',

    configResolved(config) {
      outDir = config.build.outDir
    },

    async closeBundle() {
      const filePath = resolve(`${outDir}/${outFile}`)
      const fileContent = (await readFile(filePath, 'utf8')).toString()

      const stylePath = `./style.css`
      const styleImport = `import './${stylePath}'`

      if (!fileContent.includes(styleImport)) {
        await writeFile(filePath, `${styleImport}\n${fileContent}`)
      }
    }
  }
}
