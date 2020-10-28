<template>
  <div
    style="position: relative; height: 13rem; width: 100%; border: 2px solid black;"
    class="row"
  >
  <va-checkbox v-model="minimized" style="margin-left: 20rem;" label="Minimized"/>
    <va-sidebar :minimized="minimized">
      <va-list style="background-color: inherit; color: white;">
        <va-list-item
          ><va-icon name="home"></va-icon>
          <div style="margin-left: 0.5rem; text-align: end; min-width: 12rem;">Home</div></va-list-item
        >
        <va-list-item
          ><va-icon name="close"></va-icon>
          <div style="margin-left: 0.5rem; text-align: end; min-width: 12rem;">Close</div></va-list-item
        >
        <va-list-item
          ><va-icon name="loop"></va-icon>
          <div style="margin-left: 0.5rem; text-align: end; min-width: 12rem;">Loop</div></va-list-item
        >
      </va-list>
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
