<template>
  <va-button-group
    v-if="showPagination"
    class="va-pagination"
    :flat="$props.flat"
    :size="$props.size"
    :color="$props.color"
    outline
    @keydown.left.stop="onUserInput(currentValue - 1)"
    @keydown.right.stop="onUserInput(currentValue + 1)"
  >
    <va-button
      v-if="showBoundaryLinks"
      aria-label="go first page"
      :disabled="$props.disabled || currentValue === 1"
      :icon="$props.boundaryIconLeft"
      @click="onUserInput(1)"
    />
    <va-button
      v-if="showDirectionLinks"
      aria-label="go prev page"
      outline
      :disabled="$props.disabled || currentValue === 1"
      :icon="$props.directionIconLeft"
      @click="onUserInput(currentValue - 1)"
    />
    <slot v-if="!$props.input">
      <va-button
        v-for="(n, i) in paginationRange"
        :key="i"
        class="va-pagination__numeric-button"
        outline
        :aria-label="`go to ${n} page`"
        :aria-current="n === currentValue"
        :style="activeButtonStyle(n)"
        :disabled="$props.disabled || n === '...'"
        :class="{ 'va-button--ellipsis': n === '...'}"
        @click="onUserInput(n)"
      >
        {{ n }}
      </va-button>
    </slot>
    <input
      v-else
      ref="htmlInput"
      class="va-pagination__input va-button"
      aria-label="enter the page number to go"
      v-model="inputValue"
      :disabled="$props.disabled"
      :placeholder="`${currentValue}/${lastPage}`"
      :style="inputStyleComputed"
      :class="{ 'va-pagination__input--flat': $props.flat }"
      @keydown.enter="changeValue"
      @focus="focusInput"
      @blur="changeValue"
    />
    <va-button
      v-if="showDirectionLinks"
      aria-label="go next page"
      outline
      :disabled="$props.disabled || currentValue === lastPage"
      :icon="$props.directionIconRight"
      @click="onUserInput(currentValue + 1)"
    />
    <va-button
      v-if="showBoundaryLinks"
      aria-label="go last page"
      outline
      :disabled="$props.disabled || currentValue === lastPage"
      :icon="$props.boundaryIconRight"
      @click="onUserInput(lastPage)"
    />
  </va-button-group>
</template>

<script lang="ts">
import { defineComponent, watch, PropType, ref, computed, nextTick, shallowRef } from 'vue'

import { __DEV__ } from '../../utils/global-utils'
import { useComponentPresetProp, useColors, useTextColor, useStateful, useStatefulProps, useStatefulEmits } from '../../composables'
import { setPaginationRange } from './setPaginationRange'

import { VaButtonGroup } from '../va-button-group'
import { VaButton } from '../va-button'

export default defineComponent({
  name: 'VaPagination',
  components: { VaButtonGroup, VaButton },
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: Number, default: 1 },
    visiblePages: { type: Number, default: 0 },
    pages: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    size: {
      type: String as PropType<'medium' | 'small' | 'large'>,
      default: 'medium',
      validator: (v: string) => ['medium', 'small', 'large'].includes(v),
    },
    boundaryLinks: { type: Boolean, default: true },
    boundaryNumbers: { type: Boolean, default: false },
    directionLinks: { type: Boolean, default: true },
    input: { type: Boolean, default: false },
    hideOnSinglePage: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    total: { type: Number, default: null },
    pageSize: { type: Number, default: null },
    boundaryIconLeft: { type: String, default: 'first_page' },
    boundaryIconRight: { type: String, default: 'last_page' },
    directionIconLeft: { type: String, default: 'chevron_left' },
    directionIconRight: { type: String, default: 'chevron_right' },
  },

  setup (props, { emit }) {
    const htmlInput = shallowRef<HTMLInputElement>()

    const inputValue = ref('')

    const usedTotal = computed(() => !!((props.total || props.pageSize === 0) && props.pageSize))

    const { valueComputed } = useStateful<number>(props, emit)

    const { textColorComputed } = useTextColor()

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
          color: textColorComputed.value,
        }
      }

      return {
        color: getColor(props.color),
      }
    }

    const inputStyleComputed = computed(() => ({
      cursor: 'default',
      color: getColor(props.color),
      opacity: props.disabled ? 0.4 : 1,
    }))

    watch([usedTotal, () => props.pages], () => {
      if (__DEV__ && usedTotal.value && props.pages) {
        throw new Error('Please, use either `total` and `page-size` props, or `pages`.')
      }
    })

    return {
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
      inputStyleComputed,
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

  &__numeric-button {
    &.va-button {
      .va-button__content {
        // Remove paddings from button content
        padding: 0;
        justify-content: center;
      }

      // Add paddings to button content in min-width
      &--normal {
        .va-button__content {
          min-width: calc(var(--va-button-content-px) * 2 + var(--va-pagination-button-content-width));
        }
      }

      &--small {
        .va-button__content {
          min-width: calc(var(--va-button-sm-content-px) * 2 + var(--va-pagination-button-content-width));
        }
      }

      &--large {
        .va-button__content {
          min-width: calc(var(--va-button-lg-content-px) * 2 + var(--va-pagination-button-content-width));
        }
      }
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
