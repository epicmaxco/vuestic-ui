<template>
  <va-button-dropdown
    class="mr-2 mb-2"
    @click="click"
    label="Click event"
  >
    Content
  </va-button-dropdown>
  <va-button-dropdown
    @main-button-click="mainButtonClick"
    @click="click"
    split
    label="main button click event"
  >
    Content
  </va-button-dropdown>
</template>

<script>
export default {
  methods: {
    click () {
      alert('click')
    },
    mainButtonClick () {
      alert('main-button-click')
    },
  },
}
</script>
