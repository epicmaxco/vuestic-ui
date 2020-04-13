<template>
  <va-button-group
    class="va-pagination"
    v-if="showPagination"
  >
    <va-button
      v-if="showBoundaryLinks"
      outline
      :color="c_color"
      :size="c_size"
      :disabled="c_disabled || currentValue === 1"
      :icon="boundaryIconLeft"
      @click="onUserInput(1)"
      :flat="c_flat"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="c_color"
      :size="c_size"
      :disabled="c_disabled || currentValue === 1"
      :icon="directionIconLeft"
      @click="onUserInput(currentValue - 1)"
      :flat="c_flat"
    />
    <slot v-if="!input">
      <va-button
        :style="activeButtonStyle(n)"
        outline
        v-for="(n, key) in paginationRange"
        :key="key"
        :color="c_color"
        :size="c_size"
        :disabled="c_disabled || n === '...'"
        :class="{
          'va-button--ellipsis': n === '...',
        }"

        @click="onUserInput(n)"
        :flat="c_flat"
      >
        {{ n }}
      </va-button>
    </slot>
    <input
      v-else
      ref="input"
      class="va-pagination__input va-button"
      :style="{
        cursor: 'default',
        color: computeColor(color)
      }"
      :class="{ 'va-pagination__input--flat': flat }"
      @keydown.enter="changeValue"
      @focus="focusInput"
      @blur="changeValue"
      :disabled="c_disabled"
      :placeholder="`${currentValue}/${lastPage}`"
      v-model="inputValue"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="c_color"
      :size="c_size"
      :disabled="c_disabled || currentValue === lastPage"
      :icon="directionIconRight"
      @click="onUserInput(currentValue + 1)"
      :flat="c_flat"
    />
    <va-button
      v-if="showBoundaryLinks"
      outline
      :color="c_color"
      :size="c_size"
      :disabled="c_disabled || currentValue === lastPage"
      :icon="boundaryIconRight"
      :flat="c_flat"
      @click="onUserInput(lastPage)"
    />
  </va-button-group>
</template>

<script lang="ts">
import VaButtonGroup from '../va-button-group/VaButtonGroup.vue'
import VaButton from '../va-button/VaButton.vue'
import VaInput from '../va-input/VaInput.vue'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import { setPaginationRange } from './setPaginationRange'
import { ContextPluginMixin, makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import Component, { mixins } from 'vue-class-component'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

const PaginationPropsMixin = makeContextablePropsMixin({
  value: { type: Number, default: 1 },
  visiblePages: { type: Number, default: 0 },
  pages: { type: Number, default: null },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: 'medium', validator: (v: string) => ['medium', 'small', 'large'].includes(v) },
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
  color: { type: String, default: 'primary' },
})

const mixinsArr = [
  ContextPluginMixin,
  StatefulMixin,
  ColorThemeMixin,
  PaginationPropsMixin,
]
@Component({
  name: 'VaPagination',
  components: {
    VaButtonGroup,
    VaButton,
    VaInput,
  },
})
export default class VaPagination extends mixins(...mixinsArr) {
  private inputValue = ''

  private get lastPage () {
    const { total, pageSize, pages } = (this as any)
    return this.useTotal
      ? Math.ceil(total / pageSize)
      : pages
  }

  private get paginationRange () {
    const { visiblePages, total, pageSize, boundaryNumbers, pages } = (this as any)
    const value = this.currentValue || 1
    const totalPages = this.useTotal ? Math.ceil(total / pageSize) : pages
    return setPaginationRange(value, visiblePages, totalPages, boundaryNumbers)
  }

  private get showBoundaryLinks () {
    const { visiblePages, boundaryLinks, boundaryNumbers, input } = (this as any)
    return input ||
      ((visiblePages && this.lastPage > visiblePages) && boundaryLinks && !boundaryNumbers)
  }

  private get showDirectionLinks () {
    const { visiblePages, directionLinks, input } = (this as any)
    return input || ((visiblePages && this.lastPage > visiblePages) && directionLinks)
  }

  private get showPagination () {
    return this.lastPage > 1 || (!(this as any).hideOnSinglePage && this.lastPage <= 1)
  }

  private get fontColor () {
    return (this as any).computeColor((this as any).c_color)
  }

  private get useTotal () {
    return !!((this as any).total && (this as any).pageSize)
  }

  private mounted () {
    if (this.useTotal && (this as any).pages) {
      throw new Error('Please, use either `total` and `page-size` props, or `pages`.')
    }
  }

  private get currentValue () {
    const { valueComputed, pageSize } = (this as any)
    if (this.useTotal) {
      return Math.ceil(valueComputed / pageSize)
    } else {
      return valueComputed
    }
  }

  private set currentValue (value) {
    (this as any).valueComputed = value
  }

  private focusInput () {
    const { value, $nextTick, $refs } = (this as any)
    this.inputValue = value
    $nextTick(() => $refs.input.setSelectionRange(0, $refs.input.value.length))
  }

  private onUserInput (pageNum: number) {
    if (pageNum < 1 || pageNum > this.lastPage) {
      return
    }
    this.currentValue = (this as any).useTotal
      ? (pageNum - 1) * (this as any).pageSize + 1
      : pageNum
  }

  private resetInput () {
    this.inputValue = '';
    (this as any).$refs.input.blur()
  }

  private changeValue () {
    if (this.inputValue === (this as any).value) this.resetInput()
    if (!this.inputValue.length) return
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

  private activeButtonStyle (buttonValue: number) {
    const { c_color, computeInvertedColor, computeColor, fontColor } = (this as any)
    if (buttonValue === this.currentValue) {
      return {
        backgroundColor: computeColor(c_color),
        color: computeInvertedColor(),
      }
    } else {
      return {
        color: fontColor,
      }
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
