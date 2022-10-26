<template>
  <div class="mb-4" style="height: 16rem;">
    <va-sidebar color="primary" minimizedWidth="64px" width="18rem">
      <va-sidebar-item active-color="backgroundPrimary">
        <va-sidebar-item-content>
          <va-sidebar-item-title>
            background primary and white text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="backgroundPrimary"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>

  <div class="mb-4" style="height: 16rem;">
    <va-sidebar color="background-element" minimizedWidth="64px" width="18rem">
      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-sidebar-item-title>
            background dark and auto text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>

  <div class="mb-4" style="height: 16rem; border: 1px solid var(--va-secondary);">
    <va-sidebar color="success" minimizedWidth="64px" width="18rem">
      <va-sidebar-item active-color="backgroundPrimary">
        <va-sidebar-item-content>
          <va-sidebar-item-title>
            background success and auto text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="backgroundPrimary"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>

  <div class="mb-4" style="height: 16rem;">
    <va-sidebar color="danger" active-color="backgroundPrimary" text-color="success" minimizedWidth="64px" width="18rem">
      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-sidebar-item-title>
            background danger and success text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.title }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Sidebar demo', icon: 'room', active: true },
        { title: 'Loop', icon: 'loop' },
      ],
    }
  },
}
</script>
