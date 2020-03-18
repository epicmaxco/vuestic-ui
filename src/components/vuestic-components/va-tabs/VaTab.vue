<template>
  <div
    :class="{
      'va-tab': true,
      'va-tab--active': isActive,
      'va-tab--disabled': disabled
    }"
    @click="onTabClick"
  >
    <div
      class="va-tab__content"
      ref="content"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaTab',
  props: {
    disabled: {
      type: Boolean,
    },
  },
  data () {
    return {
      isActive: false,
    }
  },
  inject: {
    tabGroup: {
      default: null,
    },
  },
  created () {
    this.tabGroup && this.tabGroup.register(this)
  },
  beforeDestroy () {
    this.tabGroup && this.tabGroup.unregister(this)
  },
  methods: {
    onTabClick () {
      this.$emit('tabClick', !this.isActive)
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-tab {
  align-items: center;
  display: inline-flex;
  flex: 0 1 auto;
  font-weight: $font-weight-bold;
  line-height: normal;
  height: inherit;
  max-width: 264px;
  text-align: center;
  vertical-align: middle;
  padding: 0.4375rem 0.75rem;
  cursor: pointer;

  &:not(.va-tab--active) {
    opacity: 0.5;
  }

  &__content {
    align-items: center;
    color: inherit;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    justify-content: center;
    max-width: inherit;
    text-decoration: none;
    transition: $transition-primary;
    user-select: none;
    white-space: normal;
  }

  .va-tab--disabled {
    .va-tab__container {
      @include va-disabled();
    }

    pointer-events: none;
    cursor: inherit;
  }
}
</style>
