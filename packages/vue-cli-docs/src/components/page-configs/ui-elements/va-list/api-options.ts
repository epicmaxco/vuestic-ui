// @ts-ignore
import { ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'

export const listApiOptions = {
  props: {
    fit: { local: true },
  },
  slots: {
    default: { local: true },
  },
} as ManualApiOptions

export const listLabelApiOptions = {
  slots: {
    default: { local: true },
  },
} as ManualApiOptions

export const listSeparatorApiOptions = {
  props: {
    fit: { local: true },
    spaced: { local: true },
  },
} as ManualApiOptions

export const listItemApiOptions = {
  slots: {
    default: { local: true },
  },
} as ManualApiOptions

export const listItemLabelApiOptions = {
  props: {
    caption: { local: true },
    lines: { local: true },
  },
  slots: {
    default: { local: true },
  },
} as ManualApiOptions

export const listItemSectionApiOptions = {
  props: {
    icon: { local: true },
    avatar: { local: true },
  },
  slots: {
    default: { local: true },
  },
} as ManualApiOptions
