<template>
  <div
    class="va-expand"
    :class="computedClasses"
  >
    <div
      class="va-expand__header"
      @click="onHeaderClick()"
    >
      <slot name="header">
        <div
          class="va-expand__header__content"
          :style="contentStyle"
        >
          <va-icon
            v-if="c_icon"
            class="va-expand__header__icon"
            :name="c_icon"
          />
          <div class="va-expand__header__text">
            {{c_header}}
          </div>
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
      </slot>
    </div>
    <div
      class="va-expand__body"
      :style="stylesComputed"
      ref="body"
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
  disabled: { type: Boolean, default: false },
  header: { type: String, default: '' },
  icon: { type: String, default: '' },
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
})

export default class VaExpand extends Mixins(
  ExpandPropsMixin,
) {
  show = false
  height = this.getHeight()
  mutationObserver: any = null

  get computedClasses () {
    return {
      'va-expand--disabled': this.c_disabled,
    }
  }

  get contentStyle () {
    if (this.c_icon) {
      return {
        paddingLeft: 0,
      }
    }
    return {}
  }

  get stylesComputed () {
    if (this.show && this.$slots.default?.[0]) {
      return {
        height: this.height,
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

  mount () {
    this.mutationObserver = new MutationObserver(() => {
      this.height = this.getHeight()
    })
    this.mutationObserver.observe(this.$refs.body, { attributes: true, childList: true, subtree: true })
  }

  beforeDestroy () {
    if (this.mutationObserver) { this.mutationObserver.disconnect() }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-expand {
  & + & {
    margin-top: 1.5rem;
  }

  &--disabled {
    @include va-disabled();

    pointer-events: none;
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

    &__text {
      width: 100%;
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
