<template>
  <v-popover
    :trigger="trigger"
    :open="open"
    :disabled="disabled"
    :placement="placement"
    :autoHide="autoHide"
    popoverClass="va-popover"
    popoverInnerClass="va-popover__inner"
    popoverWrapperClass="va-popover__wrap"
  >
    <slot />
    <div
      slot="popover"
      class="va-popover__content"
      :style="computedPopoverStyle">
      <div v-if="icon" class="va-popover__icon">
        <i
          :class="icon"
          :style="computedIconStyle"
        />
      </div>
      <div v-if="title || message">
        <div v-if="title" class="va-popover__title">
          {{ title }}
        </div>
        <div class="va-popover__text">
          {{ message }}
        </div>
      </div>
      <div class="va-popover__triangle"></div>
    </div>
    <!-- <div class="va-popover__triangle"></div> -->
  </v-popover>
</template>

<script>
import { VPopover } from 'v-tooltip'
// import {
//   getHoverColor,
//   getBoxShadowColor,
// } from '../../../services/color-functions'

export default {
  name: 'va-popover',
  components: {
    VPopover,
  },
  props: {
    color: {
      type: String,
      default: 'success',
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    trigger: {
      type: String,
      default: 'hover',
    },
    open: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    autoHide: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    computedIconStyle () {
      return {
        fontSize: '1.5rem',
        color: this.$themes[this.color],
      }
    },
    computedPopoverStyle () {
      return {
        boxShadow: '0px 2px 3px 0 #414141',
        backgroundColor: '#414141',
        color: 'white',
      }
    },
  },
}
</script>

<style lang="scss">
.v-popover {
  display: inline;
}
.va-popover {
  margin-right: 5px;
  opacity: 1;
  border: none;
  border-radius: 0.5rem;
  background-color: white;

  &__content {
     display: flex;
     align-items: center;
     padding: 0.4rem 0.8rem;
     border-radius: 0.5rem;
     font-size: 1rem;
  }

  &__icon + div{
     padding-left: 0.75rem;
     width: 100%;
     overflow: hidden;
  }

  &__title {
    font-weight: bold;
    margin-bottom: 0.125rem;
  }

  &__text {
    line-height: 1.5;
  }
  &__triangle {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid $evollu-gray-dark;
    margin-right: -22px;
  }
}
</style>
