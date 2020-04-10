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
      :disabled="c_disabled || valueComputed === 1"
      :icon="iconClass.boundary"
      @click="onUserInput(1)"
      :flat="c_flat"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="c_color"
      :size="c_size"
      :disabled="c_disabled || valueComputed === 1"
      :icon="iconClass.direction"
      @click="onUserInput(valueComputed - 1)"
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
      :placeholder="`${valueComputed}/${lastPage}`"
      v-model="inputValue"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="c_color"
      :size="c_size"
      :disabled="c_disabled || valueComputed === lastPage"
      :icon="iconRightClass.direction"
      @click="onUserInput(valueComputed + 1)"
      :flat="c_flat"
    />
    <va-button
      v-if="showBoundaryLinks"
      outline
      :color="c_color"
      :size="c_size"
      :disabled="c_disabled || valueComputed === lastPage"
      :icon="iconRightClass.boundary"
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
import { Watch } from 'vue-property-decorator'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

interface IconSet {
  direction: string;
  boundary: string;
}

const PaginationPropsMixin = makeContextablePropsMixin({
  value: { type: Number, default: 1 },
  visiblePages: { type: Number, default: 5 },
  pages: { type: Number, default: null },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: 'medium', validator: (v: string) => ['medium', 'small', 'large'].includes(v) },
  boundaryLinks: { type: Boolean, default: true },
  boundaryNumbers: { type: Boolean, default: false },
  directionLinks: { type: Boolean, default: true },
  iconFont: { type: Object, default: null },
  iconFontRight: { type: Object, default: null },
  input: { type: Boolean, default: false },
  hideOnSinglePage: { type: Boolean, default: false },
  flat: { type: Boolean, default: false },
  total: { type: Number, default: null },
  pageSize: { type: Number, default: null },
  iconSet: { type: Object, default: null },
  iconSetRight: { type: Object, default: null },
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
  private defaultIconClass: IconSet = {
    direction: 'chevron_left',
    boundary: 'first_page',
  }

  private defaultIconRightClass: IconSet = {
    direction: 'chevron_right',
    boundary: 'last_page',
  }

  private inputValue = ''

  private get iconClass () {
    return Object.assign({}, this.defaultIconClass, (this as any).iconSet)
  }

  private get iconRightClass () {
    return Object.assign({}, this.defaultIconRightClass, (this as any).iconSetRight)
  }

  private get lastPage () {
    const { total, pageSize, pages } = (this as any)
    return this.useTotal
      ? Math.ceil(total / pageSize)
      : pages
  }

  private get paginationRange () {
    const { valueComputed, visiblePages, total, pageSize, boundaryNumbers, pages } = (this as any)
    return this.useTotal
      ? setPaginationRange(valueComputed, visiblePages, Math.ceil(total / pageSize), boundaryNumbers)
      : setPaginationRange(valueComputed, visiblePages, pages, boundaryNumbers)
  }

  private get showBoundaryLinks () {
    const { visiblePages, boundaryLinks, boundaryNumbers } = (this as any)
    return this.lastPage > visiblePages && boundaryLinks && !boundaryNumbers
  }

  private get showDirectionLinks () {
    return this.lastPage > (this as any).visiblePages && (this as any).directionLinks
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

  @Watch('pageSize')
  onPageSizeChange (newPageSize: number, oldPageSize: number) {
    let { valueComputed } = (this as any)
    const newPage = Math.ceil(((valueComputed - 1) * oldPageSize + 1) / newPageSize)
    valueComputed = newPage
  }

  private mounted () {
    if ((this as any).stateful) {
      (this as any).valueComputed = 1
    }
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
    (this as any).valueComputed = pageNum
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
        pageNum = (this as any).valueComputed
        break
      default:
        break
    }
    this.onUserInput(pageNum)
    this.resetInput()
  }

  private activeButtonStyle (buttonValue: number) {
    const { valueComputed, c_color, computeInvertedColor, computeColor, fontColor } = (this as any)
    if (buttonValue === valueComputed) {
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
