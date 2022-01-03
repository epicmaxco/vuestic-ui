import { readdirSync, unlinkSync, existsSync } from 'fs'
import { resolve } from 'path'

/** This plugin used to remove junk files defined by `deleteFilesRegex` from dist */
export default function ({ dirPath = undefined, deleteFilesRegex = undefined }) {
  return {
    name: 'rollup-delete-junk',
    closeBundle: (err) => {
      if (err) { return }

      const path = resolve(`${dirPath}/`)
      const regex = deleteFilesRegex

      if (!existsSync(path)) { return }

      readdirSync(path)
        .filter(f => regex.test(f))
        .map(f => unlinkSync(`${path}/${f}`))
    },
  }
}
