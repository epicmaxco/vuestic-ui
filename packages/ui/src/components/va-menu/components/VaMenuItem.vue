<template>
  <tr class="va-menu-item"
    :class="{
      'va-menu-item--disabled': disabled
    }"
    @click.stop="disabled ? '' : $emit('option-click', $event)"
  >
    <td class="va-menu-item__cell va-menu-item__cell--left">
      <slot name="left-icon">
        <VaIcon class="va-menu-item__icon--left" v-if="icon" :name="icon" />
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
        <VaIcon v-if="rightIcon" class="va-menu-item__icon--right" :name="rightIcon" />
      </slot>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { VaIcon } from '../../va-icon/'

export default defineComponent({
  name: 'VaMenuItem',
  components: { VaIcon },
  props: {
    name: { type: String, default: '' },
    icon: { type: String, defatult: '' },
    rightIcon: { type: String, defatult: '' },
    disabled: { type: Boolean, default: false },
  },
  setup (props) {
    return {}
  },
})
</script>

<style lang="scss">
.va-menu-item {
  display: table-row;
  cursor: pointer;
  padding: 18px;

  --padding-x: 12px;
  --padding-y: 4px;

  &__cell {
    display: table-cell;
    vertical-align: middle;

    &--center {
      padding: var(--padding-y) var(--padding-x);
      text-align: left;
      width: 100%;
    }

    &--left, &--right {
      padding: 0 var(--padding-x);
      text-align: center;
      min-width: 1px;

      &:empty {
        padding: 0;
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
    background-color: lightgray;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
