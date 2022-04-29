<template>
  <va-button-group
    v-if="showPagination"
    class="va-pagination"
    :flat="$props.flat"
    :size="$props.size"
    :color="$props.color"
    outline
  >
    <va-button
      v-if="showBoundaryLinks"
      :disabled="$props.disabled || currentValue === 1"
      :icon="$props.boundaryIconLeft"
      @click="onUserInput(1)"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :disabled="$props.disabled || currentValue === 1"
      :icon="$props.directionIconLeft"
      @click="onUserInput(currentValue - 1)"
    />
    <slot v-if="!$props.input">
      <va-button
        v-for="(n, i) in paginationRange"
        :key="i"
        :style="activeButtonStyle(n)"
        :disabled="$props.disabled || n === '...'"
        :class="{ 'va-button--ellipsis': n === '...'}"
        @click="onUserInput(n)"
        outline
      >
        {{ n }}
      </va-button>
    </slot>
    <input
      v-else
      ref="htmlInput"
      class="va-pagination__input va-button"
      :style="{
        cursor: 'default',
        color: getColor($props.color),
        opacity: $props.disabled ? 0.4 : 1
      }"
      :class="{ 'va-pagination__input--flat': $props.flat }"
      @keydown.enter="changeValue"
      @focus="focusInput"
      @blur="changeValue"
      :disabled="$props.disabled"
      :placeholder="`${currentValue}/${lastPage}`"
      v-model="inputValue"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :disabled="$props.disabled || currentValue === lastPage"
      :icon="$props.directionIconRight"
      @click="onUserInput(currentValue + 1)"
    />
    <va-button
      v-if="showBoundaryLinks"
      outline
      :disabled="$props.disabled || currentValue === lastPage"
      :icon="$props.boundaryIconRight"
      @click="onUserInput(lastPage)"
    />
  </va-button-group>
</template>

<script lang="ts">
import { defineComponent, watch, PropType, ref, Ref, computed, nextTick } from 'vue'

import { __DEV__ } from '../../utils/global-utils'
import { useColors } from '../../composables/useColor'
import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'

import VaButtonGroup from '../va-button-group'
import VaButton from '../va-button'

import { setPaginationRange } from './setPaginationRange'

