<template>
  <transition
    v-if="value"
    name="fade"
  >
    <div
      class="va-alert"
      :style="alertStyle"
    >
      <div class="va-alert__content">
        <slot />
      </div>

      <va-icon
        v-if="closeable"
        class="va-alert__close-icon"
        :color="color"
        name="close"
        @click.native="hideAlert()"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import VaIcon from '../va-icon/VaIcon.vue'
import {
  getHoverColor,
  getBoxShadowColor,
} from '../../../services/color-functions'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins, Prop } from 'vue-property-decorator'

const AlertPropsMixin = makeContextablePropsMixin({
  color: { type: String, default: 'success' },
  closeable: { type: Boolean, default: false },
})

@Component({
  name: 'VaAlert',
  components: { VaIcon },
})
export default class VaAlert extends Mixins(
  AlertPropsMixin,
) {
  @Prop({
    type: Boolean,
    default: true,
  }) readonly value!: boolean

  get alertStyle () {
    return {
      background: getHoverColor((this as any).$themes[this.color]),
      boxShadow: '0 0.125rem 0.125rem 0 ' + getBoxShadowColor((this as any).$themes[this.color]),
    }
  }

  hideAlert (): void {
    this.$emit('input', false)
  }
}
</script>

<style lang='scss'>
@import "../../vuestic-sass/resources/resources";

// Alerts
$va-alert-margin-y: 0.25rem;
$va-alert-padding-x: 0.5rem;
$va-alert-padding-y: 0.75rem;
$va-alert-border: 0;
$va-alert-border-radius: 0.5rem;
$va-alert-box-shadow: 0.125rem;

// Badge
$va-badge-margin-right: 0.5rem;
$va-badge-padding-x: 0.5rem;
$va-badge-padding-y: 0.125rem;
$va-badge-border-radius: 0.5rem;
$va-badge-font-size: 0.625rem;
$va-badge-letter-spacing: 0.0625rem;

// Close Icon
$va-close-icon-padding-x: 0.5rem;
$va-close-icon-padding-y: 0.0625rem;
$va-close-icon-font-size: 1.5rem;

.va-alert {
  padding: $va-alert-padding-y $va-alert-padding-x;
  margin: $va-alert-margin-y auto;
  display: flex;
  align-items: center;
  border: $va-alert-border solid transparent;
  border-radius: $va-alert-border-radius;

  &__content {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  &__close-icon {
    padding: $va-close-icon-padding-y $va-close-icon-padding-x;
    font-size: $va-close-icon-font-size;
    cursor: pointer;
  }

  @include media-breakpoint-down(xs) {
    @at-root {
      .va-alert {
        &__content {
          flex-direction: column;
          align-items: flex-start;
        }

        &__close-icon {
          align-self: flex-start;
          display: flex;
          align-items: flex-start;
          padding: 0;
          padding-right: $va-close-icon-padding-x;
          margin: 0;
        }
      }
    }
  }
}
</style>
