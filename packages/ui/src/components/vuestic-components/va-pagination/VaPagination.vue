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
      :icon="c_boundaryIconLeft"
      @click="onUserInput(1)"
      :flat="c_flat"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="c_color"
      :size="c_size"
      :disabled="c_disabled || currentValue === 1"
      :icon="c_directionIconLeft"
      @click="onUserInput(currentValue - 1)"
      :flat="c_flat"
    />
    <slot v-if="!c_input">
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
        color: computeColor(c_color),
        opacity: c_disabled ? 0.4 : 1
      }"
      :class="{ 'va-pagination__input--flat': c_flat }"
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
      :icon="c_directionIconRight"
      @click="onUserInput(currentValue + 1)"
      :flat="c_flat"
    />
    <va-button
      v-if="showBoundaryLinks"
      outline
      :color="c_color"
      :size="c_size"
      :disabled="c_disabled || currentValue === lastPage"
      :icon="c_boundaryIconRight"
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
import {
  ContextPluginMixin,
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'
import Component, { mixins } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

const PaginationPropsMixin = makeContextablePropsMixin({
  value: { type: Number, default: 1 },
  visiblePages: { type: Number, default: 0 },
  pages: { type: Number, default: null },
  disabled: { type: Boolean, default: false },
  size: {
    type: String,
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
    const { c_total, c_pageSize, c_pages } = (this as any)
    return this.useTotal
      ? Math.ceil(c_total / c_pageSize) || 1
      : c_pages
  }

  private get paginationRange () {
    const { c_visiblePages, c_total, c_pageSize, c_boundaryNumbers, c_pages } = (this as any)
    const value = this.currentValue || 1
    const totalPages = this.useTotal ? Math.ceil(c_total / c_pageSize) : c_pages
    return setPaginationRange(value, c_visiblePages, totalPages, c_boundaryNumbers)
  }

  private get showBoundaryLinks () {
    const { c_visiblePages, c_boundaryLinks, c_boundaryNumbers, c_input } = (this as any)
    return c_input ||
      ((c_visiblePages && this.lastPage > c_visiblePages) && c_boundaryLinks && !c_boundaryNumbers)
  }

  private get showDirectionLinks () {
    const { c_visiblePages, c_directionLinks, c_input } = (this as any)
    return c_input || ((c_visiblePages && this.lastPage > c_visiblePages) && c_directionLinks)
  }

  private get showPagination () {
    return this.lastPage > 1 || (!(this as any).c_hideOnSinglePage && this.lastPage <= 1)
  }

  private get fontColor () {
    return (this as any).computeColor((this as any).c_color)
  }

  private get useTotal () {
    const { c_total, c_pageSize } = (this as any)
    return !!((c_total || c_total === 0) && c_pageSize)
  }

  private get currentValue () {
    if (this.useTotal) {
      return Math.ceil((this as any).valueComputed / (this as any).c_pageSize) || 1
    } else {
      return (this as any).valueComputed
    }
  }

  private set currentValue (value) {
    (this as any).valueComputed = value
  }

  @Watch('useTotal', { immediate: true })
  @Watch('pages', { immediate: true })
  private onModeChange () {
    if (this.useTotal && (this as any).c_pages) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Please, use either `total` and `page-size` props, or `c_pages`.')
      }
    }
  }

  private focusInput () {
    const { currentValue, $nextTick, $refs } = (this as any)
    this.inputValue = currentValue
    $nextTick(() => $refs.input.setSelectionRange(0, $refs.input.value.length))
  }

  private onUserInput (pageNum: number) {
    if (pageNum < 1 || pageNum > this.lastPage) {
      return
    }
    this.currentValue = (this as any).useTotal
      ? (pageNum - 1) * (this as any).c_pageSize + 1
      : pageNum
  }

  private resetInput () {
    this.inputValue = '';
    (this as any).$refs.input.blur()
  }

  private changeValue () {
    if (this.inputValue === this.currentValue) this.resetInput()
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
    if (buttonValue === this.currentValue) {
      return {
        backgroundColor: (this as any).colorComputed,
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
