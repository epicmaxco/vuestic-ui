<template>
  <div class="va-breadcrumbs">
    <span v-for="(item) in items" :key="item" class="va-breadcrumbs__item">
      <span class="va-breadcrumbs__item__text">{{item}}</span>
      <span class="va-breadcrumbs__item__separator">/</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'va-breadcrumbs',
  data () {
    return {
      items: [ 'one', 'two', 'tree' ],
    }
  },
  computed: {},
}
</script>

<style lang="scss">
.va-breadcrumbs {
  display: flex;
  width: 100%;
  justify-content: center;
}

.va-breadcrumbs__item__separator {
  .va-breadcrumbs__item:last-child & {
    display: none;
  }

}

</style>
