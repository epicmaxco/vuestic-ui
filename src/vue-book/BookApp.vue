<template>
  <router-view/>
</template>

<script>
export default {
  name: 'book-app',
  provide () {
    return {
      contextConfig: {
        'gradient': true,
        'shadow': 'lg', // 3 states: 'sm', 'lg', undefined (no shadow).
        'invertedColor': true,
      },
    }
  },
}
</script>

<style lang="scss">
@import "./book-main";

.book-app {

}
</style>
