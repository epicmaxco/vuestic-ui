<template>
  <va-button-group
    class="va-pagination"
    v-if="showPagination"
  >
    <va-button
      v-if="showBoundaryLinks"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || currentValue === 1"
      :icon="boundaryIconLeft"
      @click="onUserInput(1)"
      :flat="flat"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || currentValue === 1"
      :icon="directionIconLeft"
      @click="onUserInput(currentValue - 1)"
      :flat="flat"
    />
    <slot v-if="!input">
      <va-button
        :style="activeButtonStyle(n)"
        outline
        v-for="(n, key) in paginationRange"
        :key="key"
        :color="color"
        :size="size"
        :disabled="disabled || n === '...'"
        :class="{
          'va-button--ellipsis': n === '...',
        }"

        @click="onUserInput(n)"
        :flat="flat"
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
        color: computeColor(color),
        opacity: disabled ? 0.4 : 1
      }"
      :class="{ 'va-pagination__input--flat': flat }"
      @keydown.enter="changeValue"
      @focus="focusInput"
      @blur="changeValue"
      :disabled="disabled"
      :placeholder="`${currentValue}/${lastPage}`"
      v-model="inputValue"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || currentValue === lastPage"
      :icon="directionIconRight"
      @click="onUserInput(currentValue + 1)"
      :flat="flat"
    />
    <va-button
      v-if="showBoundaryLinks"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || currentValue === lastPage"
      :icon="boundaryIconRight"
      :flat="flat"
      @click="onUserInput(lastPage)"
    />
  </va-button-group>
</template>

<script lang="ts">
import { Watch, Ref, Component, Mixins, Prop } from 'vue-property-decorator'

import VaButtonGroup from '../va-button-group'
import VaButton from '../va-button'
import VaInput from '../va-input'

import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { setPaginationRange } from './setPaginationRange'
import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'

@Component({
  name: 'VaPagination',
  components: {
    VaButtonGroup,
    VaButton,
    VaInput,
  },
})
export default class VaPagination extends Mixins(
  StatefulMixin,
  ColorThemeMixin,
) {
  inputValue = ''

  @Prop({ type: Number, default: 1 }) value!: number
  @Prop({ type: Number, default: 0 }) visiblePages!: number
  @Prop({ type: Number, default: 0 }) pages!: number
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({
    type: String,
    default: 'medium',
    validator: (v: string) => ['medium', 'small', 'large'].includes(v),
  }) size!: string

  @Prop({ type: Boolean, default: true }) boundaryLinks!: boolean
  @Prop({ type: Boolean, default: false }) boundaryNumbers!: boolean
  @Prop({ type: Boolean, default: true }) directionLinks!: boolean
  @Prop({ type: Boolean, default: false }) input!: boolean
  @Prop({ type: Boolean, default: false }) hideOnSinglePage!: boolean
  @Prop({ type: Boolean, default: false }) flat!: string
  @Prop({ type: Number, default: null }) total!: number
  @Prop({ type: Number, default: null }) pageSize!: number
  @Prop({ type: String, default: 'first_page' }) boundaryIconLeft!: string
  @Prop({ type: String, default: 'last_page' }) boundaryIconRight!: string
  @Prop({ type: String, default: 'chevron_left' }) directionIconLeft!: string
  @Prop({ type: String, default: 'chevron_right' }) directionIconRight!: string

  @Ref() readonly htmlInput!: HTMLInputElement

  get lastPage () {
    const { total, pageSize, pages } = this
    return this.useTotal
      ? Math.ceil(total / pageSize) || 1
      : pages
  }

  get paginationRange () {
    const { visiblePages, total, pageSize, boundaryNumbers, pages } = this
    const value = this.currentValue || 1
    const totalPages = this.useTotal ? Math.ceil(total / pageSize) : pages
    return setPaginationRange(value as number, visiblePages, totalPages, boundaryNumbers)
  }

  get showBoundaryLinks () {
    const { visiblePages, boundaryLinks, boundaryNumbers, input } = this
    return input ||
      ((visiblePages && this.lastPage > visiblePages) && boundaryLinks && !boundaryNumbers)
  }

  get showDirectionLinks () {
    const { visiblePages, directionLinks, input } = this
    return input || ((visiblePages && this.lastPage > visiblePages) && directionLinks)
  }

  get showPagination () {
    return this.lastPage > 1 || (!this.hideOnSinglePage && this.lastPage <= 1)
  }

  get fontColor () {
    // @ts-ignore
    return this.computeColor(this.color)
  }

  get useTotal () {
    const { total, pageSize } = this
    return !!((total || total === 0) && pageSize)
  }

  get currentValue () {
    if (this.useTotal) {
      // @ts-ignore
      return Math.ceil(this.valueComputed / this.pageSize) || 1
    } else {
      return this.valueComputed
    }
  }

  set currentValue (value) {
    this.valueComputed = value
  }

  @Watch('useTotal', { immediate: true })
  @Watch('pages', { immediate: true })
  onModeChange () {
    if (this.useTotal && this.pages) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Please, use either `total` and `page-size` props, or `pages`.')
      }
    }
  }

  focusInput () {
    const { currentValue, $nextTick } = this
    // @ts-ignore
    this.inputValue = currentValue
    $nextTick(() => this.htmlInput.setSelectionRange(0, this.htmlInput.value.length))
  }

  onUserInput (pageNum: number) {
    if (pageNum < 1 || pageNum > this.lastPage) {
      return
    }
    this.currentValue = this.useTotal
      ? (pageNum - 1) * this.pageSize + 1
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
        // @ts-ignore
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
