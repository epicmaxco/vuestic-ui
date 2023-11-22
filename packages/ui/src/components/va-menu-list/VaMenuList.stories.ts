import { VaDivider, VaButton, VaDropdown, VaIcon, VaAvatar } from '../../components'
import VaMenuList from './VaMenuList.vue'
import VaMenuItem from './components/VaMenuItem.vue'
import VaMenuGroup from './components/VaMenuGroup.vue'
import { addText } from '../../../.storybook/interaction-utils/addText'

export default {
  title: 'VaMenuList',
  component: VaMenuList,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaMenuList },
  data: () => ({
    options: ['Option 1', 'Option 2', 'Option 3'],
  }),
  template: '<VaMenuList :options="options" />',
})

export const IconSlot = () => ({
  components: { VaMenuList, VaAvatar },
  data: () => ({
    options: ['Option 1', 'Option 2', 'Option 3'],
  }),
  template: `
  <VaMenuList :options="options">
    <template #left-icon>
      [left-icon]
    </template>
    <template #icon>
      [icon]
    </template>
  </VaMenuList>
  `,
})
addText(
  IconSlot,
  'There is no slot for right icon, only for left one.',
  'broken',
)

const longGroupName = 'This is a very long group name that should be truncated'.repeat(10)
export const Groups = () => ({
  components: { VaMenuList, VaAvatar },
  data: () => ({
    options: [
      { id: '0', text: 'one', value: 'one', icon: 'accessible_forward', rightIcon: '', group: '' },
      { id: '1', text: 'two', value: 'two', icon: '', rightIcon: 'home', group: longGroupName },
      { id: '2', text: 'three', value: 'three', icon: 'accessible_forward', rightIcon: '', group: longGroupName },
      { id: '3', text: 'four', value: 'four', icon: '', rightIcon: 'accessible_forward', group: 'A2' },
      { id: '4', text: 'five', value: 'five', icon: 'search', rightIcon: '', group: 'A2' },
    ],
    value: false,
  }),
  template: `
  <VaMenuList :options="options">
  </VaMenuList>
  `,
})
addText(
  Groups,
  'Long group name is not truncated in story. We also have too much options - should be minimal amount.',
  'broken',
)

export const SlotUsage = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup },
  template: `
    <VaMenuList>
      <VaMenuGroup group-name="Group 1" />
      <VaMenuItem>
        User 1
      </VaMenuItem>
      <VaMenuItem>
        User 2
      </VaMenuItem>
      <VaMenuGroup group-name="Group 2" />
      <VaMenuItem rightIcon="home">
        User 3
      </VaMenuItem>
    </VaMenuList>
  `,
})

export const Color = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup },
  data: () => ({
    options: ['Option 1', 'Option 2', 'Option 3'],
  }),
  template: `
    <VaMenuList color="warning" :options="options" />
  `,
})
addText(
  Groups,
  `I don't think we have any other component where 'color' means 'hover-color', let's make it explicit.` ,
  'broken',
)

export const WithDivider = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup, VaDivider, VaButton },
  template: `
    <VaMenuList>
      <VaMenuItem>
        User 1
      </VaMenuItem>
      <VaMenuItem>
        User 2
      </VaMenuItem>
      <VaDivider />
      <VaMenuItem>
        User 3
      </VaMenuItem>
      <div>
        Custom content
      </div>
      <VaMenuItem>
        User 4
      </VaMenuItem>
    </VaMenuList>
  `,
})

export const WithDropdown = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup, VaDivider, VaButton, VaDropdown, VaIcon },
  template: `
    <VaMenuList>
      <VaMenuItem>
        <template #left-icon>
          Looong
        </template>
        User 1
      </VaMenuItem>
      <VaDropdown placement="right-start" stickToEdges trigger="hover">
        <template #anchor="{ isOpened }">
          <VaMenuItem icon="phone">
            User 2
            <template #right-icon>
              <VaIcon :name="isOpened ? 'chevron_left': 'chevron_right'" />
            </template>
          </VaMenuItem>
        </template>

        <VaDropdownContent style="margin-top: calc(var(--va-menu-padding-y) * -1)">
          <VaMenuList>
            <VaMenuItem>
              Group 1
            </VaMenuItem>
            <VaMenuItem>
              Group 2
            </VaMenuItem>
          </VaMenuList>
        </VaDropdownContent>
      </VaDropdown>

      <VaMenuItem icon="home">
        User 3
      </VaMenuItem>
    </VaMenuList>
  `,
})
