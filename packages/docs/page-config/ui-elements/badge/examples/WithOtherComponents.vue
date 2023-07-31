<template>
  <div class="flex items-center">
    <va-badge
      placement="top-left"
      text="New"
      overlap
      :offset="[32, 0]"
      class="mr-6"
      style="--va-badge-text-wrapper-border-radius: 40px;"

    >
      <va-card>
        <va-card-content>
          Next update is right behind the corner
        </va-card-content>
      </va-card>
    </va-badge>

    <va-badge
      placement="bottom-center"
      :offset="[0, -5]"
      overlap
      dot
      class="mr-8"
    >
      <va-icon name="&#xe0e1;" />
    </va-badge>

    <va-badge
      placement="top-left"
      dot
      overlap
      class="mr-8"
      :offset="[3, 3]"
    >
      <va-avatar
        src="https://randomuser.me/api/portraits/women/8.jpg"
        square
      />
    </va-badge>

    <va-badge
      overlap
    >
      <template #text>
        5+
      </template>
      <va-button preset="primary">
        Profile
      </va-button>
    </va-badge>
  </div>
</template>
<script setup>
</script>
