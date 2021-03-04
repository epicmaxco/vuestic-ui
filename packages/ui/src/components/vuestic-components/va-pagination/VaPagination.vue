<template>
  <va-button-group
    class="va-pagination"
    v-if="showPagination"
  >
    <va-button
      v-if="showBoundaryLinks"
      outline
      :color="$props.color"
      :size="$props.size"
      :disabled="$props.disabled || currentValue === 1"
      :icon="$props.boundaryIconLeft"
      @click="onUserInput(1)"
      :flat="$props.flat"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="$props.color"
      :size="$props.size"
      :disabled="$props.disabled || currentValue === 1"
      :icon="$props.directionIconLeft"
      @click="onUserInput(currentValue - 1)"
      :flat="$props.flat"
    />
    <slot v-if="!$props.input">
      <va-button
        :style="activeButtonStyle(n)"
        outline
        v-for="(n, key) in paginationRange"
        :key="key"
        :color="$props.color"
        :size="$props.size"
        :disabled="$props.disabled || n === '...'"
        :class="{
          'va-button--ellipsis': n === '...',
        }"

        @click="onUserInput(n)"
        :flat="$props.flat"
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
        color: computeColor($props.color),
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
      :color="$props.color"
      :size="$props.size"
      :disabled="$props.disabled || currentValue === lastPage"
      :icon="$props.directionIconRight"
      @click="onUserInput(currentValue + 1)"
      :flat="$props.flat"
    />
    <va-button
      v-if="showBoundaryLinks"
      outline
      :color="$props.color"
      :size="$props.size"
      :disabled="$props.disabled || currentValue === lastPage"
      :icon="$props.boundaryIconRight"
      :flat="$props.flat"
      @click="onUserInput(lastPage)"
    />
  </va-button-group>
</template>

<script lang="ts">
import { watch } from 'vue'
import { Options, mixins, prop, Vue } from 'vue-class-component'

import { Ref } from '../../../utils/decorators'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import VaButtonGroup from '../va-button-group'
import VaButton from '../va-button'
import VaInput from '../va-input'

import { setPaginationRange } from './setPaginationRange'

class PaginationProps {
  modelValue = prop<number>({ type: Number, default: 1 })
  visiblePages = prop<number>({ type: Number, default: 0 })
  pages = prop<number>({ type: Number, default: 0 })
  disabled = prop<boolean>({ type: Boolean, default: false })
  size = prop<string>({
    type: String,
    default: 'medium',
    validator: (v: string) => ['medium', 'small', 'large'].includes(v),
  })

  boundaryLinks = prop<boolean>({ type: Boolean, default: true })
  boundaryNumbers = prop<boolean>({ type: Boolean, default: false })
  directionLinks = prop<boolean>({ type: Boolean, default: true })
  input = prop<boolean>({ type: Boolean, default: false })
  hideOnSinglePage = prop<boolean>({ type: Boolean, default: false })
  flat = prop<boolean>({ type: Boolean, default: false })
  total = prop<number>({ type: Number, default: null })
  pageSize = prop<number>({ type: Number, default: null })
  boundaryIconLeft = prop<string>({ type: String, default: 'first_page' })
  boundaryIconRight = prop<string>({ type: String, default: 'last_page' })
  directionIconLeft = prop<string>({ type: String, default: 'chevron_left' })
  directionIconRight = prop<string>({ type: String, default: 'chevron_right' })
}

const PaginationPropsMixin = Vue.with(PaginationProps)

@Options({
  name: 'VaPagination',
  components: {
    VaButtonGroup,
    VaButton,
    VaInput,
  },
})
export default class VaPagination extends mixins(
  StatefulMixin,
  ColorMixin,
  PaginationPropsMixin,
) {
  inputValue = ''

  @Ref() readonly htmlInput!: HTMLInputElement

  created () {
    watch([() => this.useTotal, () => this.$props.pages], () => {
      if (this.useTotal && this.$props.pages) {
        if (process.env.NODE_ENV !== 'production') {
          throw new Error('Please, use either `total` and `page-size` props, or `pages`.')
        }
      }
    })
  }

  get lastPage (): number {
    const { total, pageSize, pages } = this.$props
    return this.useTotal
      ? Math.ceil((total as number) / (pageSize as number)) || 1
      : pages as number
  }

  get paginationRange () {
    const { visiblePages, total, pageSize, boundaryNumbers, pages } = this.$props
    const value = this.currentValue || 1
    const totalPages = this.useTotal ? Math.ceil((total as number) / (pageSize as number)) : pages
    return setPaginationRange(value, visiblePages as number, totalPages as number, boundaryNumbers)
  }

  get showBoundaryLinks () {
    const { visiblePages, boundaryLinks, boundaryNumbers, input } = this.$props
    return input ||
      ((visiblePages && this.lastPage > visiblePages) && boundaryLinks && !boundaryNumbers)
  }

  get showDirectionLinks () {
    const { visiblePages, directionLinks, input } = this.$props
    return input || ((visiblePages && this.lastPage > visiblePages) && directionLinks)
  }

  get showPagination () {
    return this.lastPage > 1 || (!this.$props.hideOnSinglePage && this.lastPage <= 1)
  }

  get fontColor () {
    return this.computeColor(this.$props.color as string)
  }

  get useTotal () {
    const { total, pageSize } = this.$props
    return !!((total || total === 0) && pageSize)
  }

  get currentValue () {
    if (this.useTotal) {
      return Math.ceil(this.valueComputed / (this.$props.pageSize as number)) || 1
    } else {
      return this.valueComputed
    }
  }

  set currentValue (value) {
    this.valueComputed = value
  }

  focusInput () {
    const { currentValue, $nextTick } = this
    this.inputValue = currentValue
    $nextTick(() => this.htmlInput.setSelectionRange(0, this.htmlInput.value.length))
  }

  onUserInput (pageNum: number) {
    if (pageNum < 1 || pageNum > this.lastPage) {
      return
    }
    this.currentValue = this.useTotal
      ? (pageNum - 1) * (this.$props.pageSize as number) + 1
      : pageNum
  }

  resetInput () {
    this.inputValue = ''
    this.htmlInput.blur()
  }

  changeValue () {
    if (this.inputValue === this.currentValue) { this.resetInput() }
    if (!this.inputValue.length) { return }
    let pageNum = Number.parseInt(this.inputValue)
    switch (true) {
    case pageNum < 1:
      pageNum = 1
      break
    case pageNum > this.lastPage:
      pageNum = this.lastPage
      break
    case isNaN(pageNum):
      pageNum = this.currentValue
      break
    default:
      break
    }
    this.onUserInput(pageNum)
    this.resetInput()
  }

  activeButtonStyle (buttonValue: number) {
    if (buttonValue === this.currentValue) {
      return {
        backgroundColor: this.colorComputed,
        color: '#ffffff',
      }
    }
    return {
      color: this.fontColor,
    }
  }
}
</script>

<style lang='scss'>
@import "../../vuestic-sass/resources/resources";

.va-pagination {
  &__input {
    border-style: solid;
    border-width: 2px 0;
    text-align: center;
    font-size: 1rem;

    &--flat {
      border-top-width: 0;
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
  }
}
</style>
