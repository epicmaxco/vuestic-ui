<script lang="ts">
import { defineComponent, h } from 'vue'
import { useComponentPresetProp } from '../../../composables'
import { extractComponentProps, filterComponentProps } from '../../../utils/component-options'

import { VaTimelineSeparator } from '../VaTimelineSeparator'

const COMPONENT_NAME = 'va-timeline-item'
const VaTimelineSeparatorProps = extractComponentProps(VaTimelineSeparator)

export default defineComponent({
  name: COMPONENT_NAME,
  props: {
    ...useComponentPresetProp,
    ...VaTimelineSeparatorProps,
    color: { type: String, default: 'primary' },
    isFirst: { type: Boolean },
    isLast: { type: Boolean },
    inverted: { type: Boolean },
  },
  setup (props, { slots }) {
    const children = [
      h(
        VaTimelineSeparator,
        { ...filterComponentProps(VaTimelineSeparatorProps).value },
      ),
    ]

    const before = props.inverted ? slots.after : slots.before

    if (before) {
      children.unshift(
        h(
          'div',
          { class: `${COMPONENT_NAME}__before` },
          before(),
        ),
      )
    }

    const after = props.inverted ? slots.before : slots.after

    if (after) {
      children.push(
        h(
          'div',
          { class: `${COMPONENT_NAME}__after` },
          after(),
        ),
      )
    }

    return () => h(
      'div',
      {
        class: [
          { [COMPONENT_NAME]: true },
          { [`${COMPONENT_NAME}--vertical`]: props.vertical },
          { [`${COMPONENT_NAME}--is-first`]: props.isFirst },
          { [`${COMPONENT_NAME}--is-last`]: props.isLast },
        ],
      },
      children,
    )
  },
})
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

  // &__before {
  //   .va-timeline-item__text {
  //     float: right;
  //   }
  // }

  // &__after {
  //   .va-timeline-item__text {
  //     float: left;
  //   }
  // }

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
      padding-top: 0.5rem;
    }
  }

  // &__title {
  //   text-align: var(--va-timeline-item-title-text-align);
  //   color: var(--va-timeline-item-title-color);
  //   font-weight: var(--va-timeline-item-title-font-weight);
  //   font-size: var(--va-timeline-item-title-font-size);
  //   text-transform: var(--va-timeline-item-title-text-transform);
  // }

  // &__description {
  //   margin-top: var(--va-timeline-item-description-margin-top);
  //   text-align: var(--va-timeline-item-description-text-align);
  // }

  // &__text {
  //   line-height: 1;
  // }
}
</style>
