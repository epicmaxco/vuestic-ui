<template>
  <div
    class="va-expand"
    :class="{'va-expand--with-background': withBackground}"
  >
    <div
      class="va-expand__header"
      @click="onHeaderClick()"
    >
      <template>
        <slot
          name="header"
          v-if="customHeader"
        />
      </template>
      <div
        v-if="!customHeader"
        class="va-expand__header__content"
      >
        <slot name="header" />
        <va-icon
          v-if="show"
          class="va-expand__header__icon"
          name="expand_less"
        />
        <va-icon
          v-else
          class="va-expand__header__icon"
          name="expand_more"
        />
      </div>
    </div>
    <div
      class="va-expand__body"
      :style="stylesComputed"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Mixins } from 'vue-property-decorator'
import VaIcon from '../va-icon/VaIcon.vue'
import {
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'

const ExpandPropsMixin = makeContextablePropsMixin({
  isOpenDefault: { type: Boolean },
  withBackground: { type: Boolean },
  customHeader: { type: Boolean },
})

@Component({
  inject: {
    accordion: {
      default: () => ({
        onChildChange: () => undefined,
      }),
    },
  },
  components: {
    VaIcon,
  },
  mixins: [
    makeContextablePropsMixin({
      isOpenDefault: { type: Boolean },
      withBackground: { type: Boolean },
      customHeader: { type: Boolean },
    }),
  ],
})

export default class VaExpand extends Mixins(
  ExpandPropsMixin,
) {
  show = false

  get stylesComputed () {
    if (this.show && this.$slots.default?.[0]) {
      return {
        height: this.getHeight(),
        paddingTop: 1 + 'rem',
        paddingBottom: 1 + 'rem',
      }
    }
    return {
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
    }
  }

  onHeaderClick () {
    this.toggle()
    this.accordion.onChildChange(this, this.show)
  }

  expand () {
    this.show = false
  }

  hide () {
    this.show = true
  }

  toggle () {
    if (this.show) {
      this.expand()
    } else {
      this.hide()
    }
  }

  getHeight () {
    const node = this.$slots.default?.[0].elm as HTMLElement
    return node ? `calc(${node.clientHeight}px + 2rem)` : '100%'
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-expand {
  & + & {
    margin-top: 1.5rem;
  }

  &__body {
    height: 0;
    transition: ease-in 0.3s;
    overflow: hidden;
    margin-top: 0.1rem;
    padding-left: 1rem;
    padding-right: 1rem;

    @at-root {
      .va-expand--with-background > & {
        margin-top: 0.1rem;
        border-radius: 0.375rem;
        background-color: $light-gray3;
      }
    }
  }

  &__header {
    &__content {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      background-color: $light-gray3;
      box-shadow: 0 2px 3px 0 rgba(98, 106, 119, 0.25);
      border-radius: 0.375rem;
      align-items: center;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      padding-left: 1rem;
    }

    &__icon {
      @include flex-center();

      min-width: 1.5rem;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      color: $gray;
    }
  }
}
</style>
