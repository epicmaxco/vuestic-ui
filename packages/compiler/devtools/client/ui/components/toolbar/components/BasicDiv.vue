<script setup lang="ts">
  import ComponentSelectItem from '../ComponentSelectItem.vue';

  const code = `
<div>

</div>
  `
</script>

<template>
  <ComponentSelectItem title="Div" :code="code">
    <div class="div">

    </div>
  </ComponentSelectItem>
</template>

<style lang="scss" scoped>
  .div {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
  }
</style>
