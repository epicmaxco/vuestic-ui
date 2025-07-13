import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/FileUpload',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaFileUploadElement
      name="File"
      dropzone
      rules="required|mimes:zip,rar"
    />
  </Vueform>
  `,
})
