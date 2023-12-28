<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <VaBadge
      placement="top-left"
      text="New"
      overlap
      :offset="[32, 0]"
      class="mr-6"
      style="--va-badge-text-wrapper-border-radius: 40px;"
    >
      <VaCard>
        <VaCardContent>
          Next update is right behind the corner
        </VaCardContent>
      </VaCard>
    </VaBadge>

    <VaBadge
      placement="bottom-center"
      :offset="[0, -5]"
      overlap
      dot
      class="mr-8"
    >
      <VaIcon name="&#xe0e1;" />
    </VaBadge>

    <VaBadge
      placement="top-left"
      dot
      overlap
      class="mr-8"
      :offset="[3, 3]"
    >
      <VaAvatar
        src="https://randomuser.me/api/portraits/women/8.jpg"
        square
      />
    </VaBadge>

    <VaBadge
      overlap
    >
      <template #text>
        5+
      </template>
      <VaButton preset="primary">
        Profile
      </VaButton>
    </VaBadge>
  </div>
</template>
<script setup>
</script>
