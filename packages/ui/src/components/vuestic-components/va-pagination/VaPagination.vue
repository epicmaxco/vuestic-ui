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
      :disabled="disabled || value === 1"
      :icon="iconClass.boundary"
      @click="changePage(1)"
      :flat="flat"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || value === 1"
      :icon="iconClass.direction"
      @click="changePage(value - 1)"
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
          'va-button--active': n === value,
          'va-button--idle': n !== value,
          'va-button--disabled': n === '...' || disabled,
          'va-button--ellipsis': n === '...',
        }"

        @click="changePage(n)"
        :flat="flat"
      >
        {{ n }}
      </va-button>
    </slot>
    <va-input
      v-else
      :color="color"
      inside-pagination
      ref="input"
      class="va-button"
      v-model="inputValue"
      @keydown.enter="changeValue"
      @focus="focusInput"
      @blur="changeValue"
      :placeholder="`${value}/${lastPage}`"
    />
    <va-button
      v-if="showDirectionLinks"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || value === lastPage"
      :icon="iconRightClass.direction"
      @click="changePage(value + 1)"
      :flat="flat"
    />
    <va-button
      v-if="showBoundaryLinks"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || value === lastPage"
      :icon="iconRightClass.boundary"
      :flat="flat"
      @click="changePage(lastPage)"
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

const paginationPropsMixin = makeContextablePropsMixin({
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
  paginationPropsMixin,
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

  private useTotal = false

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
    return (this as any).computeColor((this as any).color)
  }

  @Watch('pageSize')
  onPageSizeChange (newPageSize: number, oldPageSize: number) {
    let { valueComputed } = (this as any)
    const newPage = Math.ceil(((valueComputed - 1) * oldPageSize + 1) / newPageSize)
    valueComputed = newPage
  }

  private mounted () {
    this.useTotal = !!((this as any).total && (this as any).pageSize)
  }

  private focusInput () {
    (this as any).$refs.input.selectAll((this as any).valueComputed)
  }

  private changePage (pageNum: number) {
    if (pageNum < 1 || pageNum > this.lastPage) {
      return
    }
    (this as any).valueComputed = pageNum
  }

  private resetInput () {
    (this as any).$refs.input.reset()
  }

  private changeValue () {
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
    this.changePage(pageNum)
    this.resetInput()
  }

  private activeButtonStyle (buttonValue: number) {
    const { valueComputed, color, computeInvertedColor, computeColor, fontColor } = (this as any)
    if (buttonValue === valueComputed) {
      return {
        backgroundColor: computeColor(color),
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
  .va-input.va-button,
  .va-button--ellipsis {
    cursor: default;
  }
}
</style>
