const changelogs = import.meta.glob('@/../ui/**/CHANGELOG.md', { eager: true , as: 'raw' }) as Record<string, string>


const mergedChangelog = Object
  .entries(changelogs)
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

export default definePageConfig({
  blocks: [
    block.title('Change Log'),
    // block.markdown(Object.entries(mergedChangelog).map(([version, content]) => `## ${version}\n${content}`).join('\n')),
    block.component('ChangeLog', { changeLog: mergedChangelog }),
  ],
});
