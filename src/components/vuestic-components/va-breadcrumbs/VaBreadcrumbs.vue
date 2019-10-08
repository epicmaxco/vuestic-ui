<template>
  <div class="va-breadcrumbs" :class="computedClass">
    <span v-for="(item) in items" :key="item" class="va-breadcrumbs__item">
      <span class="va-breadcrumbs__item__text">{{item}}</span>
      <span class="va-breadcrumbs__item__separator">/</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'va-breadcrumbs',
  props: {
    align: {
      type: String,
      default: 'left',
      required: false,
    },
  },
  data () {
    return {
      items: [ 'One', 'Two', 'Three' ],
    }
  },
  computed: {
    computedClass () {
      return {
        'va-breadcrumbs--left': !this.align || this.align === 'left',
        'va-breadcrumbs--right': this.align === 'right',
        'va-breadcrumbs--center': this.align === 'center',
        'va-breadcrumbs--between': this.align === 'between',
        'va-breadcrumbs--around': this.align === 'around',
      }
    },
  },
}
</script>

<style lang="scss">
.va-breadcrumbs {
  display: flex;
  width: 100%;
  justify-content: center;

  &.va-breadcrumbs--left {
    justify-content: flex-start;
  }

  &.va-breadcrumbs--right {
    justify-content: flex-end;
  }

  &.va-breadcrumbs--center {
    justify-content: center;
  }
}

.va-breadcrumbs__item {
  display: inline-flex;
}

.va-breadcrumbs__item__separator {
  padding: 0 0.5rem;
  display: inline-flex;

  .va-breadcrumbs__item:last-child & {
    display: none;
  }
}

.va-breadcrumbs__item__text {
  display: inline-flex;
}

</style>
