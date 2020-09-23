<template>
  <div
    style="position: relative; height: 10rem; width: 100%; border: 2px solid black;"
    class="row"
  >
  <va-checkbox v-model="enabled" style="margin-left: 20rem;" label="Enabled"/>
    <va-sidebar v-model="enabled">
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
      enabled: true,
    }
  },
}
</script>
