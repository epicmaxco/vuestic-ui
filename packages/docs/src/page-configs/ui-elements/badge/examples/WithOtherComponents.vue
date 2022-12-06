<template>
  <div style="display: flex; align-items: center;">
    <va-badge class="mr-4" text="New" overlap>
      <va-card>
        <va-card-content>
          Next update is right behind the corner
        </va-card-content>
      </va-card>
    </va-badge>

    <va-badge
      color="primary"
      text="3"
      overlap
      class="mr-4"
    >
      <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
    </va-badge>

    <va-badge
      class="mr-4"
      color="success"
      dot
      overlap
    >
      <va-avatar
        square
        src="https://randomuser.me/api/portraits/women/8.jpg"
      />
    </va-badge>

    <va-badge overlap>
      <template #text>
        <va-icon name="mdi-bell" size="12px" /> 5+
      </template>
      <va-button preset="primary">Profile</va-button>
    </va-badge>
  </div>
</template>
