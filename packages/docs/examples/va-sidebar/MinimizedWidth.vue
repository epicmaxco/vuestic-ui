<template>
  <div
    style="position: relative; height: 10rem; width: 100%; border: 2px solid black;"
    class="row"
  >
  <va-checkbox v-model="minimized" style="margin-left: 20rem; color: black;" label="Minimized"/>
    <va-sidebar :minimized="minimized" minimized-width="8rem">
      <ul style="color: white;">
        <li><span>item</span></li>
        <li><span>item</span></li>
        <li><span>item</span></li>
        <li><span>item</span></li>
        <li><span>item</span></li>
      </ul>
    </va-sidebar>
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
