<template>
  <va-button-group class="va-pagination">
    <va-button
      v-if="this.pages !== visiblePages && boundaryLinks"
      :style="directionButtonStyle"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || value === 1"
      :icon="iconClass.boundary"
      icon-right=""
      @click="changePage(1)"
    />
    <va-button
      v-if="this.pages !== visiblePages && directionLinks"
      :style="directionButtonStyle"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || value === 1"
      :icon="iconClass.direction"
      icon-right=""
      @click="changePage(value - 1)"
    />
    <va-button
      :style="activeButtonStyle(n)"
      outline
      :color="color"
      :size="size"
      :disabled="disabled"
      v-for="(n, key) in paginationRange"
      :key="key"
      :class="{ 'va-button--active': n === value }"
      icon=""
      icon-right=""
      @click="changePage(n)"
    >
      {{ n }}
    </va-button>
    <va-button
      v-if="this.pages !== visiblePages && directionLinks"
      :style="directionButtonStyle"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || value === this.pages"
      :icon="iconRightClass.direction"
      icon-right=""
      @click="changePage(value + 1)"
    />
    <va-button
      v-if="this.pages !== visiblePages && boundaryLinks"
      :style="directionButtonStyle"
      outline
      :color="color"
      :size="size"
      :disabled="disabled || value === this.pages"
      :icon="iconRightClass.boundary"
      icon-right=""
      @click="changePage(lastPage)"
    />
  </va-button-group>
</template>

<script>
import VaButtonGroup from '../va-button-group/VaButtonGroup'
import VaButton from '../va-button/VaButton'
import { setPaginationRange } from './setPaginationRange'
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaPagination',
  components: {
    VaButtonGroup,
    VaButton,
  },
  mixins: [ContextPluginMixin],
  props: {
    value: {
      type: Number,
      default () {
        return getContextPropValue(this, 'value', 1)
      },
    },
    visiblePages: {
      type: Number,
      default () {
        return getContextPropValue(this, 'visiblePages', 5)
      },
    },
    pages: {
      type: Number,
      default () {
        return getContextPropValue(this, 'pages', null)
      },
      required: true,
    },
    color: {
      type: String,
      default () {
        return getContextPropValue(this, 'color', 'info')
      },
    },
    disabled: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'disabled', false)
      },
    },
    size: {
      type: String,
      default () {
        return getContextPropValue(this, 'size', 'medium')
      },
      validator: value => {
        return ['medium', 'small', 'large'].includes(value)
      },
    },
    boundaryLinks: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'boundaryLinks', true)
      },
    },
    directionLinks: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'directionLinks', true)
      },
    },
    iconSet: {
      type: Object,
      default () {
        return getContextPropValue(this, 'iconSet', null)
      },
    },
    iconSetRight: {
      type: Object,
      default () {
        return getContextPropValue(this, 'iconSetRight', null)
      },
    },
  },
  data () {
    return {
      defaultIconClass: {
        direction: 'chevron_left',
        boundary: 'first_page',
      },
      defaultIconRightClass: {
        direction: 'chevron_right',
        boundary: 'last_page',
      },
    }
  },
  computed: {
    directionButtonStyle () {
      return {
        backgroundColor: 'transparent',
        borderColor: this.disabled ? '#babfc2' : '',
        opacity: 1,
      }
    },
    iconClass () {
      return Object.assign({}, this.defaultIconClass, this.iconSet)
    },
    iconRightClass () {
      return Object.assign({}, this.defaultIconRightClass, this.iconSetRight)
    },
    lastPage () {
      return this.pages
    },
    paginationRange () {
      return setPaginationRange(this.value, this.visiblePages, this.pages)
    },
  },
  methods: {
    changePage (pageNum) {
      if (pageNum < 1 || pageNum > this.pages) {
        return
      }
      this.$emit('input', pageNum)
    },
    activeButtonStyle (buttonValue) {
      if (buttonValue === this.value) {
        return {
          backgroundColor: this.disabled ? '#babfc2' : this.$themes[this.toggleColor ? this.toggleColor : this.color],
          borderColor: this.disabled ? '#babfc2' : this.$themes[this.color],
          opacity: 1,
          color: this.disabled ? '#babfc2' : '#ffffff',
        }
      } else {
        return {
          backgroundColor: 'transparent',
          borderColor: this.disabled ? '#babfc2' : this.$themes[this.color],
          opacity: 1,
          color: this.disabled ? '#babfc2' : this.$themes[this.color],
        }
      }
    },
  },
}
</script>

<style lang='scss'>
@import "../../vuestic-sass/resources/resources";

.va-pagination {
  .va-button--disabled {
    i {
      color: $brand-secondary;
    }
  }
}
</style>
