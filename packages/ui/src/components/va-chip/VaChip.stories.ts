import { VaCheckbox } from '../va-checkbox'
import { VaChip } from './'

export default {
  title: 'VaChip',
  component: VaChip,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaChip },
  template: '<va-chip>Text</va-chip>',
})

export const Color = () => ({
  components: { VaChip },
  template: '<va-chip color="warning">Text</va-chip>',
})

export const Outline = () => ({
  components: { VaChip },
  template: '<va-chip outline>Text</va-chip>',
})

export const Flat = () => ({
  components: { VaChip },
  template: '<va-chip flat>Text</va-chip>',
})

export const Size = () => ({
  components: { VaChip },
  template: `
    [Small]
    <va-chip size="small">Text</va-chip>
    [Medium]
    <va-chip>Text</va-chip>
    [Large]
    <va-chip size="large">Text</va-chip>
  `,
})

export const Icon = () => ({
  components: { VaChip },
  template: '<va-chip icon="face">Text</va-chip>',
})

export const SizesWithIcons = () => ({
  components: { VaChip },
  template: `
    [Small]
    <va-chip icon="face" size="small">Text</va-chip>
    [Medium]
    <va-chip icon="face">Text</va-chip>
    [Large]
    <va-chip icon="face" size="large">Text</va-chip>
  `,
})

export const Square = () => ({
  components: { VaChip },
  template: '<va-chip square>Text</va-chip>',
})

export const Closeable = () => ({
  components: { VaChip, VaCheckbox },
  data: () => ({ value: true }),
  template: `
    [{{ value }}]
    <br />
    <va-checkbox v-model="value" label="toggle" />
    <br />
    <va-chip v-model="value" closeable>Text</va-chip>
  `,
})

export const Link = () => ({
  components: { VaChip },
  template: '<va-chip to="/?path=/docs/vachip--docs">Text</va-chip>',
})

export const Disabled = () => ({
  components: { VaChip },
  template: '<va-chip disabled>Text</va-chip>',
})

export const Readonly = () => ({
  components: { VaChip },
  template: '<va-chip readonly>Text</va-chip>',
})

export const Stateful = () => ({
  components: { VaChip },
  template: '<va-chip stateful closeable>Text</va-chip>',
})

export const Shadow = () => ({
  components: { VaChip },
  template: '<va-chip shadow>Text</va-chip>',
})
