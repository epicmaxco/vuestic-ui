<template>
<div>
  <va-button-dropdown
    class="mr-2 mb-2"
    @click="click"
    label="Click event"
  >
    Content
  </va-button-dropdown>
  <va-button-dropdown
    @mainButtonClick="mainButtonClick"
    split
    label="main button click event"
  >
    Content
  </va-button-dropdown>
</div>
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
