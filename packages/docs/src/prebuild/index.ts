import { makeTableFromComponent } from './makeTableFromComponent'
import path from 'path'
import fs from 'fs'
import { makeTsFileToExportTableObject } from './makeTsFileToExportTableObject'

const getDirectories = async (source: string) =>
  (await fs.promises.readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const main = async () => {
  console.log('making variables files from "_variables.scss"...')
  const tmpDirName = path.resolve(__dirname, './.tmp')
  if (fs.existsSync(tmpDirName)) {
    fs.rmSync(tmpDirName, { recursive: true })
  }

  fs.mkdirSync(tmpDirName)

  const docsComponentsPath = path.resolve(__dirname, '../page-configs/ui-elements/')
  const componentsList = await getDirectories(docsComponentsPath)
  for (const componentName of componentsList) {
    try {
      const blockTable = await makeTableFromComponent(`va-${componentName}`)
      fs.writeFileSync(`${tmpDirName}/${`va-${componentName}`}.ts`, `${makeTsFileToExportTableObject(blockTable)}`)
    } catch (e) {
      if (process.env.LOG_PREBUILD) {
        console.log(`no _variables.scss file in va-${componentName}`)
      }
      // console.log(e)
    }
  }
}

main()
