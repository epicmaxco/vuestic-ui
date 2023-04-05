<template>
  <va-rating
    v-model="value"
    class="demo-rating"
  >
    <template #item="{ value, index }">
      <span
        class="demo-rating__item"
        :style="{
          color: value ? 'var(--va-primary)' : '',
          borderColor: value ? 'var(--va-primary)' : '',
        }"
      >
        {{ index }}
      </span>
    </template>
  </va-rating>
</template>

<script>
export default {
  data() {
    return {
      value: 3,
    };
  },
};
</script>

<style lang="scss">
.demo-rating {
  .va-rating-item {
    margin: 0 4px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__item {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border: 1px solid var(--va-secondary);
  }
}
</style>
