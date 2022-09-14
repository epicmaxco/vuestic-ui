<template>
  <va-card class="gutters-demo" color="background">
    <div class="layout va-gutter-1">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex xs6">
          <div class="item">va-gutter-1</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout va-gutter-2">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex xs6">
          <div class="item">va-gutter-2</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout va-gutter-3">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex xs6">
          <div class="item">va-gutter-3</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout va-gutter-4">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex xs6">
          <div class="item">va-gutter-4</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout va-gutter-5">
      <div class="row">
        <div v-for="i in 2" :key="i" class="flex xs6">
          <div class="item">va-gutter-5</div>
        </div>
      </div>
    </div>
  </va-card>
</template>

<style lang="scss">
  @import '~vuestic-ui/src/styles/resources';

  .gutters-demo {
    padding: 0.75rem;

    .layout {
      background-color: $lighter-gray;
    }

    .item {
      background-color: $white;
      border: 1px solid $gray;
      text-align: center;
    }
  }
</style>
