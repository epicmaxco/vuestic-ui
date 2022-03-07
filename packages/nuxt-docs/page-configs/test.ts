import { useDocsBlocks } from '~/composables/useDocsBlocks'

const { title, subtitle } = useDocsBlocks()

export default [
  title('test'),
  subtitle('landing.preview.buttons.start')
]