// @ts-ignore
import { ManualApiOptions } from '../../../DocsApi/ManualApiOptions'

export default {
  props: {
    outline: { local: true },
    icon: { local: true },
    iconRight: { local: true },
    type: { local: true },
    block: { local: true },
    rounded: { local: true },
    round: { local: true },
    spaceBetweenItems: { local: true },
    gradient: { local: true },
    href: { local: true },
    target: { local: true },
  },
  slots: {
    default: { local: true },
  },
  events: {
    click: { local: true, types: '`() => Event`' },
  },
  methods: {
    focus: { local: true, types: '`() => void`' },
    blur: { local: true, types: '`() => void`' },
  },
} as ManualApiOptions
