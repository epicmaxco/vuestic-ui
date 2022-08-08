<template>
  <va-app-bar v-if="enabled" bottom fixed hide-on-scroll>
    <va-button icon="home" color="#fff" flat :rounded="false" />
    <va-button icon="info" color="#fff" flat :rounded="false" />
    <va-button icon="battery" color="#fff" flat :rounded="false" />
    <va-spacer />
    <va-button color="#fff" flat :rounded="false">Login</va-button>
    <va-button-dropdown size="small" flat color="#fff" icon="ellipsis">
      Content
    </va-button-dropdown>
  </va-app-bar>
  <va-button @click="enabled = !enabled">Enable/Disable fixed app bar example</va-button>
</template>

<script>
export default {
  data: () => ({
    enabled: false,
  }),
}
</script>
