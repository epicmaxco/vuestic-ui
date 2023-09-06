import { VaBreadcrumbs } from './'
import { VaBreadcrumbsItem } from './'

export default {
  title: 'VaBreadcrumbs',
  component: VaBreadcrumbs,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <va-breadcrumbs>
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
  `,
})

export const Color = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <va-breadcrumbs color="warning">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
  `,
})

export const ActiveColor = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <va-breadcrumbs activeColor="success">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
  `,
})

export const Separator = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <va-breadcrumbs separator=":">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
  `,
})

export const SeparatorSlot = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <va-breadcrumbs>
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
      <template #separator>
        :
      </template>
    </va-breadcrumbs>
  `,
})

export const SeparatorColor = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <va-breadcrumbs separatorColor="warning">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
  `,
})

export const Align = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    [left]
    <va-breadcrumbs align="left">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
    [center]
    <va-breadcrumbs align="center">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
    [right]
    <va-breadcrumbs align="right">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
    [between]
    <va-breadcrumbs align="between">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
    [around]
    <va-breadcrumbs align="around">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
    [stretch]
    <va-breadcrumbs align="stretch">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
  `,
})

