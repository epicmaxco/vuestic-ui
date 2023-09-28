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

export const RestColor = () => ({
  components: { VaAvatarGroup },
  setup: () => ({
    avatars: getAvatars(),
  }),
  template: `
    <strong>[secondary]</strong>
    <va-avatar-group :options="avatars" :max="2"/>
    <strong>[warning]</strong>
    <va-avatar-group :options="avatars" restColor="warning" :max="2"/>
  `,
})

export const Max = () => ({
  components: { VaAvatarGroup },
  setup: () => ({
    avatars: getAvatars(),
  }),
  template: `
    <strong>[0]</strong>
    <va-avatar-group :options="avatars"/>
    <strong>[1]</strong>
    <va-avatar-group :options="avatars" :max="1"/>
    <strong>[2]</strong>
    <va-avatar-group :options="avatars" :max="2"/>
    <strong>[3]</strong>
    <va-avatar-group :options="avatars" :max="3"/>
  `,
})

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
