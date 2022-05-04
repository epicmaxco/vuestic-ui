<template>
  <div class="va-time-picker" :class="computedClass">
    <VaTimePickerColumn
      v-for="(column, idx) in columns" :key="idx"
      :ref="(el) => pickers.push(el)"
      :items="column.items"
      :tabindex="disabled ? -1 : 0"
      v-model:activeItemIndex="column.activeItem.value"
      @keydown.right.stop.prevent="focusNext()"
      @keydown.tab.exact.stop.prevent="focusNext()"
      @keydown.left.stop.prevent="focusPrev()"
      @keydown.shift.tab.stop.prevent="focusPrev()"
      @focus="activeColumnIndex = idx"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { useTimePicker } from './hooks/useTimePicker'
import VaTimePickerColumn from './components/VaTimePickerColumn.vue'
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'
import { useFormProps, useForm } from '../../composables/useForm'

export default defineComponent({
  name: 'VaTimePicker',

  components: { VaTimePickerColumn },

  props: {
    ...statefulComponentOptions.props,
    ...useFormProps,
    modelValue: { type: Date, required: false },
    ampm: { type: Boolean, default: false },
    hidePeriodSwitch: { type: Boolean, default: false },
    periodUpdatesModelValue: { type: Boolean, default: true }, // Update model value when switching period automatically
    view: { type: String as PropType<'hours' | 'minutes' | 'seconds'>, default: 'minutes' },
    hoursFilter: { type: Function as PropType<(h: number) => boolean> },
    minutesFilter: { type: Function as PropType<(h: number) => boolean> },
    secondsFilter: { type: Function as PropType<(h: number) => boolean> },
  },

  emits: [...statefulComponentOptions.emits],

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)
    const { columns, isPM } = useTimePicker(props, valueComputed)

    const pickers = ref<(typeof VaTimePickerColumn | undefined)[]>([])

    const activeColumnIndex = ref<number | undefined>()

    const focus = (idx = 0): void => {
      pickers.value[idx]?.focus()
    }

    const blur = (idx?: number): void => {
      idx ? pickers.value[idx]?.blur() : pickers.value.forEach((el) => el?.blur())
    }

    const { createComputedClass } = useForm(props)

    const computedClass = createComputedClass('va-time-picker')

    const focusNext = () => {
      const nextIndex = (activeColumnIndex?.value || 0) + 1
      activeColumnIndex.value = nextIndex % columns.value.length
      focus(activeColumnIndex.value)
    }

    const focusPrev = () => {
      const nextIndex = (activeColumnIndex?.value || 0) - 1 + columns.value.length
      activeColumnIndex.value = nextIndex % columns.value.length
      focus(activeColumnIndex.value)
    }

    onMounted(() => { focus() })

    return {
      columns,
      computedClass,
      isPM,
      pickers,

      focusNext,
      focusPrev,
      activeColumnIndex,

      // Will be used later, after fix 'withConfigTransport'
      // focus,
      // blur,
    }
  },

  // we will use this while we have problem with 'withConfigTransport'
  methods: {
    focus (idx = 0) { (this as any).pickers[idx]?.focus() },
    blur (idx?: number) {
      idx ? (this as any).pickers[idx]?.blur() : (this as any).pickers.value.forEach((el: any) => el?.blur())
    },
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
      z-index: 1;
    }
  }

  .va-time-picker {
    display: var(--va-time-picker-display);
    justify-content: center;
    overflow: hidden;
    height: var(--va-time-picker-height);
    font-family: var(--va-font-family);

    &--readonly {
      @include after-overlay();
    }

    &--disabled {
      @include after-overlay();

      opacity: var(--va-time-picker-disabled-opacity);
    }
  }
</style>
