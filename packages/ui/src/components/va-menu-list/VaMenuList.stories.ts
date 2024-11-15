import { VaDivider, VaButton, VaDropdown, VaIcon, VaAvatar } from '../../components'
import VaMenuList from './VaMenuList.vue'
import VaMenuItem from './components/VaMenuItem.vue'
import VaMenuGroup from './components/VaMenuGroup.vue'
import VaMenuFull from './components/VaMenuFull.vue'

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

export const Icon = () => ({
  components: { VaMenuList, VaAvatar },
  data: () => ({
    options: [
      { text: 'copy', value: 'one', icon: 'content_copy' },
      { text: 'paste', value: 'two', icon: 'content_paste' },
      { text: 'cut', value: 'three', icon: 'content_cut' },
      { text: 'share', value: 'four', rightIcon: 'share' },
      { text: 'delete', value: 'five', icon: 'delete' },
    ],
  }),
  template: `
  <VaMenuList :options="options" />
  `,
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
    <template #right-icon>
      [right-icon]
    </template>
  </VaMenuList>
  `,
})

const longGroupName = 'This is a very long group name that should be truncated'.repeat(10)
export const Groups = () => ({
  components: { VaMenuList, VaAvatar },
  data: () => ({
    options: [
      { text: 'one', value: 'one', group: '' },
      { text: 'two', value: 'two', group: longGroupName },
      { text: 'three', value: 'three', group: 'A2' },
      { text: 'four', value: 'four', group: 'A2' },
      { text: 'five', value: 'five', group: longGroupName },
    ],
  }),
  template: `
  <VaMenuList :options="options" />
  `,
})

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
      <VaMenuItem right-icon="home">
        User 3
      </VaMenuItem>
    </VaMenuList>
  `,
})

export const DivSlotUsage = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup },
  template: `
    <VaMenuList>
      <VaMenuGroup group-name="Group 1" />
      <VaMenuItem icon="home">
        User 1
      </VaMenuItem>
      <VaMenuItem>
        User 2
      </VaMenuItem>
      <VaMenuGroup group-name="Group 2" />
      <VaMenuItem right-icon="home">
        User 3
      </VaMenuItem>
      <template v-if="true">
        <VaMenuItem>
          With v-if 1
        </VaMenuItem>
        <VaMenuItem>
          With v-if 2
        </VaMenuItem>
        <template v-if="true">
          <VaMenuItem>
            With v-if 2
          </VaMenuItem>
        </template>
      </template>
    </VaMenuList>
  `,
})

export const HoverColor = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup },
  data: () => ({
    options: ['Option 1', 'Option 2', 'Option 3'],
  }),
  template: `
    <VaMenuList :options="options" style="--va-menu-item-hover-color: red;" />
  `,
})

export const WithDivider = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup, VaDivider, VaButton, VaMenuFull },
  template: `
    <VaMenuList>
      <VaMenuItem>
        User 1
      </VaMenuItem>
      <VaMenuItem>
        User 2
      </VaMenuItem>
      <VaMenuFull>
        <VaDivider />
      </VaMenuFull>
      <VaMenuItem>
        User 3
      </VaMenuItem>
      <VaMenuFull>
        Custom content
      </VaMenuFull>
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
        Single
      </VaMenuItem>

      <VaDropdown placement="right-start" stickToEdges trigger="hover">
        <template #anchor="{ isOpened }">
          <VaMenuItem>
            Group
            <template #right-icon>
              <VaIcon :name="isOpened ? 'chevron_left': 'chevron_right'" />
            </template>
          </VaMenuItem>
        </template>

        <VaDropdownContent style="margin-top: calc(var(--va-menu-padding-y) * -1)">
          <VaMenuList>
            <VaMenuItem>
              User 1
            </VaMenuItem>
            <VaMenuItem>
              User 2
            </VaMenuItem>
          </VaMenuList>
        </VaDropdownContent>
      </VaDropdown>
    </VaMenuList>
  `,
})
