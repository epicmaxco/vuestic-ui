<template>
  <div class="spacing-demo">
    <div class="mb-6">
      <span
        v-for="i in 5"
        :key="i"
        class="rectangle"
      >no spacing</span>
    </div>
    <div class="va-spacing-x-1 mb-6">
      <span
        v-for="i in 5"
        :key="i"
        class="rectangle"
      >va-spacing-x-1</span>
    </div>
    <div class="va-spacing-x-2 mb-6">
      <span
        v-for="i in 5"
        :key="i"
        class="rectangle"
      >va-spacing-x-2</span>
    </div>
    <div class="va-spacing-x-3 mb-6">
      <span
        v-for="i in 5"
        :key="i"
        class="rectangle"
      >va-spacing-x-3</span>
    </div>
    <div class="va-spacing-x-4 mb-6">
      <span
        v-for="i in 5"
        :key="i"
        class="rectangle"
      >va-spacing-x-4</span>
    </div>
    <div class="va-spacing-x-5">
      <span
        v-for="i in 5"
        :key="i"
        class="rectangle"
      >va-spacing-x-5</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spacing-demo {
  .rectangle {
    padding: 0.5rem;
    background-color: var(--va-background-element);
  }
}
</style>
