<template>
  <va-app-bar v-if="enabled" bottom fixed hide-on-scroll>
    <va-button icon="home" color="#fff" preset="secondary" />
    <va-button icon="info" color="#fff" preset="secondary" />
    <va-button icon="battery" color="#fff" preset="secondary" />
    <va-spacer />
    <va-button color="#fff" preset="secondary">Login</va-button>
    <va-button-dropdown preset="secondary" color="#fff" icon-color="#fff">
      Content
    </va-button-dropdown>
  </va-app-bar>
  <va-button @click="enabled = !enabled"
    >Enable/Disable fixed app bar example</va-button
  >
</template>

<script>
export default {
  data: () => ({
    enabled: false,
  }),
};
</script>
