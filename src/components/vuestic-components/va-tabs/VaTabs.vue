<template>
  <div class="va-tabs">
    <div
      class="va-tabs__wrapper"
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
          class="va-tabs__content"
          :style="paginationControlledStyles"
          ref="content"
        >
          <div
            class="va-tabs__slider-wrapper"
            :style="sliderStyles"
          >
            <div class="va-tabs__slider" />
          </div>
          <slot />
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
  </div>
</template>

<script>
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import VaButton from '../va-button/VaButton'

const tabsContextMixin = makeContextablePropsMixin({
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
  stateful: {
    type: Boolean,
    default: false,
  },
  prevIcon: {
    type: String,
    default: 'chevron_left',
  },
  nextIcon: {
    type: String,
    default: 'chevron_right',
  },
})

export default {
  name: 'VaTabs',
  components: {
    VaButton,
  },
  mixins: [
    ColorThemeMixin,
    tabsContextMixin,
  ],
  data () {
    return {
      tabs: [],
      innerValue: null,
      sliderWidth: 0,
      sliderOffset: 0,
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
        'va-tabs__container--vertical': this.c_vertical,
      }
    },
    tabSelected () {
      return this.c_stateful ? this.innerValue : this.value
    },
    sliderStyles () {
      return {
        'background-color': this.colorComputed,
        width: `${this.c_hideSlider ? 0 : this.sliderWidth}px`,
        transform: `translateX(${this.sliderOffset}px`,
      }
    },
    paginationControlledStyles () {
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
    value (newVal) {
      if (this.c_stateful) this.innerValue = newVal
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
              const self = this

              instance.$on('click', function (e) { self.selectTab(this) })
              instance.$on('keydown.enter', function (e) { self.selectTab(this) })
              instance.$on('focus', function (e) { self.ensureVisible(this) })
              instance._tabEventsInited = true
            }
          }
        }
      }
    },
    selectTab (tab) {
      if (this.c_stateful) {
        this.innerValue = tab.id
        this.updateTabsState()
      }
      this.$emit('input', tab.id)
    },
    updateTabsState () {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].isActiveRouterLink) {
          this.ensureVisible(this.tabs[i])
          this.updateSlider(this.tabs[i])
          this.tabs[i].isActive = true
        } else if (this.tabs[i].id === this.tabSelected) {
          this.ensureVisible(this.tabs[i])
          this.updateSlider(this.tabs[i])
          this.tabs[i].isActive = true
        } else {
          this.tabs[i].isActive = false
        }
      }
    },
    updatePagination () {
      this.showPagination = false
      if (this.$refs.content && this.$refs.wrapper) {
        if (this.$refs.content.clientWidth > this.$refs.wrapper.clientWidth) this.showPagination = true
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
      this.sliderOffset = tab.$el.offsetLeft
      this.sliderWidth = tab.$el.clientWidth
    },
  },
  mounted () {
    if (this.c_stateful) this.innerValue = this.value
    this.parseItems()
    this.updateTabsState()
    this.updatePagination()

    this.mutationObserver = new MutationObserver(() => {
      this.parseItems()
    })
    this.mutationObserver.observe(this.$refs.content, { childList: true })
  },
  beforeDestroy () {
    if (this.mutationObserver) this.mutationObserver.disconnect()
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-tabs {
  position: relative;

  .va-tabs__wrapper {
    overflow: hidden;
    contain: content;
    display: flex;
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

    .va-tabs__content {
      position: absolute;
      transition: all ease 0.3s;
    }

    &--right {
      display: flex;
      justify-content: flex-end;
    }

    &--grow {
      .va-tab {
        flex: 1 0 auto;
        max-width: none;
      }
    }

    &--center,
    &--right {
      > .va-tab:first-child {
        margin-left: auto;
      }

      .va-tabs__slider-wrapper + .va-tab {
        margin-left: auto;
      }
    }

    &--center {
      > .va-tab:last-child {
        margin-right: auto;
      }
    }

    &--disabled {
      @include va-disabled();

      pointer-events: none;
    }
  }

  .va-tabs__slider-wrapper {
    bottom: 0;
    margin: 0 !important;
    position: absolute;
    z-index: 4000;
    transition: $transition-primary;

    .va-tabs__slider {
      width: 100%;
      height: 0.125rem;
    }
  }
}
</style>
