<template>
  <div class="mb-4" style="height: 16rem; border: 1px solid var(--va-secondary);">
    <va-sidebar color="primary" text-color="background" gradient minimizedWidth="64px" width="18rem">
      <va-sidebar-item text-color="background">
        <va-sidebar-item-content>
          <va-sidebar-item-title>
            background primary and 'background' text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="background"
        text-color="background"
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
    <va-sidebar color="dark" gradient minimizedWidth="64px" width="18rem">
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
        active-color="background"
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

  <div class="mb-4"  style="height: 16rem; border: 1px solid var(--va-secondary);">
    <va-sidebar color="success" gradient minimizedWidth="64px" width="18rem">
      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-sidebar-item-title>
            background success auto text color
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="background"
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
    <va-sidebar color="danger" gradient text-color="success" minimizedWidth="64px" width="18rem">
      <va-sidebar-item text-color="success">
        <va-sidebar-item-content>
          <va-sidebar-item-title>
            background danger, success text
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <va-sidebar-item
        v-for="item in items"
        :key="item.title"
        :active="item.active"
        active-color="background"
        text-color="success"
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
