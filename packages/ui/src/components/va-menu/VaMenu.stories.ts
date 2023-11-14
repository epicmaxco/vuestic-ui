import { VaDivider, VaButton, VaDropdown, VaDropdownContent, VaIcon } from '../../components'
import VaMenuList from './components/VaMenuList.vue'
import VaMenuItem from './components/VaMenuItem.vue'
import VaMenuGroup from './components/VaMenuGroup.vue'
import { VaAvatar } from '../'

export default {
  title: 'VaMenu',
  component: VaMenuList,
}

export const Default = () => ({
  components: { VaMenuList },
  data: () => ({
    options: [
      { id: '0', text: 'one', value: 'one' },
      { id: '1', text: 'two', value: 'two' },
      { id: '2', text: 'three', value: 'three' },
    ],
    value: false,
  }),
  template: '<VaMenuList :options="options" />',
})

export const IconSlot = () => ({
  components: { VaMenuList, VaAvatar },
  data: () => ({
    options: [
      { id: '0', text: 'one', value: 'one', icon: 'accessible_forward', rightIcon: '' },
      { id: '1', text: 'two', value: 'two', icon: '', rightIcon: 'home' },
      { id: '2', text: 'three', value: 'three', icon: 'accessible_forward', rightIcon: '' },
      { id: '3', text: 'four', value: 'four', icon: '', rightIcon: 'accessible_forward' },
      { id: '4', text: 'five', value: 'five', icon: 'search' },
    ],
    value: false,
  }),
  template: `
  <VaMenuList :options="options" v-model="value">
    <template #left-icon>
      <va-avatar src="https://randomuser.me/api/portraits/men/2.jpg" />
    </template>
  </VaMenuList>
  `,
})

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
  <VaMenuList :options="options" v-model="value">
  </VaMenuList>
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
      <VaMenuItem rightIcon="home">
        User 3
      </VaMenuItem>
    </VaMenuList>
  `,
})

export const Color = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup },

  data: () => ({
    options: [
      { id: '0', text: 'one', value: 'one', icon: 'accessible_forward' },
      { id: '1', text: 'two', value: 'two', icon: '', rightIcon: 'home' },
      { id: '2', text: 'three', value: 'three', icon: 'accessible_forward', rightIcon: '' },
      { id: '3', text: 'four', value: 'four', icon: '', rightIcon: 'accessible_forward' },
      { id: '4', text: 'five', value: 'five', icon: 'search', rightIcon: '' },
    ],
    value: false,
  }),

  template: `
    <VaMenuList color="warning" :options="options" />
  `,
})

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

const subMenu = `
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
`

export const WithDropdown = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup, VaDivider, VaButton, VaDropdown, VaDropdownContent, VaIcon },

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

        ${subMenu}
      </VaDropdown>

      <VaMenuItem icon="home">
        User 3
      </VaMenuItem>
    </VaMenuList>
  `,
})
