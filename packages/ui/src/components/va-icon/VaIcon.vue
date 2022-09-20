<template>
  <component
    :is="computedTag"
    class="va-icon"
    aria-hidden="true"
    :class="computedClass"
    :style="computedStyle"
    v-bind="computedAttrs"
    notranslate
  >
    <slot>
      <template v-if="iconConfig.content">
        {{ iconConfig.content }}
      </template>
    </slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import omit from 'lodash/omit.js'

import { useIcons } from '../../services/icon-config/icon-config'
import { useColors, useSize, useSizeProps } from '../../composables'

export default defineComponent({
  name: 'VaIcon',
  props: {
    ...useSizeProps,
    name: { type: String, default: '' },
    tag: { type: String },
    component: { type: Object as PropType<any> },
    color: { type: String },
    rotation: { type: [String, Number] },
    spin: { type: [String, Boolean] },
    flip: {
      type: String as PropType<'off' | 'horizontal' | 'vertical' | 'both'>,
      default: 'off',
      validator: (value: string) => ['off', 'horizontal', 'vertical', 'both'].includes(value),
    },
  },
  setup (props, { attrs }) {
    const { getColor } = useColors()
    const { sizeComputed } = useSize(props)
    const { getIcon } = useIcons(props)

    const iconConfig = computed(() => getIcon(props.name))

    const computedTag = computed(() => props.component || props.tag || iconConfig.value.component || iconConfig.value.tag || 'i')

    const computedAttrs = computed(() => ({ ...iconConfig.value.attrs, ...omit(attrs, ['class']) }))

    const getSpinClass = (spin?: string | boolean) => {
      if (spin === undefined || spin === false) { return }
      return spin === 'counter-clockwise' ? 'va-icon--spin-reverse' : 'va-icon--spin'
    }

    const computedClass = computed(() => [
      iconConfig.value.class,
      getSpinClass(props.spin ?? iconConfig.value.spin),
    ])

    const transformStyle = computed(() => {
      const rotation = props.rotation ? `rotate(${props.rotation}deg)` : ''

      const flipY = (props.flip === 'vertical' || props.flip === 'both') ? -1 : 1
      const flipX = (props.flip === 'horizontal' || props.flip === 'both') ? -1 : 1
      const scale = props.flip === 'off' ? '' : `scale(${flipY}, ${flipX})`

      return `${scale} ${rotation}`.trim()
    })

    const computedStyle = computed(() => ({
      transform: transformStyle.value,
      cursor: attrs.onClick ? 'pointer' : null,
      color: props.color ? getColor(props.color, undefined, true) : iconConfig.value.color,
      fontSize: sizeComputed.value,
      height: sizeComputed.value,
      lineHeight: sizeComputed.value,
    }))

    return {
      iconConfig,
      computedTag,
      computedAttrs,
      computedClass,
      computedStyle,
    }
  },
})
</script>

<style lang="scss">
  @import "variables";
  @import '../../styles/resources';

  .va-icon {
    vertical-align: var(--va-icon-vertical-align);
    user-select: var(--va-icon-user-select);

    &[role^="button"][tabindex]:not([tabindex^="-"]) {
      cursor: pointer;

      @include keyboard-focus-outline;
    }

    &#{&} {
      // need 2 classes to make it work
      font-style: normal;
    }

    &--spin {
      animation: va-icon--spin-animation 1500ms linear infinite;

      &-reverse {
        animation: va-icon--spin-animation 1500ms linear infinite;
        animation-direction: reverse;
      }
    }

    @keyframes va-icon--spin-animation {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    svg {
      fill: currentColor;
      height: 100%;
    }
  }
</style>
