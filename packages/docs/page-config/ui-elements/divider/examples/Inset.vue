<template>
  <div class="my-8 flex flex-col lg4">
    <p class="example-item">
      <VaIcon name="home" />
      <span class="float-right">I'm a list item</span>
    </p>
    <VaDivider inset />
    <p class="example-item">
      <VaIcon name="home" />
      <span class="float-right">I'm a list item</span>
    </p>
    <VaDivider inset />
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
