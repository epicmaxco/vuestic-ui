<template>
  <div class="my-5 flex lg4 xs12">
    <p class="example-item">
      <va-icon class="ml-3" name="home" />
      <span class="ml-4">I'm a list item</span>
    </p>
    <va-divider>
      <span class="px-2">default (center)</span>
    </va-divider>
    <p class="example-item">
      <va-icon class="ml-3" name="home" />
      <span class="ml-4">I'm a list item</span>
    </p>
    <va-divider orientation="left">
      <span class="px-2">left</span>
    </va-divider>
    <p class="example-item">
      <va-icon class="ml-3" name="home" />
      <span class="ml-4">I'm a list item</span>
    </p>
    <va-divider orientation="center">
      <span class="px-2">center</span>
    </va-divider>
    <p class="example-item">
      <va-icon class="ml-3" name="home" />
      <span class="ml-4">I'm a list item</span>
    </p>
    <va-divider orientation="right">
      <span class="px-2">right</span>
    </va-divider>
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
