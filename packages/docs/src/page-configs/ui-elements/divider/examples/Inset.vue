<template>
  <div class="my-5 flex lg4">
    <p class="example-item">
      <va-icon name="home" />
      <span class="float-right">I'm a list item</span>
    </p>
    <va-divider inset />
    <p class="example-item">
      <va-icon name="home" />
      <span class="float-right">I'm a list item</span>
    </p>
    <va-divider inset />
  </div>
</template>

<style scoped>
.example-item {
  height: 50px;
  line-height: 50px;
  color: #7f828b;
  vertical-align: middle;
}

.float-right {
  float: right;
}
</style>
