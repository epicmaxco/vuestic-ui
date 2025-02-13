<template>
  <nav
    v-if="showPagination"
    class="va-pagination"
    :aria-label="tp($props.ariaLabel)"
    :class="classComputed"
    @keydown.left.stop="goPrevPage"
    @keydown.right.stop="goNextPage"
    @keydown.up.stop="goPrevPage"
    @keydown.down.stop="goNextPage"
  >
    <slot
      v-if="showBoundaryLinks" name="firstPageLink"
      v-bind="{ onClick: () => onUserInput(1), disabled: $props.disabled || currentValue === 1 }"
    >
      <va-button
        v-if="showBoundaryLinks"
        :aria-label="tp($props.ariaGoToTheFirstPageLabel)"
        :disabled="$props.disabled || currentValue === 1"
        :icon="$props.boundaryIconLeft"
        v-bind="buttonPropsComputed"
        @click="onUserInput(1)"
      />
    </slot>
    <slot
      v-if="showDirectionLinks" name="prevPageLink"
      v-bind="{ onClick: goPrevPage, disabled: $props.disabled || currentValue === 1 }"
    >
      <va-button
        v-if="showDirectionLinks"
        :aria-label="tp($props.ariaGoToPreviousPageLabel)"
        :disabled="$props.disabled || currentValue === 1"
        :icon="$props.directionIconLeft"
        v-bind="buttonPropsComputed"
        @click="goPrevPage"
      />
    </slot>

    <slot v-if="!$props.input">
      <va-button
        v-for="(n, i) in paginationRange" :key="i"
        :ref="setItemRefByIndex(i)"
        :class="{ 'va-button--ellipsis': n === '...', 'va-button--current': n === currentValue}"
        :aria-label="tp($props.ariaGoToSpecificPageLabel, { page: n })"
        :aria-current="n === currentValue"
        :disabled="$props.disabled || n === '...'"
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
      :aria-label="tp($props.ariaGoToSpecificPageInputLabel)"
      :style="inputStyleComputed"
      :class="inputClassComputed"
      v-bind="inputAttributesComputed"
      @keydown.enter="changeValue"
      @focus="focusInput"
      @blur="changeValue"
    />

    <slot
      v-if="showDirectionLinks" name="nextPageLink"
      v-bind="{ onClick: goNextPage, disabled: $props.disabled || currentValue === lastPage }"
    >
      <va-button
        v-if="showDirectionLinks"
        :aria-label="tp($props.ariaGoToNextPageLabel)"
        :disabled="$props.disabled || currentValue === lastPage"
        :icon="$props.directionIconRight"
        v-bind="buttonPropsComputed"
        @click="goNextPage"
      />
    </slot>
    <slot
      v-if="showBoundaryLinks" name="lastPageLink"
      v-bind="{ onClick: () => onUserInput(lastPage), disabled: $props.disabled || currentValue === lastPage }"
    >
      <va-button
        v-if="showBoundaryLinks"
        :aria-label="tp($props.ariaGoToLastPageLabel)"
        :disabled="$props.disabled || currentValue === lastPage"
        :icon="$props.boundaryIconRight"
        v-bind="buttonPropsComputed"
        @click="onUserInput(lastPage)"
      />
    </slot>
  </nav>
</template>

<script lang="ts" setup>
import {
  PropType,
  ref,
  toRefs,
  shallowRef,
  computed,
  watch,
  nextTick,
  ComputedRef,
} from 'vue'

import { isDev } from '../../utils/env'
import {
  useBem,
  useComponentPresetProp,
  useColors,
  useStateful, useStatefulProps, useStatefulEmits,
  useArrayRefs,
  useTranslation, useTranslationProp, useNumericProp,
} from '../../composables'
import { setPaginationRange } from './setPaginationRange'

import { VaButton } from '../va-button'
import { ExtractComponentPropTypes } from '../../utils/component-options'
import { pick } from '../../utils/pick'
import { clamp } from '../../utils/clamp'

defineOptions({
  name: 'VaPagination',
})

type VaButtonProps = ExtractComponentPropTypes<typeof VaButton>

