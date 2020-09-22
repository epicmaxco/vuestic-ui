<template>
  <div
    style="position: relative; height: 10rem; width: 100%; color: white; border: 2px solid black;"
    class="row"
  >
  <va-checkbox v-model="minimized" style="margin-left: 20rem; color: black;" label="Minimized"/>
    <va-sidebar :minimized="minimized" minimized-width="0"> </va-sidebar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      minimized: false,
    }
  },
}
</script>
