<template>
  <div
    style="position: relative; height: 13rem; width: 100%; border: 2px solid black;"
    class="row"
  >
    <va-checkbox
      v-model="minimized"
      style="margin-left: 20rem; color: black;"
      label="Minimized"
    />
    <va-sidebar :minimized="minimized" minimized-width="3rem">
      <va-list style="background-color: inherit; color: white;">
        <va-list-item
          ><va-icon name="home" size="large"></va-icon>
          <div style="margin-left: 0.5rem;">Home</div></va-list-item
        >
        <va-list-item
          ><va-icon name="close" size="large"></va-icon>
          <div style="margin-left: 0.5rem;">Close</div></va-list-item
        >
        <va-list-item
          ><va-icon name="loop" size="large"></va-icon>
          <div style="margin-left: 0.5rem;">Loop</div></va-list-item
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
