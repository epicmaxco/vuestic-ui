<template>
  <div
    v-if="hidden"
    class="va-date-picker-cell va-date-picker-cell_clear"
  />
  <div
    v-else
    class="va-date-picker-cell"
    :class="{
      'va-date-picker-cell_other-month': otherMonth,
      'va-date-picker-cell_today': highlightToday && today,
      'va-date-picker-cell_in-range': inRange,
      'va-date-picker-cell_disabled': disabled,
      'va-date-picker-cell_highlighted-weekend': highlightWeekend && weekend,
      'va-date-picker-cell_selected': selected,
      'va-date-picker-cell_focused': focused,
      'va-date-picker-cell_readonly': readonly,
    }"
    @click="onClick"
    @keypress.space.enter.prevent.stop="onClick"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaDatePickerCell',

  props: {
    otherMonth: { type: Boolean, default: false },
    today: { type: Boolean, default: false },
    inRange: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    weekend: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    focused: { type: Boolean, default: false },
    highlightWeekend: { type: Boolean, default: false },
    highlightToday: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
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

<style lang="scss">
.va-date-picker-cell {
  position: relative;
  color: var(--va-date-picker-text-color);
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: var(--va-date-picker-cell-size);
  min-height: var(--va-date-picker-cell-size);
  min-width: var(--va-date-picker-cell-size);
  cursor: pointer;
  user-select: none;
  border-radius: var(--va-date-picker-cell-radius);
  box-sizing: border-box;
  text-align: center;
  z-index: 1;

  &::after,
  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    z-index: -1;
    user-select: none;
    box-sizing: border-box;
    border-radius: var(--va-date-picker-cell-radius);
  }

  &_clear {
    cursor: default;
    opacity: 0;
  }

  &_highlighted-weekend { color: var(--va-date-picker-weekends-color); }

  &_selected {
    background-color: var(--va-date-picker-selected-background);
    color: var(--va-date-picker-selected-text);
  }

  &_in-range {
    &::before {
      border: 2px solid var(--va-date-picker-color);
      opacity: 0.5;
    }
  }

  &_today {
    color: var(--va-date-picker-today-text);

    &::after {
      background-color: var(--va-date-picker-today-background);
      opacity: var(--va-date-picker-today-background-opacity);
    }
  }

  &_selected.va-date-picker-cell_today {
    &::before {
      border: 2px solid var(--va-date-picker-selected-text);
      opacity: 1;
    }

    &::after {
      opacity: 1;
    }
  }

  &_other-month {
    opacity: 0.5;
  }

  &:hover,
  &_focused,
  &_focused:hover {
    $focus-border-opacity: 0.8;

    &::before {
      border: 2px solid var(--va-date-picker-focused-border-color);
      opacity: $focus-border-opacity;
    }

    &.va-date-picker-cell_selected {
      &::before {
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        transform: translateY(2px) translateX(2px);
        padding: 2px;
        border: 2px solid var(--va-date-picker-focused-selected-border-color);
        opacity: $focus-border-opacity;
      }

      &.va-date-picker-cell_today {
        &::after {
          opacity: 0;
        }
      }
    }
  }

  &_disabled {
    cursor: default;
    color: var(--va-date-picker-secondary);
    opacity: 0.5;

    &::after {
      // Crossline
      opacity: 0.5;
      border: none;
      height: 2px;
      width: 50%;
      background: var(--va-date-picker-secondary);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &.va-date-picker-cell_today {
      color: var(--va-date-picker-today-text);

      &::after {
        background: var(--va-date-picker-today-text);
      }

      &::before {
        background-color: var(--va-date-picker-today-background);
        opacity: var(--va-date-picker-today-background-opacity);
      }
    }
  }

  &_readonly {
    cursor: default;

    &::before {
      display: none;
    }
  }
}
</style>
