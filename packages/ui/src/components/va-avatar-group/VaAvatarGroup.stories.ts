import { VaAvatarGroup } from './'

export default {
  title: 'VaAvatarGroup',
  component: VaAvatarGroup,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaAvatarGroup },
  setup: () => ({avatars: [
    {
      src: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      icon: 'warning',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      icon: 'warning',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
      icon: 'warning',
    },
  ]}),
  template: `
    <va-avatar-group :options="avatars" :max="3"/>
  `,
})

export const RestColor = () => ({
  components: { VaAvatarGroup },
  setup: () => ({avatars: [
    {
      src: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      icon: 'warning',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      icon: 'warning',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
      icon: 'warning',
    },
  ]}),
  template: `
    <va-avatar-group :options="avatars" restColor="warning" :max="3"/>
  `,
})

export const Vertical = () => ({
  components: { VaAvatarGroup },
  setup: () => ({avatars: [
    {
      src: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      icon: 'warning',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      icon: 'warning',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
      icon: 'warning',
    },
  ]}),
  template: `
    <va-avatar-group :options="avatars" vertical :max="3"/>
  `,
})