import { VaBreadcrumbs, VaBreadcrumbsItem } from './'
import { addText } from '../../../.storybook/interaction-utils/addText'

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

export const Disabled = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    [false]
    <va-breadcrumbs>
      <va-breadcrumbs-item label="No route"/>
      <va-breadcrumbs-item
          label="With route"
          to="/"
      />
    </va-breadcrumbs>
    [true]
    <va-breadcrumbs>
      <va-breadcrumbs-item
        label="No route"
        disabled
      />
      <va-breadcrumbs-item
        label="With route"
        to="/"
        disabled
      />
    </va-breadcrumbs>
  `,
})

export const Color = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <va-breadcrumbs color="danger">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
  `,
})
addText(
  Color,
  'Active item doesn\'t have a way to color it, only categories do',
  'broken',
)

export const ActiveColor = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <va-breadcrumbs activeColor="danger">
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
        --
      </template>
    </va-breadcrumbs>
  `,
})

export const SeparatorColor = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <va-breadcrumbs separatorColor="danger">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
  `,
})

export const Align = () => ({
  components: { VaBreadcrumbs, VaBreadcrumbsItem },
  template: `
    <div style="max-width: 300px">
      [left]
      <va-breadcrumbs>
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
    </div>
  `,
})
