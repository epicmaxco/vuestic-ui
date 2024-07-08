import { Plugin } from "vite";
import { writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const appendStyle = (outFile: string): Plugin => {
  let outDir = ''

  const onBundleClose = async () => {
    await sleep(1000)
    const filePath = resolve(`${outDir}/${outFile}`)
    const fileContent = (await readFile(filePath, 'utf8')).toString()

    const stylePath = `./style.css`
    const styleImport = `import './${stylePath}'`

    if (!fileContent.includes(styleImport)) {
      await writeFile(filePath, `${styleImport}\n${fileContent}`)
    }
  }

  return {
    name: 'vuestic:append-style',

    enforce: 'post',

    configResolved(config) {
      outDir = config.build.outDir
    },

    async closeBundle() {
      onBundleClose()
    }
  }
}
