<template>
  <div class="va-time-picker" :class="computedClass">
    <VaTimePickerColumn
      v-for="(column, idx) in columns" :key="idx"
      v-model:activeItemIndex="column.activeItem.value"
      :items="column.items"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useTimePicker } from './hooks/useTimePicker'
import VaTimePickerColumn from './components/VaTimePickerColumn.vue'
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'

export default defineComponent({
  components: { VaTimePickerColumn },

  props: {
    ...statefulComponentOptions.props,
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    modelValue: { type: Date, default: undefined },
    period: { type: Boolean, default: true },
    hidePeriodSwitch: { type: Boolean, default: false },
    view: { type: String as PropType<'hours' | 'minutes' | 'seconds'>, default: 'minutes' },
    hoursFilter: { type: Function as PropType<(h: number) => boolean> },
    minutesFilter: { type: Function as PropType<(h: number) => boolean> },
    secondsFilter: { type: Function as PropType<(h: number) => boolean> },
  },

  emits: [...statefulComponentOptions.emits],

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit, new Date())
    const { columns } = useTimePicker(props, valueComputed)

    const computedClass = computed(() => ({
      'va-time-picker--readonly': props.readonly,
      'va-time-picker--disabled': props.disabled,
    }))

    return {
      columns,
      computedClass,
    }
  },
})
</script>

<style lang="scss">
  @import './_variables.scss';

  @mixin after-overlay {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 999;
    }
  }

  .va-time-picker {
    display: var(--va-time-picker-display);
    justify-content: center;
    overflow: hidden;
    height: var(--va-time-picker-height);

    &--readonly {
      @include after-overlay();
    }

    &--disabled {
      @include after-overlay();

      opacity: var(--va-time-picker-disabled-opacity);
    }
  }
</style>
