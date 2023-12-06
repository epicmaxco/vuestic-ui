import { VaCheckbox } from '../va-checkbox'
import { VaChip } from './'

export default {
  title: 'VaChip',
  component: VaChip,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaChip },
  template: '<VaChip>text</VaChip>',
})

export const Color = () => ({
  components: { VaChip },
  template: '<VaChip color="warning">text</VaChip>',
})

export const Outline = () => ({
  components: { VaChip },
  template: '<VaChip outline>text</VaChip>',
})

export const Flat = () => ({
  components: { VaChip },
  template: '<VaChip flat>text</VaChip>',
})

export const Size = () => ({
  components: { VaChip },
  template: `
    <p>[small]</p>
    <VaChip size="small">text</VaChip>
    <p>[medium]</p>
    <VaChip>text</VaChip>
    <p>[large]</p>
    <VaChip size="large">text</VaChip>
  `,
})

export const Icon = () => ({
  components: { VaChip },
  template: '<VaChip icon="face">text</VaChip>',
})

export const SizesWithIcons = () => ({
  components: { VaChip },
  template: `
    <p>[small]</p>
    <VaChip icon="face" size="small">text</VaChip>
    <p>[medium]</p>
    <VaChip icon="face">text</VaChip>
    <p>[large]</p>
    <VaChip icon="face" size="large">text</VaChip>
  `,
})

export const Square = () => ({
  components: { VaChip },
  template: '<VaChip square>text</VaChip>',
})

export const Closeable = () => ({
  components: { VaChip, VaCheckbox },
  data: () => ({ value: true }),
  template: `
    <VaCheckbox v-model="value" label="toggle" />
    <br>
    <VaChip v-model="value" closeable>text</VaChip>
  `,
})

export const Link = () => ({
  components: { VaChip },
  template: '<VaChip to="/?path=/docs/vachip--docs">text</VaChip>',
})

export const Disabled = () => ({
  components: { VaChip },
  template: '<VaChip disabled>text</VaChip>',
})

export const Readonly = () => ({
  components: { VaChip },
  template: '<VaChip readonly>text</VaChip>',
})

export const Stateful = () => ({
  components: { VaChip },
  template: '<VaChip stateful closeable>text</VaChip>',
})

export const Shadow = () => ({
  components: { VaChip },
  template: '<VaChip shadow>text</VaChip>',
})
