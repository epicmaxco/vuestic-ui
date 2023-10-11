import { VaDivider, VaButton, VaDropdown, VaDropdownContent, VaIcon } from '../../components'
import { defineComponent } from 'vue'
import VaMenu from './VaMenu.vue'
import VaMenuList from './components/VaMenuList.vue'
import VaMenuItem from './components/VaMenuItem.vue'
import VaMenuGroup from './components/VaMenuGroup.vue'
import VaMenuDemo from './VaMenu.demo.vue'
import { VaAvatar } from '../'

export default {
  title: 'VaMenu',
  component: VaMenu,
}

export const Default = () => ({
  components: { VaMenuDemo },
  template: '<VaMenuDemo/>',
})

export const IconSlot = () => ({
  components: { VaMenu, VaAvatar },
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
  <VaMenu :options="options" v-model="value">
    <template #left-icon>
      <va-avatar src="https://randomuser.me/api/portraits/men/2.jpg" />
    </template>
  </VaMenu>
  `,
})

const longGroupName = 'This is a very long group name that should be truncated'.repeat(10)
export const Groups = () => ({
  components: { VaMenu, VaAvatar },
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
  <VaMenu :options="options" v-model="value">
  </VaMenu>
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
        <VaButton>HELLO</VaButton>
      </div>
      <VaMenuItem>
        User 4
      </VaMenuItem>
    </VaMenuList>
  `,
})

export const WithDropdown = () => ({
  components: { VaMenuList, VaMenuItem, VaMenuGroup, VaDivider, VaButton, VaDropdown, VaDropdownContent, VaIcon },

  template: `
    <VaMenuList>
      <VaMenuItem>
        User 1
      </VaMenuItem>
      <VaMenuItem>
        User 2

        <template #right-icon>
          <VaDropdown placement="right-start" stickToEdges trigger="hover">
            <template #anchor="{ isOpened }">
              <VaIcon :name="isOpened ? 'chevron_left': 'chevron_right'" />
            </template>

            <VaDropdownContent>
              <VaMenuList>
                <VaMenuItem>
                  Group 1
                </VaMenuItem>
                <VaMenuItem>
                  Group 2

                  <template #right-icon>
                    <VaDropdown placement="right-start" stickToEdges trigger="hover">
                      <template #anchor="{ isOpened }">
                        <VaIcon :name="isOpened ? 'chevron_left': 'chevron_right'" />
                      </template>

                      <VaDropdownContent>
                        <VaMenuList>
                          <VaMenuItem>
                            Account 1
                          </VaMenuItem>
                          <VaMenuItem>
                            Account 2
                          </VaMenuItem>
                        </VaMenuList>
                      </VaDropdownContent>
                    </VaDropdown>
                  </template>
                </VaMenuItem>
              </VaMenuList>
            </VaDropdownContent>
          </VaDropdown>
        </template>
      </VaMenuItem>

      <VaDropdown placement="right-start" stickToEdges trigger="hover">
        <template #anchor="{ isOpened }">
          <VaMenuItem :rightIcon="isOpened ? 'chevron_left': 'chevron_right'">
            AA
          </VaMenuItem>
        </template>
          BBB
      </VaDropdown>
    </VaMenuList>
  `,
})
