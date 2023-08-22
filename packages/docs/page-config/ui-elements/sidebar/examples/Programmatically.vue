<script setup>
  import { ref } from 'vue'

  const activeElement = ref('Address book')

  const items = [
    { title: 'Dashboard', icon: 'dashboard' },
    { title: 'Messages', icon: 'mail', children: [
      { title: 'Send', icon: 'send' },
      { title: 'Drafts', icon: 'drafts' },
    ] },
    { title: 'Address book', icon: 'room' },
    { title: 'Documents', icon: 'folder', children: [
      { title: 'Reports', icon: 'article' },
      { title: 'Notes', icon: 'note' },
    ] },
  ]
</script>

<template>
  <div style="height: 500px">
    <va-sidebar>
      <va-accordion>
        <template v-for="item in items">
          <va-collapse
            v-if="item.children"
            :key="item.title + 'collapse'"
            body-color="#00000022"
          >
            <template #header="{ value: isCollapsed }">
              <va-sidebar-item :active="item.children.some((child) => child.title === activeElement)">
                <va-sidebar-item-content>
                  <va-icon :name="item.icon" />
                  <va-sidebar-item-title>{{ item.title }}</va-sidebar-item-title>
                  <va-spacer />
                  <va-icon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
                </va-sidebar-item-content>
              </va-sidebar-item>
            </template>

            <va-sidebar-item
              v-for="child in item.children"
              :key="child.title"
              :active="child.title === activeElement"
              @click="activeElement = child.title"
            >
              <va-sidebar-item-content>
                <va-icon :name="child.icon" />
                <va-sidebar-item-title>{{ child.title }}</va-sidebar-item-title>
              </va-sidebar-item-content>
            </va-sidebar-item>
          </va-collapse>

          <va-sidebar-item
            v-else
            :key="item.title + 'item'"
            :active="item.title === activeElement"
            @click="activeElement = item.title"
          >
            <va-sidebar-item-content>
              <va-icon :name="item.icon" />
              <va-sidebar-item-title>{{ item.title }}</va-sidebar-item-title>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </template>
      </va-accordion>

      <va-spacer />

      <va-sidebar-item
        :active="'Settings' === activeElement"
        @click="activeElement = 'Settings'"
      >
        <va-sidebar-item-content>
          <va-icon name="settings" />
          <va-sidebar-item-title>Settings</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>
