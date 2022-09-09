<template>
  <nav
    v-if="showPagination"
    class="va-pagination"
    aria-label="pagination"
    :class="classComputed"
    @keydown.left.stop="goPrevPage"
    @keydown.right.stop="goNextPage"
    @keydown.up.stop="goPrevPage"
    @keydown.down.stop="goNextPage"
  >
    <va-button
      v-if="showBoundaryLinks"
      aria-label="go to the first page"
      :disabled="$props.disabled || currentValue === 1"
      :icon="$props.boundaryIconLeft"
      v-bind="buttonPropsComputed"
      @click="onUserInput(1)"
    />
    <va-button
      v-if="showDirectionLinks"
      aria-label="go to the previous page"
      :disabled="$props.disabled || currentValue === 1"
      :icon="$props.directionIconLeft"
      v-bind="buttonPropsComputed"
      @click="goPrevPage"
    />
    <slot v-if="!$props.input">
      <va-button
        v-for="(n, i) in paginationRange"
        :key="`pagination-page-${i}`"
        :class="{ 'va-button--ellipsis': n === '...'}"
        :aria-label="`go to the ${n} page`"
        :aria-current="n === currentValue"
        :disabled="$props.disabled || ['...', currentValue].includes(n)"
        v-bind="getPageButtonProps(n)"
        @click="onUserInput(n)"
      >
        {{ n }}
      </va-button>
    </slot>
    <input
      v-else
      v-model="inputValue"
      ref="htmlInput"
      class="va-pagination__input va-button"
      aria-label="enter the page number to go"
      :style="inputStyleComputed"
      :class="inputClassComputed"
      v-bind="inputAttributesComputed"
      @keydown.enter="changeValue"
      @focus="focusInput"
      @blur="changeValue"
    />
    <va-button
      v-if="showDirectionLinks"
      aria-label="go next page"
      :disabled="$props.disabled || currentValue === lastPage"
      :icon="$props.directionIconRight"
      v-bind="buttonPropsComputed"
      @click="goNextPage"
    />
    <va-button
      v-if="showBoundaryLinks"
      aria-label="go last page"
      :disabled="$props.disabled || currentValue === lastPage"
      :icon="$props.boundaryIconRight"
      v-bind="buttonPropsComputed"
      @click="onUserInput(lastPage)"
    />
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, shallowRef, computed, watch, nextTick } from 'vue'
import pick from 'lodash/pick.js'

import { __DEV__ } from '../../utils/global-utils'
import {
  useBem,
  useComponentPresetProp,
  useColors,
  useStateful, useStatefulProps, useStatefulEmits,
  useDeprecatedProps,
} from '../../composables'
import { setPaginationRange } from './setPaginationRange'

import { VaButton } from '../va-button'

