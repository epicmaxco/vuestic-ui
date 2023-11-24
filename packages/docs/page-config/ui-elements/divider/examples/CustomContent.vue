<template>
  <div class="my-8 flex flex-col lg4 xs12">
    <p class="example-item">
      <VaIcon
        class="ml-3"
        name="home"
      />
      <span class="ml-6">I'm a list item</span>
    </p>
    <VaDivider>
      <span class="px-2">default (center)</span>
    </VaDivider>
    <p class="example-item">
      <VaIcon
        class="ml-3"
        name="home"
      />
      <span class="ml-6">I'm a list item</span>
    </p>
    <VaDivider orientation="left">
      <span class="px-2">left</span>
    </VaDivider>
    <p class="example-item">
      <VaIcon
        class="ml-3"
        name="home"
      />
      <span class="ml-6">I'm a list item</span>
    </p>
    <VaDivider orientation="center">
      <span class="px-2">center</span>
    </VaDivider>
    <p class="example-item">
      <VaIcon
        class="ml-3"
        name="home"
      />
      <span class="ml-6">I'm a list item</span>
    </p>
    <VaDivider orientation="right">
      <span class="px-2">right</span>
    </VaDivider>
  </div>
</template>

<style scoped>
.example-item {
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  color: #7f828b;
}
</style>
