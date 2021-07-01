<template>
  <div
    v-if="hidden"
    class="va-date-picker-cell va-date-picker-cell_clear"
  />
  <div
    v-else
    class="va-date-picker-cell"
    :class="{
      'va-date-picker-cell_current-view': currentView,
      'va-date-picker-cell_today': hightlightToday && today,
      'va-date-picker-cell_in-range': inRange,
      'va-date-picker-cell_disabled': disabled,
      'va-date-picker-cell_hightlighted-weekend': hightlightWeekend && weekend,
      'va-date-picker-cell_selected': selected,
    }"
    @click="onClick"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaDatePickerCell',

  props: {
    currentView: { type: Boolean, default: false },
    today: { type: Boolean, default: false },
    inRange: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    weekend: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    hightlightWeekend: { type: Boolean, default: false },
    hightlightToday: { type: Boolean, default: false },
  },

  emits: ['click'],

  setup (props, { emit }) {
    const onClick = () => {
      if (!props.disabled) { emit('click') }
    }

    return {
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
$cell-size: 34px;

.va-date-picker-cell {
  position: relative;
  color: var(--va-secondary);
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  height: $cell-size;
  min-width: $cell-size;
  line-height: $cell-size;
  cursor: pointer;
  user-select: none;
  border-radius: 6px;
  text-align: center;

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    box-sizing: border-box;
    border-radius: 6px;
  }

  &:hover {
    &::after {
      background-color: var(--va-primary);
      opacity: 0.1;
    }
  }

  &_current-view {
    color: var(--va-dark);
  }

  &_today {
    &::after {
      background-color: var(--va-primary);
      opacity: 0.3;
    }
  }

  &_in-range {
    &::before {
      border: 2px solid var(--va-primary);
      opacity: 0.7;
    }
  }

  &_disabled {
    cursor: default;
    color: var(--va-secondary);
    opacity: 0.5;

    &::after {
      content: '';
      background: transparent;
      height: 1px;
      width: 55%;
      background-color: var(--va-secondary);
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }

    &:hover::after {
      // Do not hover disabled dates
      opacity: 1;
      background-color: var(--va-secondary);
    }

    &.va-date-picker-cell_today {
      &::after {
        background-color: var(--va-white);
        opacity: 0.7;
      }
    }
  }

  &_hightlighted-weekend {
    color: var(--va-danger);
  }

  &_selected {
    background-color: var(--va-primary);
    color: var(--va-white, white);
  }

  &_clear {
    cursor: default;

    &::after {
      display: none;
    }
  }
}
</style>
