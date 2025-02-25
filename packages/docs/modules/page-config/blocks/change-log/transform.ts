import { readFile } from 'fs/promises';
import { defineBlockTransform } from "../../compiler/define-block-transform";
import glob from 'fast-glob'
import { resolve, join } from 'pathe'

const changelogs = () => glob(join(resolve(''), '..', 'ui/src/**/CHANGELOG.md'))

const sortObjectKeys = <T extends Record<string, any>>(obj: T) => {
  return Object
    .keys(obj)
    .sort((a, b) => {
      if (a.includes('next')) return 1
      if (b.includes('next')) return -1

      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    })
    .reverse()
    .reduce((acc, key) => {
      acc[key as keyof T] = obj[key] as T[keyof T]
      return acc
    }, {} as T)
}

export const render = async () => {
  const logs = await changelogs()

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
      const serviceName = path.match(/services\/(.*)\/CHANGELOG.md/)?.[1]
      const composableName = path.match(/composables\/(.*)\/CHANGELOG.md/)?.[1]

      const spilledByVersion = changelog.split(/# ([0-9]*\.[0-9]*\.[0-9]*)|\# (next)/).filter(Boolean)

      for (let i = 0; i < spilledByVersion.length; i += 2) {
        const version = spilledByVersion[i]
        const content = spilledByVersion[i + 1]

        acc[version] = acc[version] || {}

        if (componentName) {
          acc[version][componentName] = content.split('\n').filter(Boolean)
        } else if (serviceName) {
          acc[version][serviceName] = content.split('\n').filter(Boolean)
        } else if (composableName) {
          acc[version][composableName] = content.split('\n').filter(Boolean)
        }
      }
      return acc
    }, {} as Record<string, Record<string, string[]>>)

    return sortObjectKeys(mergedChangelog)
}

export default defineBlockTransform(async function (block) {
  if (block.type !== 'changeLog') { return }

  const changelog = await render()

  const newBlock = block.replaceArgCode(0, JSON.stringify(changelog))
  return newBlock
})
