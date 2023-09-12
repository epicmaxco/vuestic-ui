const changelogs = import.meta.glob('@/../ui/**/CHANGELOG.md', { as: 'raw' }) as Record<string, () => Promise<string>>


const render = async () => {
  const logEnteries = await Promise.all(Object.entries(changelogs)
    .map(async ([path, changelog]) => {
      return [
        path,
        await changelog()
      ]
    }))

  const mergedChangelog = logEnteries
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

  return [
    block.component("ChangeLog", { changelog: mergedChangelog })
  ]
}

export default definePageConfig({
  blocks: [
    block.title('Change Log'),
    block.async(render())
  ],
});
