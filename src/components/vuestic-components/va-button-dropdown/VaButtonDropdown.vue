<template>
  <div :class="computedClass">
    <va-dropdown
      :disabled="disabled"
      :position="position"
      v-if="!split"
    >
      <va-button
        slot="anchor"
        :small="buttonProps.small"
        :large="buttonProps.large"
        :flat="buttonProps.flat"
        :outline="buttonProps.outline"
        :disabled="disabled"
        :color="color"
        :iconRight="icon"
        @click="click"
      >
        <slot name="label">{{label}}</slot>
      </va-button>
      <div class="va-button-dropdown__content">
        <slot/>
      </div>
    </va-dropdown>
    <va-button-group v-else>
      <va-button
        :small="buttonProps.small"
        :large="buttonProps.large"
        :flat="buttonProps.flat"
        :outline="buttonProps.outline"
        :disabled="disabled || buttonDisabled"
        :color="color"
        :href="splitHref"
        @click="mainButtonClick"
      >
        <slot name="label">{{label}}</slot>
      </va-button>
      <va-dropdown
        :disabled="disabled || dropdownDisabled"
        :position="position"
      >
        <va-button
          :small="buttonProps.small"
          :large="buttonProps.large"
          :flat="buttonProps.flat"
          :outline="buttonProps.outline"
          :disabled="disabled || dropdownDisabled"
          :color="color"
          :icon="icon"
          slot="anchor"
          @click="click"
        />
        <div class="va-button-dropdown__content">
          <slot/>
        </div>
      </va-dropdown>
    </va-button-group>
  </div>

</template>

<script>
import VaDropdown from '../va-dropdown/VaDropdown'
import VaButton from '../va-button/VaButton'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import VaButtonGroup from '../va-button-group/VaButtonGroup'

export default {
  name: 'va-button-dropdown',
  components: { VaButtonGroup, VaButton, VaDropdown },
  mixins: [ColorThemeMixin],
  props: {
    value: {
      type: Boolean,
    },
    buttonProps: {
      type: Object,
      default: () => ({
        small: false,
        large: false,
        flat: false,
        outline: false,
      }),
    },
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    buttonDisabled: {
      type: Boolean,
    },
    dropdownDisabled: {
      type: Boolean,
    },
    position: {
      type: String,
      default: 'bottom',
    },
    icon: {
      type: String,
      default: 'fa fa-angle-down',
    },
    split: {
      type: Boolean,
    },
    splitHref: {
      type: String,
    },
  },
  computed: {
    computedClass () {
      return {
        'va-button-dropdown': true,
        'va-button-dropdown--split': this.split,
        'va-button-dropdown--small': this.buttonProps.small,
        'va-button-dropdown--large': this.buttonProps.large,
      }
    },
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    },
    mainButtonClick (e) {
      this.$emit('mainButtonClick', e)
    },
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-button-dropdown {
  .va-dropdown__anchor {
    display: inline-block;
    margin: $btn-margin;
  }
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
  }
}
</style>
