<template>
  <VaAppBar
    v-if="enabled"
    bottom
    fixed
    hide-on-scroll
  >
    <VaButton
      icon="home"
      color="#fff"
      preset="secondary"
    />
    <VaButton
      icon="info"
      color="#fff"
      preset="secondary"
    />
    <VaButton
      icon="battery"
      color="#fff"
      preset="secondary"
    />
    <VaSpacer />
    <VaButton
      color="#fff"
      preset="secondary"
    >
      Login
    </VaButton>
    <VaButtonDropdown
      preset="secondary"
      color="#fff"
      icon-color="#fff"
    >
      Content
    </VaButtonDropdown>
  </VaAppBar>
  <VaButton @click="enabled = !enabled">
    Enable/Disable fixed app bar example
  </VaButton>
</template>

<script>
export default {
  data: () => ({
    enabled: false,
  }),
};
</script>
