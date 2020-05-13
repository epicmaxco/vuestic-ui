<template>
  <div
    class="va-tabs"
    :class="computedTabsClass"
  >
    <div class="va-tabs__wrapper">
      <div
        class="va-tabs__tabs-wrapper"
        ref="wrapper"
      >
        <va-button
          v-if="showPagination"
          :disabled="disablePaginationLeft"
          class="va-tabs__pagination"
          flat
          size="medium"
          :icon="c_prevIcon"
          @click="movePaginationLeft"
        />
        <div
          class="va-tabs__container"
          :class="computedClass"
          ref="container"
        >
          <div
            class="va-tabs__tabs"
            :style="paginationControlledStyles"
            ref="tabs"
          >
            <div
              class="va-tabs__slider-wrapper"
              :style="sliderStyles"
            >
              <div class="va-tabs__slider" />
            </div>
            <va-tabs-items>
              <slot />
            </va-tabs-items>
          </div>
        </div>
        <va-button
          v-if="showPagination"
          :disabled="disablePaginationRight"
          class="va-tabs__pagination"
          flat
          size="medium"
          :icon="c_nextIcon"
          @click="movePaginationRight"
        />
      </div>
      <div class="va-tabs__content">
        <va-tabs-content>
          <slot />
        </va-tabs-content>
      </div>
    </div>
  </div>
</template>

<script>
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import VaButton from '../va-button/VaButton'
import VaTabsItems from './VaTabsItems'
import VaTabsContent from './VaTabsContent'