const props = defineProps({
  ...useStatefulProps,
  ...useComponentPresetProp,
  modelValue: { type: Number, default: 1 },
  visiblePages: { type: [Number, String], default: 0 },
  pages: { type: [Number, String], default: 0 },
  disabled: { type: Boolean, default: false },
  color: { type: String, default: 'primary' },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
    validator: (v: string) => ['small', 'medium', 'large'].includes(v),
  },
  boundaryLinks: { type: Boolean, default: true },
  boundaryNumbers: { type: Boolean, default: false },
  directionLinks: { type: Boolean, default: true },
  input: { type: Boolean, default: false },
  hideOnSinglePage: { type: Boolean, default: false },
  total: { type: [Number, String], default: null },
  pageSize: { type: [Number, String], default: null },
  boundaryIconLeft: { type: String, default: 'va-arrow-first' },
  boundaryIconRight: { type: String, default: 'va-arrow-last' },
  directionIconLeft: { type: String, default: 'va-arrow-left' },
  directionIconRight: { type: String, default: 'va-arrow-right' },
  gapped: { type: Boolean, default: false },
  borderColor: { type: String, default: '' },
  rounded: { type: Boolean, default: false },
  /** @deprecated Use activeButtonProps="{ color: 'myColor' }" */
  activePageColor: { type: String, default: '' },
  activeButtonProps: { type: Object as PropType<VaButtonProps>, default: () => ({}) },
  buttonProps: { type: Object as PropType<VaButtonProps>, default: () => ({}) },
  buttonsPreset: { type: String, default: 'primary' },

  ariaLabel: useTranslationProp('$t:pagination'),
  ariaGoToTheFirstPageLabel: useTranslationProp('$t:goToTheFirstPage'),
  ariaGoToPreviousPageLabel: useTranslationProp('$t:goToPreviousPage'),
  ariaGoToSpecificPageLabel: useTranslationProp('$t:goToSpecificPage'),
  ariaGoToSpecificPageInputLabel: useTranslationProp('$t:goToSpecificPageInput'),
  ariaGoToNextPageLabel: useTranslationProp('$t:goNextPage'),
  ariaGoToLastPageLabel: useTranslationProp('$t:goLastPage'),
})

const emit = defineEmits([...useStatefulEmits])

const htmlInput = shallowRef<HTMLInputElement>()

const inputValue = ref('')

const usesTotal = computed(() => !!((totalComputed.value || totalComputed.value === 0) && pageSizeComputed.value))

const valueComputed = useStateful(props, emit)

const currentValue = computed({
  get: () => usesTotal.value ? Math.ceil(valueComputed.value / pageSizeComputed.value!) || 1 : valueComputed.value,
  set: (value) => { valueComputed.value = value },
})

const visiblePagesComputed = useNumericProp('visiblePages') as ComputedRef<number>
const pagesComputed = useNumericProp('pages') as ComputedRef<number>
const totalComputed = useNumericProp('total')
const pageSizeComputed = useNumericProp('pageSize')

const paginationRange = computed(() => {
  const { boundaryNumbers } = props

  const value = currentValue.value || 1
  const totalPages = usesTotal.value ? Math.ceil(totalComputed.value! / pageSizeComputed.value!) : pagesComputed.value

  return setPaginationRange(value, visiblePagesComputed.value, totalPages, boundaryNumbers)
})

const lastPage = computed(() => usesTotal.value ? Math.ceil(totalComputed.value! / pageSizeComputed.value!) || 1 : +pagesComputed.value)

const isLastPageNotVisible = computed(() => ((!!visiblePagesComputed.value && lastPage.value > visiblePagesComputed.value)) || props.input)

const showBoundaryLinks = computed(() => {
  const { boundaryLinks, boundaryNumbers } = props

  return isLastPageNotVisible.value && boundaryLinks && !boundaryNumbers
})

const showDirectionLinks = computed(() => isLastPageNotVisible.value && props.directionLinks)

const showPagination = computed(() => lastPage.value > 1 || (!props.hideOnSinglePage && lastPage.value <= 1))

const focusInput = () => {
  inputValue.value = String(currentValue.value)

  nextTick(() => htmlInput.value?.setSelectionRange(0, htmlInput.value.value.length))
}

