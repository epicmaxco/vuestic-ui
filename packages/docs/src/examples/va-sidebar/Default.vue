<template>
  <div
    style="position: relative; height: 13rem; width: 100%; border: 2px solid black;"
    class="row"
  >
    <va-sidebar textColor="dark">
      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-icon name="dashboard" />
          <!-- User can hide item with css if he wants -->
          <va-sidebar-item-title>
            Dashboard
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>

      <va-sidebar-item active>
        <va-sidebar-item-content>
          <va-icon name="room" />
          <va-sidebar-item-title>
            Sidebar demo
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>
