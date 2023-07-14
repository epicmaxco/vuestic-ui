import { VaAvatar } from './index'
import { Prop, ref } from 'vue'

const meta = {
  title: 'VaAvatar',
  component: VaAvatar,
  argTypes: {
    max: { control: 'number', description: 'Maximum rating value' },
    icon: { control: 'text', description: 'Filled star icon' },
    iconEmpty: { control: 'text', description: 'Empty star icon' },
    modelValue: { control: 'number', description: 'Current rating value' },
  },
  tags: ['autodocs'],
}
export default meta

// <va-avatar>AA</va-avatar> Text inserted
// <va-avatar>
// <div>AA</div>
// </va-avatar>

export const Default = () => ({
  components: { VaAvatar },
  template: `
    <va-avatar/>`,
})
