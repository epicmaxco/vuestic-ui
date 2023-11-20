<template>
  <div class="flex items-center">
    <VaBadge
      dot
      overlap
      placement="bottom-right"
      :offset="[-7, -7]"
      class="mr-8"
    >
      <VaAvatar src="https://randomuser.me/api/portraits/women/1.jpg" />
    </VaBadge>

    <VaBadge
      text="5"
      overlap
      class="mr-6"
      :offset="[-3,3]"
    >
      <VaIcon name="&#xe0cb;" />
    </VaBadge>

    <VaBadge
      text="5"
      overlap
      class="mr-6"
      :offset="[-3,3]"
      style="--va-badge-text-wrapper-border-radius: 50%;"
    >
      <VaIcon name="&#xe0cb;" />
    </VaBadge>

    <VaBadge
      placement="bottom-end"
      text="99+"
      overlap
      :offset="[0,-4]"
      style="--va-badge-text-wrapper-border-radius: 40px;"
    >
      <VaIcon name="mail_outline" />
    </VaBadge>
  </div>
</template>
<script setup>
</script>
