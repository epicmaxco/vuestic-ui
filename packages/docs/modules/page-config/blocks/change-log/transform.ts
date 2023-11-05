import { readFile } from 'fs/promises';
import { defineBlockTransform } from "../../compiler/define-block-transform";
import glob from 'fast-glob'
import { resolve, join } from 'pathe'

const changelogs = glob(join(resolve(''), '..', 'ui/src/**/CHANGELOG.md'))

export const render = async () => {
  const logs = await changelogs
  const logEntries = await Promise.all((logs)
    .map(async (path) => {
      return [
        path,
        await readFile(path, 'utf-8')
      ]
    }))

  const mergedChangelog = logEntries
    .reduce((acc, [path, changelog]) => {
      const componentName = path.match(/components\/(.*)\/CHANGELOG.md/)?.[1]

      const spilledByVersion = changelog.split(/# ([0-9]*\.[0-9]*\.[0-9]*)/).filter(Boolean)

      for (let i = 0; i < spilledByVersion.length; i += 2) {
        const version = spilledByVersion[i]
        const content = spilledByVersion[i + 1]

        acc[version] = acc[version] || {}

        if (componentName) {
          acc[version][componentName] = content.split('\n').filter(Boolean)
        }
      }
      return acc
    }, {} as Record<string, Record<string, string[]>>)

    return mergedChangelog
}

export default defineBlockTransform(async function (block) {
  if (block.type !== 'changeLog') { return }

  const changelog = await render()

  const newBlock = block.replaceArgCode(0, JSON.stringify(changelog))
  return newBlock
})