export default defineComponent({
  name: 'VaPagination',
  components: { VaButton },
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
    plain: { type: Boolean, default: false },
    total: { type: Number, default: null },
    pageSize: { type: Number, default: null },
    boundaryIconLeft: { type: String, default: 'first_page' },
    boundaryIconRight: { type: String, default: 'last_page' },
    directionIconLeft: { type: String, default: 'chevron_left' },
    directionIconRight: { type: String, default: 'chevron_right' },
    gapped: { type: Boolean, default: false },
    borderColor: { type: String, default: '' },
    rounded: { type: Boolean, default: false },
    activePageColor: { type: String, default: '' },
  },

  setup (props, { emit }) {
    // TODO(1.6.0): Remove deprecated props
    useDeprecatedProps(['flat', 'outline'])

    const htmlInput = shallowRef<HTMLInputElement>()

    const inputValue = ref('')

    const usesTotal = computed(() => !!((props.total || props.total === 0) && props.pageSize))

    const { valueComputed } = useStateful<number>(props, emit)

    const currentValue = computed({
      get: () => usesTotal.value ? Math.ceil(valueComputed.value / props.pageSize) || 1 : valueComputed.value,
      set: (value) => { valueComputed.value = value },
    })

    const paginationRange = computed(() => {
      const { visiblePages, total, pageSize, boundaryNumbers, pages } = props

      const value = currentValue.value || 1
      const totalPages = usesTotal.value ? Math.ceil(total / pageSize) : pages

      return setPaginationRange(value, visiblePages, totalPages, boundaryNumbers)
    })

    const lastPage = computed(() => usesTotal.value ? Math.ceil(props.total / props.pageSize) || 1 : +props.pages)

    const isLastPageNotVisible = computed(() => (!!props.visiblePages && lastPage.value > props.visiblePages))

    const showBoundaryLinks = computed(() => {
      const { boundaryLinks, boundaryNumbers, input } = props

      return input || (isLastPageNotVisible.value && boundaryLinks && !boundaryNumbers)
    })

    const showDirectionLinks = computed(() => props.input || (isLastPageNotVisible.value && props.directionLinks))

    const showPagination = computed(() => lastPage.value > 1 || (!props.hideOnSinglePage && lastPage.value <= 1))

    const focusInput = () => {
      inputValue.value = String(currentValue.value)

      nextTick(() => htmlInput.value?.setSelectionRange(0, htmlInput.value.value.length))
    }

    const onUserInput = (pageNum: number | '...') => {
      if (pageNum === '...' || pageNum < 1 || pageNum > lastPage.value) { return }

      currentValue.value = usesTotal.value ? (pageNum - 1) * props.pageSize + 1 : pageNum
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

    const inputStyleComputed = computed(() => ({
      cursor: 'default',
      color: getColor(props.color),
      opacity: props.disabled ? 0.4 : 1,
    }))

    watch([usesTotal, () => props.pages], () => {
      if (__DEV__ && usesTotal.value && props.pages) {
        throw new Error('Please, use either `total` and `page-size` props, or `pages`.')
      }
    })

    const inputAttributesComputed = computed(() => ({
      disabled: props.disabled,
      placeholder: `${currentValue.value}/${lastPage.value}`,
    }))

    const buttonPropsComputed = computed(() => ({
      size: props.size,
      color: props.color,
      plain: props.preset ? undefined : props.plain,
      borderColor: props.borderColor,
      preset: props.preset,
    }))

    const currentPageButtonProps = computed(() => ({
      preset: !props.preset || props.preset === 'default' ? 'primary' : 'default',
      color: props.activePageColor || 'primary',
    }))

    const getPageButtonProps = (n: number | '...') => {
      if (!isNaN(+n) && n === currentValue.value) {
        return Object.assign({}, buttonPropsComputed.value, currentPageButtonProps.value)
      }

      return buttonPropsComputed.value
    }

    const inputClassComputed = useBem('va-pagination__input', () => ({
      ...pick(props, ['plain']),
    }))

    const classComputed = useBem('va-pagination', () => ({
      ...pick(props, ['gapped', 'rounded']),
      bordered: !!props.borderColor,
    }))

    const goNextPage = () => onUserInput(currentValue.value + 1)
    const goPrevPage = () => onUserInput(currentValue.value - 1)

    return {
      getPageButtonProps,
      inputClassComputed,
      classComputed,
      currentValue,
      lastPage,
      changeValue,
      inputValue,
      showPagination,
      showBoundaryLinks,
      onUserInput,
      showDirectionLinks,
      paginationRange,
      focusInput,
      inputStyleComputed,
      inputAttributesComputed,
      goNextPage,
      goPrevPage,
      buttonPropsComputed,
    }
  },
})
</script>

<style lang='scss'>
  @import "../../styles/resources";
  @import "variables";

  .va-pagination {
    display: flex;
    font-family: var(--va-font-family);

    &__input {
      border-style: var(--va-pagination-input-border-style);
      border-width: var(--va-pagination-input-border-width);
      text-align: var(--va-pagination-input-text-align);
      font-size: var(--va-pagination-input-font-size);

      &--plain {
        border-top-width: var(--va-pagination-input-plain-border-top-width);
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

      &--disabled {
        opacity: 1;
      }

      @include keyboard-focus($radius: 'inherit', $offset: -2px);
    }

    & > :not(:first-child):not(:last-child) {
      border-radius: 0;
    }

    & > :first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    & > :last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &--gapped {
      &.va-pagination > .va-button {
        border-radius: var(--va-button-border-radius);
        margin-right: var(--va-pagination-gap);
        border: 1px solid;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &--bordered {
      &.va-pagination > .va-button {
        border: 1px solid;
      }
    }

    &--rounded {
      &.va-pagination > .va-button {
        border-radius: 9999px;

        &.va-button--small:not(.va-button--plain) {
          &.va-button--icon-only {
            width: var(--va-button-sm-size);
            height: var(--va-button-sm-size);
          }

          & .va-button__content {
            padding-right: var(--va-button-sm-content-px);
            padding-left: var(--va-button-sm-content-px);
          }
        }

        &.va-button--normal:not(.va-button--plain) {
          & .va-button--icon-only {
            width: var(--va-button-sm-size);
            height: var(--va-button-sm-size);
          }

          & .va-button__content {
            padding-right: var(--va-button-sm-content-px);
            padding-left: var(--va-button-sm-content-px);
          }
        }

        &.va-button--large:not(.va-button--plain) {
          &.va-button--icon-only {
            width: var(--va-button-sm-size);
            height: var(--va-button-sm-size);
          }

          & .va-button__content {
            padding-right: var(--va-button-sm-content-px);
            padding-left: var(--va-button-sm-content-px);
          }
        }
      }
    }
  }
</style>
