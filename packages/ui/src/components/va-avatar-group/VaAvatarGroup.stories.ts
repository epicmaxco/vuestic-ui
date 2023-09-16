import { VaAvatarGroup } from './'
import { addText } from '../../../.storybook/interaction-utils/addText'

export default {
  title: 'VaAvatarGroup',
  component: VaAvatarGroup,
  tags: ['autodocs'],
}

const getAvatars = () => ([
  {
    src: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    icon: 'warning',
  },
  {
    color: 'danger',
  },
])

export const Default = () => ({
  components: { VaAvatarGroup },
  setup: () => ({
    avatars: getAvatars(),
  }),
  template: `
    <va-avatar-group :options="avatars"/>
  `,
})
addText(
  Default,
  'This looks very broken - why do we have +3 even though we have 3 avatars?',
  'broken',
)

export const RestColor = () => ({
  components: { VaAvatarGroup },
  setup: () => ({
    avatars: getAvatars(),
  }),
  template: `
    <va-avatar-group :options="avatars" restColor="warning"/>
  `,
})

export const Max = () => ({
  components: { VaAvatarGroup },
  setup: () => ({
    avatars: getAvatars(),
  }),
  template: `
    [2]
    <va-avatar-group :options="avatars" :max="2"/>
    [3]
    <va-avatar-group :options="avatars" :max="3"/>
    [4]
    <va-avatar-group :options="avatars" :max="4"/>
  `,
})
addText(
  Max,
  '+-3 o.o?',
  'broken',
)

export const Vertical = () => ({
  components: { VaAvatarGroup },
  setup: () => ({
    avatars: getAvatars(),
  }),
  template: `
    <va-avatar-group :options="avatars" vertical/>
  `,
})

export const PassAvatarProps = () => ({
  components: { VaAvatarGroup },
  setup: () => ({
    avatars: getAvatars(),
  }),
  template: `
    <va-avatar-group :options="avatars" square size="large"/>
  `,
})
