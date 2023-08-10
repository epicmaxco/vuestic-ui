import fs from 'fs'
import path from 'path'

const generateStorybook = (directory: string): void => {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const fullPath = path.join(directory, file)

    if (fs.statSync(fullPath).isDirectory()) {
      generateStorybook(fullPath)
      continue
    }

    if (!fullPath.endsWith('.demo.vue')) { continue }

    const componentName = path.basename(fullPath, '.demo.vue')
    const storyPath = path.join(directory, `${componentName}.stories.ts`)

    console.log(`Generating/Regenerating story for ${fullPath}...`)

    const storyContent = `
import { defineComponent } from 'vue'
import ${componentName} from './${componentName}.demo.vue'

export default {
  title: '${componentName}',
  component: ${componentName},
}

export const Default = defineComponent({
  components: { ${componentName} },
  template: '<${componentName}/>',
})
`

    fs.writeFileSync(storyPath, storyContent.trim() + '\n')
  }
}

const projectRoot = '.'
generateStorybook(projectRoot)
console.log('Storybook files generation/regeneration complete!')