export default defineComponent({
  name: 'VaPagination',
  components: { VaButtonGroup, VaButton },
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    modelValue: { type: Number as PropType<number>, default: 1 },
    visiblePages: { type: Number as PropType<number>, default: 0 },
    pages: { type: Number as PropType<number>, default: 0 },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    color: { type: String as PropType<string>, default: 'primary' },
    size: {
      type: String as PropType<'medium' | 'small' | 'large'>,
      default: 'medium',
      validator: (v: string) => ['medium', 'small', 'large'].includes(v),
    },

    boundaryLinks: { type: Boolean as PropType<boolean>, default: true },
    boundaryNumbers: { type: Boolean as PropType<boolean>, default: false },
    directionLinks: { type: Boolean as PropType<boolean>, default: true },
    input: { type: Boolean as PropType<boolean>, default: false },
    hideOnSinglePage: { type: Boolean as PropType<boolean>, default: false },
    flat: { type: Boolean as PropType<boolean>, default: false },
    total: { type: Number as PropType<number>, default: null },
    pageSize: { type: Number as PropType<number>, default: null },
    boundaryIconLeft: { type: String as PropType<string>, default: 'first_page' },
    boundaryIconRight: { type: String as PropType<string>, default: 'last_page' },
    directionIconLeft: { type: String as PropType<string>, default: 'chevron_left' },
    directionIconRight: { type: String as PropType<string>, default: 'chevron_right' },
  },
  setup (props, { emit }) {
    const inputValue = ref('')
    const htmlInput: Ref<HTMLInputElement | null> = ref(null)

    const usedTotal = computed(() => !!((props.total || props.pageSize === 0) && props.pageSize))

    const { valueComputed } = useStateful<number>(props, emit)

    const currentValue = computed({
      get: () => usedTotal.value ? Math.ceil(valueComputed.value / props.pageSize) || 1 : valueComputed.value,
      set: (value) => { valueComputed.value = value },
    })

    const paginationRange = computed(() => {
      const { visiblePages, total, pageSize, boundaryNumbers, pages } = props

      const value = currentValue.value || 1
      const totalPages = usedTotal.value ? Math.ceil(total / pageSize) : pages

      return setPaginationRange(value, visiblePages, totalPages, boundaryNumbers)
    })

    const lastPage = computed(() => usedTotal.value ? Math.ceil(props.total / props.pageSize) || 1 : props.pages)

    const IsLstPageNotVisible = computed(() => (!!props.visiblePages && lastPage.value > props.visiblePages))

    const showBoundaryLinks = computed(() => {
      const { boundaryLinks, boundaryNumbers, input } = props

      return input || (IsLstPageNotVisible.value && boundaryLinks && !boundaryNumbers)
    })

    const showDirectionLinks = computed(() => props.input || (IsLstPageNotVisible.value && props.directionLinks))

    const showPagination = computed(() => lastPage.value > 1 || (!props.hideOnSinglePage && lastPage.value <= 1))

    const focusInput = () => {
      inputValue.value = `${currentValue.value}`

      nextTick(() => htmlInput.value?.setSelectionRange(0, htmlInput.value.value.length))
    }

    const onUserInput = (pageNum: number | '...') => {
      if (pageNum === '...' || pageNum < 1 || pageNum > lastPage.value) { return }

      currentValue.value = usedTotal.value ? (pageNum - 1) * props.pageSize + 1 : pageNum
    }

    const resetInput = () => {
      inputValue.value = ''
      htmlInput.value?.blur()
    }

    const changeValue = () => {
      if (+inputValue.value === currentValue.value) {
        resetInput()
      }

      if (!inputValue.value.length) { return }

      let pageNum = Number.parseInt(inputValue.value)

      switch (true) {
        case pageNum < 1:
          pageNum = 1; break
        case pageNum > lastPage.value:
          pageNum = lastPage.value; break
        case isNaN(pageNum):
          pageNum = currentValue.value; break
        default: break
      }

      onUserInput(pageNum)
      resetInput()
    }

    const { getColor } = useColors()

    const activeButtonStyle = (buttonValue: number | '...') => {
      if (buttonValue === currentValue.value) {
        return {
          backgroundColor: getColor(props.color),
          color: '#ffffff',
        }
      }

      return {
        color: getColor(props.color),
      }
    }

    watch([usedTotal, () => props.pages], () => {
      if (__DEV__ && usedTotal.value && props.pages) {
        throw new Error('Please, use either `total` and `page-size` props, or `pages`.')
      }
    })

    return {
      getColor,
      currentValue,
      lastPage,
      changeValue,
      inputValue,
      showPagination,
      showBoundaryLinks,
      onUserInput,
      activeButtonStyle,
      showDirectionLinks,
      paginationRange,
      focusInput,
    }
  },
})
</script>

<style lang='scss'>
@import "../../styles/resources";
@import "variables";

.va-pagination {
  font-family: var(--va-font-family);

  &__input {
    border-style: var(--va-pagination-input-border-style);
    border-width: var(--va-pagination-input-border-width);
    text-align: var(--va-pagination-input-text-align);
    font-size: var(--va-pagination-input-font-size);

    &--flat {
      border-top-width: var(--va-pagination-input-flat-border-top-width);
    }
  }

  .va-button {
    &.va-input {
      cursor: default;
    }

    &--ellipsis {
      cursor: default;
      opacity: 1;
    }

    &--ellipsis > .va-button__content {
      opacity: 0.4;
    }

    &--outline.va-button--disabled {
      opacity: 1;
    }

    &--outline.va-button--disabled > .va-button__content {
      opacity: 0.4;
    }
  }
}
</style>
