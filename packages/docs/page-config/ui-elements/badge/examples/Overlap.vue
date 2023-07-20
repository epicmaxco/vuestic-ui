<template>
  <div class="flex items-center">
    <va-badge
      dot
      overlap
      placement="bottom-right"
      :offset="[-7, -7]"
      class="mr-8"
    >
      <va-avatar src="https://randomuser.me/api/portraits/women/1.jpg" />
    </va-badge>

    <va-badge
      text="5"
      overlap
      class="mr-6"
      :offset="[-3,3]"
    >
      <va-icon name="&#xe0cb;" />
    </va-badge>

    <va-badge
      text="5"
      overlap
      class="mr-6"
      :offset="[-3,3]"
      style="--va-badge-text-wrapper-border-radius: 50%;"
    >
      <va-icon name="&#xe0cb;" />
    </va-badge>

    <va-badge
      placement="bottom-end"
      text="99+"
      overlap
      :offset="[0,-4]"
      style="--va-badge-text-wrapper-border-radius: 40px;"
    >
      <va-icon name="mail_outline" />
    </va-badge>
  </div>
</template>
<script setup>
</script>
