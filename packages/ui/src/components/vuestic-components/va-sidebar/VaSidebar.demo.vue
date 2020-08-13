<template>
  <VbDemo>
    <VbCard title="Sidebar" style="width: 100%; height: 100%; background-color: red;">
      <div style="display: flex; justify-content: space-between;">
        <va-switch v-model="hoverable" label="hoverable" />
        <va-switch v-model="minimized" label="minimized" />
        <div>
          <div>
            Position:
          </div>
        <va-radio
          v-for="(option, index) in options"
          :key="index"
          v-model="selectedOptionString"
          :option="option"
        />
        </div>
      </div>
      <div style="position: relative; width: inherit; height: inherit; background-image: url(https://wallpapercave.com/wp/wp4748242.png);">
      <!-- <va-sidebar
        style="height: auto;"
        :minimized="minimized"
        :right="right"
      >
        <template slot="menu">
          <template v-for="(item, index) in items">
            <sidebar-link-group
              :key="index"
              :minimized="minimized"
              icon="home"
              v-if="item.children"
            >
              <span slot="title">{{ item.displayName }}</span>
              <sidebar-link
                v-for="(subMenuItem) in item.children"
                :key="subMenuItem.name"
                :to="{ name: subMenuItem.name }"
              >
                <div slot="title">
                  <span>{{ subMenuItem.displayName }}</span>
                </div>
              </sidebar-link>
            </sidebar-link-group>

            <sidebar-link
              v-else
              :key="index"
              icon="warning"
              :to="{ name: item.name }"
            >
              <span slot="title">{{ item.displayName }}</span>
            </sidebar-link>
          </template>
        </template>
      </va-sidebar> -->

      <!-- EXPAND -->
      <va-sidebar
        style="height: auto; max-width: 300px;"
        :minimized="minimized"
        position="right"
        color="#fff"
        :hoverable="hoverable"
      >
        <template slot="menu">
          <va-list>
            <va-list-label>
              Contacts
            </va-list-label>
            <va-expand-group v-model="valueExpand">
            <va-expand
              v-for="(contact, index) in contacts"
              :key="index"
            >
              <template slot="header">
                <va-list-item>
                  <va-list-item-section avatar>
                    <va-avatar>
                      <img :src="contact.img">
                    </va-avatar>
                  </va-list-item-section>

                  <va-list-item-section>
                    <va-list-item-label>
                      {{ contact.name }}
                    </va-list-item-label>

                    <va-list-item-label caption>
                      {{ contact.address }}
                    </va-list-item-label>
                  </va-list-item-section>

                  <va-list-item-section icon>
                    <va-icon
                      name="remove_red_eye"
                      color="gray"
                    />
                  </va-list-item-section>
                </va-list-item>
              </template>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis ducimus earum optio id harum eos repellendus nobis, quidem beatae sapiente necessitatibus reiciendis voluptas. Dolores est, sequi quo voluptatum laboriosam optio!
            </va-expand>
            </va-expand-group>
          </va-list>
        </template>
      </va-sidebar>

      <!-- DEFAULT -->
      <va-sidebar
        style="height: auto;"
        :minimized="minimized"
        color="secondary"
        :hoverable="hoverable"
        :position="selectedOptionString"
      >
        <template slot="menu">
          <va-list>
            <va-list-label>
              Contacts
            </va-list-label>

            <va-list-item
              v-for="(contact, index) in contacts"
              :key="index"
            >
              <!-- <va-list-item-section avatar>
                <va-avatar>
                  <img :src="contact.img">
                </va-avatar>
              </va-list-item-section> -->

                  <va-list-item-section icon>
                    <va-icon
                      name="home"
                      color="gray"
                    />
                  </va-list-item-section>
              <va-list-item-section>
                <va-list-item-label>
                  {{ contact.name }}
                </va-list-item-label>

                <va-list-item-label caption>
                  {{ contact.address }}
                </va-list-item-label>
              </va-list-item-section>

              <va-list-item-section icon>
                <va-icon
                  name="remove_red_eye"
                  color="gray"
                />
              </va-list-item-section>
            </va-list-item>
          </va-list>
        </template>
      </va-sidebar>

      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSidebar from '../../vuestic-components/va-sidebar/VaSidebar'
import VaSwitch from '../va-switch/VaSwitch'
import VaRadio from '../va-radio/VaRadio'
// import SidebarLinkGroup from './VaSidebarLinkGroup'
// import SidebarLink from './VaSidebarLink'
import VaExpand from '../va-expand/VaExpand'
import VaExpandGroup from '../va-expand-group/VaExpandGroup'
import VaList from '../va-list/VaList'
import VaListItem from '../va-list/VaListItem'
import VaListLabel from '../va-list/VaListLabel'
import VaListItemSection from '../va-list/VaListItemSection'
import VaListItemLabel from '../va-list/VaListItemLabel'
import VaIcon from '../va-icon/VaIcon'
import VaAvatar from '../va-avatar/VaAvatar'
import { navigationRoutes } from './navigation-router-example'

export default {
  components: {
    VaSidebar,
    VaSwitch,
    VaIcon,
    VaRadio,
    VaAvatar,
    // SidebarLinkGroup,
    // SidebarLink,
    VaExpand,
    VaExpandGroup,
    VaList,
    VaListItem,
    VaListItemSection,
    VaListLabel,
    VaListItemLabel,
  },
  data () {
    return {
      options: [
        'left',
        'right',
        'top',
        'bottom',
      ],
      selectedOptionString: 'left',
      value: 60,
      valueExpand: [false, false, false, false],
      icon: 'info_outline',
      theme: 'info',
      items: navigationRoutes.routes,
      minimized: false,
      hoverable: false,
      contacts: [
        { name: 'Audrey Clay', address: '644 Vermont Court, Freelandville, Kentucky, 2619', img: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { name: 'Aguirre Klein', address: '626 Carroll Street, Roulette, Ohio, 1477', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Tucker Kaufman', address: '887 Winthrop Street, Tryon, Florida, 3912', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'Herbert Keller', address: '286 NW. Shore St.Longwood, FL 32779', img: 'https://randomuser.me/api/portraits/men/5.jpg' },
      ],
    }
  },
}
</script>
