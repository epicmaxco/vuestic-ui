import fs from 'fs'
import path from 'path'

export const readStyleVariablesFileByComponentName = (componentName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const resultPath = path.join(__dirname, `../../../ui/src/components/${componentName}/_variables.scss`)
    fs.readFile(resultPath, 'utf8',
      (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
  })
}