const { setItemRefByIndex, itemRefs } = useArrayRefs()
const onUserInput = (pageNum: number | '...') => {
  if (pageNum === '...' || pageNum === currentValue.value) { return }

  const limitedPageNum = clamp(pageNum, 1, lastPage.value)
  currentValue.value = usesTotal.value
    ? (limitedPageNum - 1) * pageSizeComputed.value! + 1
    : limitedPageNum

  itemRefs.value[pageNum - 1]?.focus()
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

const { getColor, colorToRgba } = useColors()

const inputBorderColorComputed = computed(() => {
  const { color, buttonsPreset } = toRefs(props)

  if (!color.value) { return 'transparent' }

  switch (buttonsPreset.value) {
    case 'default':
      return getColor(color.value)
    case undefined:
    case 'primary':
      return colorToRgba(getColor(color.value), 0.1)
    default:
      return 'transparent'
  }
})

const inputStyleComputed = computed(() => ({
  cursor: 'default',
  color: getColor(props.color),
  opacity: props.disabled ? 0.4 : 1,
  borderColor: inputBorderColorComputed.value,
}))

watch([usesTotal, () => pagesComputed.value], () => {
  if (isDev && usesTotal.value && pagesComputed.value) {
    throw new Error('Please, use either `total` and `page-size` props, or `pages`.')
  }
})

const inputAttributesComputed = computed(() => ({
  disabled: props.disabled,
  placeholder: `${currentValue.value}/${lastPage.value}`,
}))

const buttonPropsComputed = computed(() => ({
  size: props.size,
  preset: props.buttonsPreset,
  color: props.color,
  borderColor: props.borderColor,
  round: props.rounded,
  ...props.buttonProps,
}))

const currentPageButtonProps = computed(() => ({
  preset: props.buttonsPreset === 'default' ? 'primary' : 'default',
  color: props.activePageColor || props.color,
  ...props.activeButtonProps,
}))

const getPageButtonProps = (n: number | '...') => {
  if (!isNaN(+n) && n === currentValue.value) {
    return Object.assign({}, buttonPropsComputed.value, currentPageButtonProps.value)
  }

  return buttonPropsComputed.value
}

const isStandAloneInput = computed(() => props.input && !props.boundaryLinks && !props.directionLinks)
const inputClassComputed = useBem('va-pagination__input', () => ({
  sm: props.size === 'small' && isStandAloneInput.value,
  md: props.size === 'medium' && isStandAloneInput.value,
  lg: props.size === 'large' && isStandAloneInput.value,
  auto: !isStandAloneInput.value,
}))

const classComputed = useBem('va-pagination', () => ({
  ...pick(props, ['gapped', 'rounded', 'disabled']),
  bordered: !!props.borderColor,
}))

const goNextPage = () => onUserInput(currentValue.value + 1)
const goPrevPage = () => onUserInput(currentValue.value - 1)

const { tp } = useTranslation()

defineExpose({
  goNextPage,
  goPrevPage,
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-pagination {
  display: flex;
  font-family: var(--va-font-family);

  &__input {
    background: var(--va-pagination-input-background);
    border-style: var(--va-pagination-input-border-style);
    border-width: var(--va-pagination-input-border-width);
    text-align: var(--va-pagination-input-text-align);
    font-size: var(--va-pagination-input-font-size);
    font-weight: normal;

    // by default input's height relies on va-button size
    &--sm {
      height: var(--va-pagination-button-sm-size);
    }

    &--md {
      height: var(--va-pagination-button-size);
    }

    &--lg {
      height: var(--va-pagination-button-lg-size);
    }

    &--auto {
      height: auto;
    }
  }

  .va-button {
    &.va-input {
      cursor: default;
    }

    &--small {
      height: var(--va-pagination-button-sm-size);
      min-width: var(--va-pagination-button-sm-size);
    }

    &--normal {
      height: var(--va-pagination-button-size);
      min-width: var(--va-pagination-button-size);
    }

    &--large {
      height: var(--va-pagination-button-lg-size);
      min-width: var(--va-pagination-button-lg-size);
    }

    &--ellipsis {
      cursor: default;
      opacity: 1;

      & > .va-button__content {
        opacity: 0.4;
      }
    }

    &:focus-visible {
      outline-offset: -2px;

      @include keyboard-focus-outline();
    }
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
      border-style: solid;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &--bordered {
    &.va-pagination > .va-button {
      border-style: solid;

      &::before {
        border-radius: unset;
      }
    }
  }

  &--rounded {
    &.va-pagination > .va-button {
      border-radius: 50%;

      &::before {
        border-radius: inherit;
      }

      &.va-button--small {
        &.va-button--icon-only {
          height: var(--va-pagination-button-sm-size);
          width: var(--va-pagination-button-sm-size);
        }

        & .va-button__content {
          padding-right: var(--va-button-sm-content-px);
          padding-left: var(--va-button-sm-content-px);
        }
      }

      &.va-button--normal {
        &.va-button--icon-only {
          height: var(--va-pagination-button-size);
          width: var(--va-pagination-button-size);
        }

        & .va-button__content {
          padding-right: var(--va-button-content-px);
          padding-left: var(--va-button-content-px);
        }
      }

      &.va-button--large {
        &.va-button--icon-only {
          height: var(--va-pagination-button-lg-size);
          width: var(--va-pagination-button-lg-size);
        }

        & .va-button__content {
          padding-right: var(--va-button-lg-content-px);
          padding-left: var(--va-button-lg-content-px);
        }
      }
    }
  }
}
</style>