export default {
  name: 'VaTabs',
  components: {
    VaButton,
    VaTabsContent,
    VaTabsItems,
  },
  mixins: [
    ColorThemeMixin,
    VaTabsItems,
    StatefulMixin,
    makeContextablePropsMixin({
      value: {
        type: [String, Number],
        default: null,
      },
      left: {
        type: Boolean,
        default: true,
      },
      right: {
        type: Boolean,
        default: false,
      },
      center: {
        type: Boolean,
        default: false,
      },
      grow: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      hideSlider: {
        type: Boolean,
        default: false,
      },
      vertical: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: 'primary',
      },
      prevIcon: {
        type: String,
        default: 'chevron_left',
      },
      nextIcon: {
        type: String,
        default: 'chevron_right',
      },
    }),
  ],
  data () {
    return {
      tabs: [],
      sliderHeight: null,
      sliderWidth: null,
      sliderOffsetX: 0,
      sliderOffsetY: 0,
      showPagination: false,
      tabsContentOffset: 0,
      mutationObserver: null,
    }
  },
  computed: {
    computedClass () {
      return {
        'va-tabs__container--left': this.c_left && !this.c_right && !this.c_center && !this.c_grow,
        'va-tabs__container--right': this.c_right,
        'va-tabs__container--center': this.c_center,
        'va-tabs__container--grow': this.c_grow,
        'va-tabs__container--disabled': this.c_disabled,
      }
    },
    computedTabsClass () {
      return {
        'va-tabs--vertical': this.c_vertical,
      }
    },
    tabSelected () {
      return this.valueComputed
    },
    sliderStyles () {
      if (this.c_hideSlider) {
        return {
        }
      }
      if (this.c_vertical) {
        return {
          'background-color': this.colorComputed,
          height: `${this.sliderHeight}px`,
          transform: `translateY(-${this.sliderOffsetY}px) translateX(${this.sliderOffsetX}px)`,
        }
      }
      return {
        'background-color': this.colorComputed,
        width: `${this.sliderWidth}px`,
        transform: `translateY(-${this.sliderOffsetY}px) translateX(${this.sliderOffsetX}px)`,
      }
    },
    paginationControlledStyles () {
      // Prevents the movement of vertical tabs
      if (this.c_vertical) {
        return {
          transform: 'translateX(0px)',
        }
      }
      return {
        transform: `translateX(-${this.tabsContentOffset}px)`,
      }
    },
    disablePaginationLeft () {
      return this.tabsContentOffset === 0
    },
    disablePaginationRight () {
      return this.tabs[this.tabs.length - 1].rightSidePosition <= this.tabsContentOffset + this.$refs.container.clientWidth
    },
  },
  watch: {
    value () {
      this.updateTabsState()
    },
  },
  methods: {
    parseItems () {
      const content = this.$slots.default
      const length = content.length
      this.tabs = []

      for (let i = 0; i < length; i++) {
        if (content[i].componentOptions) {
          if (content[i].componentOptions.Ctor.options.name === 'VaTab') {
            const instance = content[i].componentInstance
            instance.id = instance.name || i

            this.tabs.push(instance)

            if (!instance._tabEventsInited) {
              // eslint-disable-next-line @typescript-eslint/no-this-alias
              const self = this

              instance.$on('click', function () { self.selectTab(this) })
              instance.$on('keydown.enter', function () { self.selectTab(this) })
              instance.$on('focus', function () { self.ensureVisible(this) })
              instance._tabEventsInited = true
            }
          }
        }
      }
    },
    selectTab (tab) {
      this.valueComputed = tab.id
      if (this.stateful) {
        this.updateTabsState()
      }
    },
    updateTabsState () {
      let hasActive = false
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].isActiveRouterLink) {
          this.ensureVisible(this.tabs[i])
          this.updateSlider(this.tabs[i])
          hasActive = true
          this.tabs[i].isActive = true
        } else if (this.tabs[i].id === this.tabSelected) {
          hasActive = true
          this.ensureVisible(this.tabs[i])
          this.updateSlider(this.tabs[i])
          this.tabs[i].isActive = true
        } else {
          this.tabs[i].isActive = false
        }
      }
      if (!hasActive) {
        this.resetSlider()
      }
    },
    updatePagination () {
      this.showPagination = false
      if (this.$refs.tabs && this.$refs.wrapper) {
        if (this.$refs.tabs.clientWidth > this.$refs.wrapper.clientWidth) { this.showPagination = true }
      }
    },
    movePaginationLeft () {
      let offsetToSet = this.tabsContentOffset - this.$refs.container.clientWidth

      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].rightSidePosition > this.tabsContentOffset && this.tabs[i].leftSidePosition < this.tabsContentOffset) {
          offsetToSet = this.tabs[i].rightSidePosition - this.$refs.container.clientWidth
        }
      }

      this.tabsContentOffset = offsetToSet < 0 ? 0 : offsetToSet
    },
    movePaginationRight () {
      const containerRightSide = this.tabsContentOffset + this.$refs.container.clientWidth
      let offsetToSet = containerRightSide

      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].rightSidePosition > containerRightSide && this.tabs[i].leftSidePosition < containerRightSide) {
          offsetToSet = this.tabs[i].leftSidePosition
        }
      }

      const maxOffset = this.tabs[this.tabs.length - 1].rightSidePosition - this.$refs.container.clientWidth

      offsetToSet = offsetToSet >= maxOffset ? maxOffset : offsetToSet
      this.tabsContentOffset = offsetToSet < 0 ? 0 : offsetToSet
    },
    ensureVisible (tab) {
      if (tab.leftSidePosition < this.tabsContentOffset) {
        this.tabsContentOffset = tab.leftSidePosition
      } else if (tab.rightSidePosition > this.tabsContentOffset + this.$refs.container.clientWidth) {
        this.tabsContentOffset = tab.rightSidePosition - this.$refs.container.clientWidth
      }
    },
    updateSlider (tab) {
      if (this.c_vertical) {
        this.sliderOffsetY = (this.$refs.container.clientHeight - tab.$el.offsetTop - tab.$el.clientHeight)
        this.sliderHeight = tab.$el.clientHeight
        this.sliderOffsetX = 0
        this.sliderWidth = null
      } else {
        this.sliderOffsetX = tab.$el.offsetLeft
        this.sliderWidth = tab.$el.clientWidth
        this.sliderOffsetY = 0
        this.sliderHeight = null
      }
    },
    resetSlider () {
      this.sliderOffsetX = 0
      this.sliderWidth = 0
      this.sliderOffsetY = 0
      this.sliderHeight = 0
    },
  },
  mounted () {
    this.parseItems()
    this.updateTabsState()
    this.updatePagination()

    this.mutationObserver = new MutationObserver(() => {
      this.parseItems()
      this.updateTabsState()
    })
    this.mutationObserver.observe(this.$refs.tabs, { childList: true, subtree: true })
  },
  beforeDestroy () {
    if (this.mutationObserver) { this.mutationObserver.disconnect() }
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-tabs {
  position: relative;

  &__wrapper {
    display: flex;
  }

  &__tabs-wrapper {
    overflow: hidden;
    contain: content;
    display: flex;
    flex: 1 1 auto;
  }

  .va-tabs__pagination {
    flex: 0 0 auto;
  }

  .va-tabs__container {
    overflow: hidden;
    flex: 1 1 auto;
    display: flex;
    height: 2.5rem;
    white-space: nowrap;
    position: relative;

    .va-tabs__tabs {
      position: absolute;
      transition: all ease 0.3s;
    }

    .va-tabs__tabs-items {
      display: flex;
    }

    &--right {
      justify-content: flex-end;
    }

    &--grow {
      .va-tabs__tabs {
        width: 100%;
      }

      .va-tab {
        flex: 1 0 auto;
        max-width: none;
      }
    }

    &--center {
      justify-content: center;
    }

    &--disabled {
      @include va-disabled();

      pointer-events: none;
    }
  }

  &--vertical {
    .va-tabs__tabs-wrapper {
      flex: 0 0 auto;
    }

    .va-tabs__container {
      height: auto;

      .va-tabs__tabs-items {
        flex-direction: column;
      }

      .va-tabs__tabs {
        position: relative;
      }
    }

    .va-tab {
      display: flex;

      &__content {
        flex: 0 0 auto;
      }
    }

    .va-tabs__content {
      flex: 1 0 auto;
    }
  }

  .va-tabs__slider-wrapper {
    bottom: 0;
    margin: 0 !important;
    position: absolute;
    z-index: 4000;
    transition: $transition-primary;

    .va-tabs__slider {
      width: 0.125rem;
      height: 0.125rem;
    }
  }
}
</style>
