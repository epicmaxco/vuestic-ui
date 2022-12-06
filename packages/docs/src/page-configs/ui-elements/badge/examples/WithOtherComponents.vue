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
      text="3"
      overlap
      class="mr-4"
    >
      <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
    </va-badge>

    <va-badge
      class="mr-4"
      dot
    >
      <va-avatar
        square
        src="https://randomuser.me/api/portraits/women/8.jpg"
      />
    </va-badge>

    <va-badge
      text="5 notifications"
      overlap
    >
      <va-button preset="primary">Profile</va-button>
    </va-badge>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const value = ref()
</script>
