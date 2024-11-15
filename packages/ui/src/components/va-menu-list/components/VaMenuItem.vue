<template>
  <tr class="va-menu-item"
    v-bind="makeMenuItemAttributes({ disabled })"
    :class="{
      'va-menu-item--disabled': disabled,
      'va-menu-item--keyboard-focus': hasKeyboardFocus,
    }"
    @click="$emit('selected')"
    @keydown.enter.space="$emit('selected')"
  >
    <td class="va-menu-item__cell va-menu-item__cell--left">
      <slot name="left-icon">
        <VaIcon class="va-menu-item__icon--left" v-if="icon" :name="icon" va-child="leftIcon" />
      </slot>
    </td>

    <td class="va-menu-item__cell va-menu-item__cell--center">
      <slot>
        <a class="va-menu-item__content">
          {{ name }}
        </a>
      </slot>
    </td>

    <td class="va-menu-item__cell va-menu-item__cell--right">
      <slot name="right-icon">
        <VaIcon v-if="rightIcon" class="va-menu-item__icon--right" :name="rightIcon" va-child="rightIcon" />
      </slot>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { VaIcon } from '../../va-icon/'
import { useCurrentElement, useElementFocusedKeyboard, defineChildProps, useChildComponents } from '../../../composables'
import { makeMenuItemAttributes } from '../composables/useMenuKeyboardNavigation'

defineOptions({
  name: 'VaMenuItem',
})

const props = defineProps({
  name: { type: String, default: '' },
  icon: { type: String, defatult: '' },
  rightIcon: { type: String, defatult: '' },
  disabled: { type: Boolean, default: false },
  ...defineChildProps({
    leftIcon: VaIcon,
    rightIcon: VaIcon,
  }),
})

const emit = defineEmits(['selected'])

useChildComponents(props)
const hasKeyboardFocus = useElementFocusedKeyboard(useCurrentElement())
</script>

<style lang="scss">
@import "../../../styles/resources";

.va-menu-item {
  display: table-row;
  cursor: pointer;
  position: relative;

  @include va-background(var(--va-menu-item-hover-color), 0);

  &__cell {
    display: table-cell;
    vertical-align: middle;

    &--center {
      padding: 0 var(--va-menu-padding-x);
      text-align: left;
      width: 100%;
    }

    &--left,
    &--right {
      padding: 0 var(--va-menu-padding-x);
      text-align: center;
      min-width: 1px;
      white-space: nowrap;

      &:empty {
        padding: 0;
        width: 0;
      }
    }

    &--left {
      padding-right: 0;
    }

    &--right {
      padding-left: 0;
    }
  }

  &:hover {
    @include va-background-opacity(var(--va-menu-item-hover-color), var(--va-menu-item-hover-opacity));
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--keyboard-focus {
    @include focus-outline();
  }
}
</style>
