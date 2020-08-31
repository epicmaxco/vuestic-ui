<template>
  <VbDemo>
    <VbCard title="default">
      <div class="demo__sidebar-container">
        <va-sidebar>
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="right">
      <div class="demo__sidebar-container">
        <va-sidebar position="right">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="width">
      100%
      <div class="demo__sidebar-container">
        <va-sidebar width="100%">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
      6rem
      <div class="demo__sidebar-container">
        <va-sidebar width="6rem">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="minimized" :state="{minimized: true}" #default="{state}">
      <va-checkbox v-model="state.minimized" label="minimized"/>
      <br/>
      <div class="demo__sidebar-container-2x">
        <va-sidebar :minimized="state.minimized">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
        <va-sidebar :minimized="state.minimized" position="right">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="hoverable">
      <div class="demo__sidebar-container-2x">
        <va-sidebar hoverable>
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
        <va-sidebar hoverable position="right">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="hoverable + minimized">
      <div class="demo__sidebar-container-2x">
        <va-sidebar hoverable minimized>
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
        <va-sidebar hoverable minimized position="right">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>

    <VbCard title="Sidebar" style="width: 100%; height: 80%; background-color: #f1f1f1;">
      <div style="display: flex; justify-content: space-between;">
        <va-checkbox v-model="hoverable" label="hoverable"/>
        <va-checkbox v-model="minimized" label="minimized"/>
        <div>
          <va-slider v-model="valueWidth"/>
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
      <div>
        <div>
          Sidebar:
        </div>
        <va-checkbox
          v-for="(sidebar, index) in sidebars"
          :key="index"
          v-model="sidebars[index]"
          :label="`sidebar ${index}: ${sidebar}`"
        />
      </div>
      <div style="display: block; position: relative; width: inherit; height: 90%; background: linear-gradient(45deg, grey, transparent);">
        <!-- EXPAND -->
        <va-sidebar
          v-if="sidebars[1]"
          style="height: auto;"
          :minimized="minimized"
          position="right"
          color="#fff"
          :width="`${valueWidth}%`"
          :hoverable="hoverable"
        >
          <template>
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
          v-if="sidebars[0]"
          style="height: auto;"
          :minimized="minimized"
          color="secondary"
          :hoverable="hoverable"
          :width="`${valueWidth}%`"
          :position="selectedOptionString"
        >
          <template>
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
import VaRadio from '../va-radio/VaRadio'
import VaCheckbox from '../va-checkbox/VaCheckbox'
import VaExpand from '../va-expand/VaExpand'
import VaExpandGroup from '../va-expand-group/VaExpandGroup'
import VaList from '../va-list/VaList'
import VaListItem from '../va-list/VaListItem'
import VaListLabel from '../va-list/VaListLabel'
import VaListItemSection from '../va-list/VaListItemSection'
import VaListItemLabel from '../va-list/VaListItemLabel'
import VaIcon from '../va-icon/VaIcon'
import VaAvatar from '../va-avatar/VaAvatar'
import VaSlider from '../va-slider/VaSlider'
import { navigationRoutes } from './navigation-router-example'

export default {
  components: {
    VaSidebar,
    VaIcon,
    VaRadio,
    VaAvatar,
    VaCheckbox,
    VaSlider,
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
      sidebars: [
        false,
        false,
        true,
      ],
      selectedOptionString: 'left',
      value: 60,
      valueWidth: 20,
      valueExpand: [false, false, false, false],
      icon: 'info_outline',
      theme: 'info',
      items: navigationRoutes.routes,
      minimized: false,
      hoverable: false,
      contacts: [
        {
          name: 'Audrey Clay',
          address: '644 Vermont Court, Freelandville, Kentucky, 2619',
          img: 'https://randomuser.me/api/portraits/women/5.jpg',
        },
        {
          name: 'Aguirre Klein',
          address: '626 Carroll Street, Roulette, Ohio, 1477',
          img: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
          name: 'Tucker Kaufman',
          address: '887 Winthrop Street, Tryon, Florida, 3912',
          img: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
          name: 'Herbert Keller',
          address: '286 NW. Shore St.Longwood, FL 32779',
          img: 'https://randomuser.me/api/portraits/men/5.jpg',
        },
        { name: 'Audrey Clay', address: '644 Vermont Court, Freelandville, Kentucky, 2619', img: 'https://randomuser.me/api/portraits/women/5.jpg' },
        { name: 'Aguirre Klein', address: '626 Carroll Street, Roulette, Ohio, 1477', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Tucker Kaufman', address: '887 Winthrop Street, Tryon, Florida, 3912', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'Herbert Keller', address: '286 NW. Shore St.Longwood, FL 32779', img: 'https://randomuser.me/api/portraits/men/5.jpg' },
      ],
    }
  },
}
</script>

<style>
.demo__sidebar-container {
  position: relative;
  height: 10rem;
  width: 20rem;
}

.demo__sidebar-container-2x {
  position: relative;
  height: 10rem;
  width: 40rem;
}
</style>
