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
      @click="changePage(lastPage)"
    />
  </va-button-group>
</template>

<script>
import VaButtonGroup from '../va-button-group/VaButtonGroup'
import VaButton from '../va-button/VaButton'
import { setPaginationRange } from './setPaginationRange'

export default {
  name: 'va-pagination',
  components: {
    VaButtonGroup,
    VaButton,
  },
  props: {
    value: {
      type: Number,
    },
    visiblePages: {
      type: Number,
      default: 5,
    },
    pages: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: 'info',
    },
    disabled: {
      type: Boolean,
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => {
        return ['medium', 'small', 'large'].includes(value)
      },
    },
    boundaryLinks: {
      type: Boolean,
      default: true,
    },
    directionLinks: {
      type: Boolean,
      default: true,
    },
    iconSet: {
      type: Object,
      default: () => {
        return {}
      },
    },
    iconSetRight: {
      type: Object,
      default: () => {
        return {}
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
