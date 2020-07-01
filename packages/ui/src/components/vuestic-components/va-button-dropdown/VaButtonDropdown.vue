<template>
  <div :class="computedClass">
    <va-dropdown
      v-if="!c_split"
      :disabled="c_disabled"
      :position="c_position"
      @input="toggleDropdown"
    >
      <va-button
        slot="anchor"
        :size="c_size"
        :flat="c_flat"
        :outline="c_outline"
        :disabled="c_disabled"
        :color="c_color"
        :icon-right="computedIcon"
        @click="click"
      >
        <slot name="label">
          {{ c_label }}
        </slot>
      </va-button>
      <div class="va-button-dropdown__content">
        <slot />
      </div>
    </va-dropdown>
    <va-button-group v-else>
      <va-button
        :size="c_size"
        :flat="c_flat"
        :outline="c_outline"
        :disabled="c_disabled || c_disableButton"
        :color="c_color"
        :to="c_splitTo"
        @click="mainButtonClick"
      >
        <slot name="label">
          {{ c_label }}
        </slot>
      </va-button>
      <va-dropdown
        :disabled="c_disabled || c_disableDropdown"
        :position="c_position"
        @input="toggleDropdown"
      >
        <va-button
          :size="c_size"
          :flat="c_flat"
          :outline="c_outline"
          :disabled="c_disabled || c_disableDropdown"
          :color="c_color"
          :icon="computedIcon"
          slot="anchor"
          @click="click"
        />
        <div class="va-button-dropdown__content">
          <slot />
        </div>
      </va-dropdown>
    </va-button-group>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Inject } from 'vue-property-decorator'
import VaDropdown from '../va-dropdown/VaDropdown.vue'
import VaButton from '../va-button/VaButton.vue'
import VaButtonGroup from '../va-button-group/VaButtonGroup.vue'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { SizeMixin } from '../../../mixins/SizeMixin'

const ButtonPropsMixin = makeContextablePropsMixin({
  value: { type: Boolean },
  outline: { type: Boolean, default: false },
  disableButton: { type: Boolean, default: false },
  disableDropdown: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => {
      return ['medium', 'small', 'large'].includes(value)
    },
  },
  split: { type: Boolean },
  splitTo: { type: String, default: '' },
  icon: { type: String, default: 'expand_more' },
  openedIcon: { type: String, default: 'expand_less' },
  position: { type: String, default: 'bottom' },
  label: { type: String },
})

@Component({
  name: 'VaButtonDropdown',
  components: { VaButtonGroup, VaButton, VaDropdown },
})
export default class VaButtonDropdown extends Mixins(
  SizeMixin,
  ButtonPropsMixin,
  ColorThemeMixin,
) {
  @Inject({
    default: () => ({}),
  }) readonly va!: any

  showDropdown = false

  get computedIcon (): string {
    const propsData: any = this.$options.propsData
    const resultedIcon = propsData.openedIcon || (propsData.icon ? this.c_icon : this.c_openedIcon)
    return this.showDropdown ? resultedIcon : this.c_icon
  }

  get computedClass () {
    return {
      'va-button-dropdown': true,
      'va-button-dropdown--split': this.c_split,
      'va-button-dropdown--normal': this.c_size === 'normal',
      'va-button-dropdown--large': this.c_size === 'large',
      'va-button-dropdown--small': this.c_size === 'small',
    }
  }

  click (event: Event): void {
    this.$emit('click', event)
  }

  mainButtonClick (event: Event): void {
    this.$emit('mainButtonClick', event)
  }

  toggleDropdown (value: boolean): void {
    this.showDropdown = value
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-button-dropdown {
  .va-button {
    margin: 0;
  }

  &--split {
    .va-dropdown {
      .va-dropdown__anchor {
        margin: 0;
      }

      .va-button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        font-size: 1.5rem;
      }
    }

    &.va-button-dropdown--small {
      .va-dropdown .va-button {
        font-size: 1.6rem;
      }
    }

    &.va-button-dropdown--large {
      .va-dropdown .va-button {
        font-size: 1.7rem;
      }
    }
  }

  &__content {
    background: $dropdown-background;
    box-shadow: $dropdown-box-shadow;
    padding: $dropdown-padding;
    border-radius: $dropdown-border-radius;
  }
}
</style>
