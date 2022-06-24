<template>
  <div style="height: 13rem; border: 1px solid var(--va-secondary);">
    <va-sidebar textColor="dark">
      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-icon name="dashboard" />
          <!-- User can hide item with css if he wants -->
          <va-sidebar-item-title>Dashboard</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>

      <va-sidebar-item active>
        <va-sidebar-item-content>
          <va-icon name="room" />
          <va-sidebar-item-title>Sidebar demo</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>

      <va-sidebar-item>
        <va-sidebar-item-content>
          <va-icon name="loop" />
          <va-sidebar-item-title>Loop</va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>
