<script>
import { VaTimelineSeparator } from '../VaTimelineSeparator/index.ts'
import { h } from 'vue'
import { useComponentPresetProp } from '../../../composables/useComponentPreset'

export const $root = 'va-timeline-item'

export default {
  name: $root,
  props: {
    ...useComponentPresetProp,
    color: {
      type: String,
      default: 'success',
    },
    vertical: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
    activePrevious: {
      type: Boolean,
    },
    activeNext: {
      type: Boolean,
    },
    isFirst: {
      type: Boolean,
    },
    isLast: {
      type: Boolean,
    },
    inverted: {
      type: Boolean,
    },
  },
  render () {
    const props = {
      color: this.color,
      vertical: this.vertical,
      active: this.active,
      activePrevious: this.activePrevious,
      activeNext: this.activeNext,
    }

    const children = [
      h(
        VaTimelineSeparator,
        {
          ...props,
        },
      ),
    ]

    const before = this.inverted ? this.$slots.after : this.$slots.before

    if (before) {
      children.unshift(
        h(
          'div',
          {
            class: `${$root}__before`,
            ...props,
          },
          before(),
        ),
      )
    }

    const after = this.inverted ? this.$slots.before : this.$slots.after
    if (after) {
      children.push(
        h(
          'div',
          {
            class: `${$root}__after`,
            ...props,
          },
          after(),
        ),
      )
    }

    return h(
      'div',
      {
        class: [
          { [$root]: true },
          { [`${$root}--vertical`]: this.vertical },
          { [`${$root}--is-first`]: this.isFirst },
          { [`${$root}--is-last`]: this.isLast },
        ],
      },
      children,
    )
  },
}
</script>

<style lang="scss">
@import "../../../styles/resources";
@import 'variables';

.va-timeline-item {
  display: var(--va-timeline-item-display);
  flex-direction: var(--va-timeline-item-flex-direction);

  &__before,
  &__after {
    flex: 1;
  }

  &--vertical {
    flex-direction: var(--va-timeline-item-vertical-flex-direction);
    flex-wrap: var(--va-timeline-item-vertical-flex-wrap);
    align-items: var(--va-timeline-item-vertical-align-items);

    .va-timeline-item__before,
    .va-timeline-item__after {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .va-timeline-item__before {
      padding-right: 1rem;
    }

    .va-timeline-item__after {
      padding-left: 1rem;
    }
  }

  &__before {
    .va-timeline-item__text {
      float: right;
    }
  }

  &__after {
    .va-timeline-item__text {
      float: left;
    }
  }

  &:not(&--vertical) {
    .va-timeline-item__before,
    .va-timeline-item__after {
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .va-timeline-item__before {
      padding-bottom: 0.5rem;
    }

    .va-timeline-item__after {
      padding-top: 1rem;
    }
  }

  &__title {
    text-align: var(--va-timeline-item-title-text-align);
    color: var(--va-timeline-item-title-color);
    font-weight: var(--va-timeline-item-title-font-weight);
    font-size: var(--va-timeline-item-title-font-size);
    text-transform: var(--va-timeline-item-title-text-transform);
  }

  &__description {
    margin-top: var(--va-timeline-item-description-margin-top);
    text-align: var(--va-timeline-item-description-text-align);
  }

  &__text {
    line-height: 1;
  }
}
</style>
