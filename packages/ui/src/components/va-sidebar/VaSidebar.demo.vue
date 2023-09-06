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
    <VbCard title="with sidebar items">
      <div class="demo__sidebar-container">
        <va-sidebar>
          <va-sidebar-item
            v-for="n in 10"
            :key="n"
          >
            <va-sidebar-item-content>
              Item {{ n }}
            </va-sidebar-item-content>
          </va-sidebar-item>
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
    <VbCard title="minimized">
      <va-checkbox v-model="minimized" label="minimized" />
      <br />
      <div class="demo__sidebar-container-2x">
        <va-sidebar :minimized="minimized">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="v-model">
      <va-checkbox v-model="doShowVmodelDemoSidebar" label="v-model value" />
      <br />
      <div class="demo__sidebar-container-2x">
        <va-sidebar v-model="doShowVmodelDemoSidebar">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="minimized width">
      <va-checkbox v-model="minimizedWithWidth" label="minimized" />
      <br />
      <div class="demo__sidebar-container-2x">
        <va-sidebar :minimized="minimizedWithWidth" minimizedWidth="25%">
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
      </div>
    </VbCard>
    <VbCard title="hoverable + minimized">
      <div class="demo__sidebar-container-2x">
        <va-sidebar hoverable minimized>
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="color">
      <div class="demo__sidebar-container-2x">
        <va-sidebar color="secondary">
          <div>secondary</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="sidebar item">
      <va-checkbox v-model="minimized" />

      <div class="demo__sidebar-container">
        <va-sidebar color="secondary" :minimized="minimized" minimizedWidth="64px">
          <va-sidebar-item>
            <va-sidebar-item-content>
              <va-icon name="dashboard" />
              <!-- User can hide item with css if he wants -->
              <va-sidebar-item-title v-if="!minimized">
                Dashboard
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>

          <va-sidebar-item active>
            <va-sidebar-item-content>
              <va-icon name="room" />
              <va-sidebar-item-title v-if="!minimized">
                Sidebar demo
              </va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="close on click outside">
      <va-checkbox v-model="doShowVmodelClickOutside" />
      <br />
      <div class="demo__sidebar-container-2x">
        <va-sidebar
          v-model="doShowVmodelClickOutside"
          close-on-click-outside
        >
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaSidebar, VaSidebarItem, VaSidebarItemContent, VaSidebarItemTitle } from './index'
import { VaCheckbox } from '../va-checkbox'
import { VaIcon } from '../va-icon'
import { navigationRoutes } from './navigation-router-example'

export default {
  components: {
    VaSidebar,
    VaCheckbox,
    VaSidebarItem,
    VaSidebarItemContent,
    VaSidebarItemTitle,
    VaIcon,
  },
  data () {
    return {
      icon: 'info_outline',
      theme: 'info',
      items: navigationRoutes.routes,
      minimized: true,
      minimizedWithWidth: true,
      doShowVmodelDemoSidebar: true,
      doShowVmodelClickOutside: true,
    }
  },
}
</script>

<style scoped>
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
