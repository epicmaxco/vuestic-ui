<template>
  <va-card class="gutters-demo" color="background-primary">
    <div class="layout va-gutter-1">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex flex-col xs6">
          <div class="item">va-gutter-1</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout va-gutter-2">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex flex-col xs6">
          <div class="item">va-gutter-2</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout va-gutter-3">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex flex-col xs6">
          <div class="item">va-gutter-3</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout va-gutter-4">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex flex-col xs6">
          <div class="item">va-gutter-4</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout va-gutter-5">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex flex-col xs6">
          <div class="item">va-gutter-5</div>
        </div>
      </div>
    </div>
  </va-card>
</template>

<style lang="scss">
.gutters-demo {
  padding: 0.75rem;

  .layout {
    background-color: var(--va-background-element);
  }

  .item {
    background-color: var(--va-background-primary);
    border: 1px solid var(--va-background-border);
    text-align: center;
  }
}
</style>
