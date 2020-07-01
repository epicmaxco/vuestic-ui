<template>
  <transition
    v-if="valueComputed"
    name="fade"
  >
    <div
      class="va-alert"
      :style="alertStyle"
    >
      <div
        class="va-alert__icon"
        v-if="hasIcon"
      >
        <slot name="icon">
          <va-icon
            :color="c_color"
            :name="c_icon"
          />
        </slot>
      </div>

      <div
        class="va-alert__content"
        :style="contentStyle"
      >
        <div
          class="va-alert__title"
          v-if="hasTitle"
        >
          <slot name="title">
            {{c_title}}
          </slot>
        </div>
        <slot>
          {{c_description}}
        </slot>
      </div>

      <div
        class="va-alert__close"
        v-if="closeable"
      >
        <div
          class="va-alert__close--closeable"
          @click="hide()"
        >
          <slot name="close">
            <va-icon v-if="!c_closeText"
              :color="c_color"
              :name="closeIcon"
            />
            {{c_closeText}}
          </slot>
        </div>
      </div>

    </div>
  </transition>
</template>

<script lang="ts">
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import VaIcon from '../va-icon/VaIcon.vue'
import {
  getHoverColor,
  getBoxShadowColor,
} from '../../../services/color-functions'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins, Prop } from 'vue-property-decorator'

const AlertPropsMixin = makeContextablePropsMixin({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  closeIcon: { type: String, default: 'close' },
  closeText: { type: String, default: '' },
  color: { type: String, default: '' },
  closeable: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
})

@Component({
  name: 'VaAlert',
  components: { VaIcon },
})
export default class VaAlert extends Mixins(
  StatefulMixin,
  ColorThemeMixin,
  AlertPropsMixin,
) {
  @Prop({
    type: Boolean,
    default: true,
  }) readonly value!: boolean

  get hasIcon () {
    return this.c_icon || this.$slots.icon
  }

  get hasTitle () {
    return this.c_title || this.$slots.title
  }

  get alertStyle () {
    return {
      background: getHoverColor(this.colorComputed),
      boxShadow: '0 0.125rem 0.125rem 0 ' + getBoxShadowColor(this.colorComputed),
    }
  }

  get contentStyle () {
    return {
      alignItems: this.c_center && 'center',
    }
  }

  hide (): void {
    this.valueComputed = false
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

// Close
$va-close-padding-x: 0.5rem;
$va-close-padding-y: 0.0625rem;
$va-close-font-size: 1rem;

.va-alert {
  padding: $va-alert-padding-y $va-alert-padding-x;
  margin: $va-alert-margin-y auto;
  display: flex;
  align-items: center;
  border: $va-alert-border solid transparent;
  border-radius: $va-alert-border-radius;

  &__icon {
    display: flex;
    align-items: center;
    padding-right: $va-alert-padding-x;
  }

  &__title {
    display: flex;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
  }

  &__close {
    padding-left: $va-close-padding-x;
    font-size: $va-close-font-size;

    &--closeable {
      cursor: pointer;
    }
  }

  @include media-breakpoint-down(xs) {
    @at-root {
      .va-alert {
        &__content {
          flex-direction: column;
          align-items: flex-start;
        }

        &__close {
          align-self: flex-start;
          display: flex;
          align-items: flex-start;
          padding: 0;
          padding-right: $va-close-padding-x;
          margin: 0;
        }
      }
    }
  }
}
</style>
