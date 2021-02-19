<script>
import { h } from 'vue'

const getPropsData = (slot) => {
  return slot && slot.props
}

const getIsActive = (slot) => {
  const propsData = getPropsData(slot)
  if (!propsData) {
    return false
  }

  return !!(propsData.active || propsData.active === '') // Check because for boolean empty prop means true
}

const processSlots = (context) => {
  const defaultSlots = context.$slots.default()
  const slots = (defaultSlots && defaultSlots[0]) ? defaultSlots[0].children : []

  slots.forEach((slot, index) => {
    const propsData = getPropsData(slot)

    if (!propsData) {
      return
    }

    // Pass down vertical prop.
    propsData.vertical = context.$props.vertical

    if (context.$props.centered) {
      // Every second slot will be inverted
      propsData.inverted = !!(index % 2)
    }

    if (index === 0) {
      propsData.isFirst = true
    }
    if (index === slots.length - 1) {
      propsData.isLast = true
    }

    const currentSlotActive = propsData.active || propsData.active === '' // Check because for boolean empty prop means true.

    // For inactive slot we props are default.
    if (!currentSlotActive) {
      return
    }

    if (index === 0) {
      propsData.activePrevious = currentSlotActive
    }

    if (index === slots.length - 1) {
      propsData.activeNext = currentSlotActive
    }

    const previousSlotActive = getIsActive(slots[index - 1])
    if (previousSlotActive) {
      propsData.activePrevious = true
    }

    const nextSlotActive = getIsActive(slots[index + 1])
    if (nextSlotActive) {
      propsData.activeNext = true
    }
  })

  return slots
}

const $root = 'va-timeline'

export default {
  name: $root,
  props: {
    vertical: Boolean,
    centered: Boolean,
    alignTop: Boolean,
  },
  render () {
    const classes = {
      [$root]: true,
      [`${$root}--vertical`]: this.$props.vertical,
      [`${$root}--align-top`]: this.$props.alignTop,
    }
    if (this.$data.staticClass) {
      classes[this.$data.staticClass] = true
    }

    return h(
      'div',
      {
        class: classes,
        style: this.$data.staticStyle,
      },
      processSlots(this),
    )
  },
}
</script>

<style lang="scss">
$timeline-outer-spacing: 2rem;

.va-timeline {
  display: flex;
  flex-wrap: nowrap;

  &--vertical {
    flex-direction: column;
    padding-left: 0.25rem;
    padding-right: 0.25rem;

    /* min-width: 300px; */
  }

  &--align-top {
    .va-timeline-item__before,
    .va-timeline-item__after {
      flex: 0;
    }
  }

  .va-timeline-item {
    flex: 1;
  }

  .va-timeline-item--vertical {
    .va-timeline-separator--vertical .va-timeline-separator__line {
      &:first-child {
        flex: 0 0 1rem;
      }
    }

    &.va-timeline-item--is-first {
      .va-timeline-separator--vertical .va-timeline-separator__line {
        &:first-child {
          flex-basis: 2rem;
        }
      }

      .va-timeline-item__after,
      .va-timeline-item__before {
        padding-top: $timeline-outer-spacing;
      }
    }

    &.va-timeline-item--vertical.va-timeline-item--is-last {
      .va-timeline-item__after,
      .va-timeline-item__before {
        padding-bottom: $timeline-outer-spacing;
      }
    }
  }
}
</style>
