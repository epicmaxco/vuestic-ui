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
    <VbCard title="minimized">
      <va-checkbox v-model="minimized" label="minimized" />
      <br />
      <div class="demo__sidebar-container-2x">
        <va-sidebar :minimized="minimized">
          <div>Item</div>
          <div>Item</div>
        </va-sidebar>
        <va-sidebar :minimized="minimized" position="right">
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
        <va-sidebar v-model="doShowVmodelDemoSidebar" position="right">
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
        <va-sidebar :minimized="minimizedWithWidth" position="right" minimizedWidth="25%">
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
import VaSidebar from './index'
import VaCheckbox from '../va-checkbox'
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
      minimized: true,
      minimizedWithWidth: true,
      doShowVmodelDemoSidebar: true,
    }
  },
}
</script>

<style scoped>
.va-sidebar div { /* sidebar items must be stylized outside of sidebar styles */
  color: white;
}

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
