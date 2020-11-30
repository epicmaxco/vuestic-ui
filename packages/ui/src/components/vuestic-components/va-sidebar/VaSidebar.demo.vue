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
      <va-checkbox v-model="state.minimized" label="minimized" />
      <br />
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
    <VbCard title="v-model" :state="{minimized: true}" #default="{state}">
      <va-checkbox v-model="state.minimized" label="v-model value" />
      <br />
      <div class="demo__sidebar-container-2x">
        <va-sidebar v-model="state.minimized">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
        <va-sidebar v-model="state.minimized" position="right">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
      </div>
    </VbCard>
    <VbCard title="minimized width" :state="{minimized: true}" #default="{state}">
      <va-checkbox v-model="state.minimized" label="minimized" />
      <br />
      <div class="demo__sidebar-container-2x">
        <va-sidebar :minimized="state.minimized" minimizedWidth="25%">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
        <va-sidebar :minimized="state.minimized" position="right" minimizedWidth="25%">
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
    <VbCard title="color">
      <div class="demo__sidebar-container">
        <va-sidebar color="secondary">
          <div>secondary</div>
        </va-sidebar>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSidebar from '../../vuestic-components/va-sidebar/VaSidebar'
import VaCheckbox from '../va-checkbox/VaCheckbox'
import { navigationRoutes } from './navigation-router-example'

export default {
  components: {
    VaSidebar,
    VaCheckbox,
  },
  data () {
    return {
      icon: 'info_outline',
      theme: 'info',
      items: navigationRoutes.routes,
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
