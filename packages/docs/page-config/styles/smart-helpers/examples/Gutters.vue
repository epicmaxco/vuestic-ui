<template>
  <va-card
    class="gutters-demo"
    color="background-primary"
  >
    <div class="p-6">
      <div class="va-gutter-1 flex gap-6 bg-gray-200">
        <div
          class="item"
        >
          va-gutter-1
        </div>
      </div>

      <br>

      <div class="va-gutter-2 flex gap-6 bg-gray-200">
        <div
          v-for="i in 2"
          :key="i"
          class="item"
        >
          va-gutter-2
        </div>
      </div>

      <br>

      <div class="va-gutter-3 flex gap-6 bg-gray-200">
        <div
          v-for="i in 2"
          :key="i"
          class="item"
        >
          va-gutter-3
        </div>
      </div>

      <br>

      <div class="va-gutter-4 flex gap-6 bg-gray-200">
        <div
          v-for="i in 3"
          :key="i"
          class="item"
        >
          va-gutter-4
        </div>
      </div>

      <br>

      <div class="va-gutter-5 flex gap-6 bg-gray-200">
        <div
          v-for="i in 4"
          :key="i"
          class="item"
        >
          va-gutter-5
        </div>
      </div>
    </div>
  </va-card>
</template>

<style lang="scss" scoped>
.gutters-demo {
  .item {
    flex-grow: 1;
    background-color: var(--va-background-primary);
    border: 1px solid var(--va-background-border);
    text-align: center;
  }
}
</style>
