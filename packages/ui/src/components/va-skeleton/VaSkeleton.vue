<template>
  <component
    class="va-skeleton"
    role="status"
    aria-live="polite"
    :aria-label="tp($props.ariaLabel)"
    aria-atomic="true"
    :class="classes"
    :is="tag"
  >
    <slot />
    <div class="va-skeleton__wave" v-if="animation === 'wave'" />
  </component>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, PropType, onBeforeUnmount } from 'vue'
import { useBem, useColors, useTranslation } from '../../composables'

export default defineComponent({
  name: 'VaSkeleton',

  props: {
    color: { type: String, default: 'backgroundElement' },
    delay: { type: Number, default: 100 },

    tag: { type: String, default: 'div' },

    animation: { type: String as PropType<'pulse' | 'wave' | 'none'>, default: 'pulse' },

    lines: { type: Number, default: 1 },
    height: { type: [String], default: '5em' },
    width: { type: [String], default: '100%' },
    lineGap: { type: String, default: '8px' },
    lastLineWidth: { type: [String], default: '75%' },

    variant: { type: String as PropType<'text' | 'circle' | 'rounded' | 'squared'>, default: 'squared' },
    ariaLabel: { type: String, default: '$t:loading' },
  },

  setup (props, { attrs }) {
    const doShow = ref(false)

    let timeoutId: ReturnType<typeof setTimeout>
    onMounted(() => {
      setTimeout(() => {
        doShow.value = true
      }, props.delay)
    })
    onBeforeUnmount(() => {
      clearTimeout(timeoutId)
    })

    const heightComputed = computed(() => {
      if (props.variant === 'text') {
        return `${props.lines}em`
      }

      return props.height
    })
    const widthComputed = computed(() => {
      if (props.variant === 'circle') {
        return heightComputed.value
      }

      return props.width
    })

    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color))
    const negativeLineGap = computed(() => `-${props.lineGap}`)

    const bem = useBem('va-skeleton', () => ({
      lines: props.lines > 1,
      text: props.variant === 'text',
      circle: props.variant === 'circle',
      hidden: !doShow.value,
      pulse: props.animation === 'pulse',
      wave: props.animation === 'wave',
    }))

    const borderRadius = computed(() => {
      if (props.variant === 'circle') { return '50%' }
      if (props.variant === 'rounded') { return `var(--va-skeleton-border-radius, calc(${heightComputed.value} / 5))` }

      return '0px'
    })

    return {
      ...useTranslation(),
      classes: computed(() => [
        ...Object.keys(bem),
        (attrs as { class: string }).class,
      ]),

      colorComputed,
      negativeLineGap,
      doShow,
      heightComputed,
      widthComputed,
      borderRadius,
    }
  },
})
</script>

<style lang="scss">
@import 'variables.scss';

@keyframes pulse {
  0% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(1);
  }

  75% {
    filter: brightness(0.9);
  }

  100% {
    filter: brightness(1);
  }
}

@keyframes wave {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

.va-skeleton {
  $line-height: 1em;

  background: v-bind(colorComputed);
  height: v-bind(heightComputed);
  width: v-bind(widthComputed);
  border-radius: v-bind(borderRadius);
  cursor: wait;

  &--pulse {
    animation: var(--va-skeleton-animation-duration) ease-in-out 0s infinite normal none running pulse;
  }

  &--wave {
    mask-image: -webkit-radial-gradient(white, black);

    .va-skeleton__wave {
      position: absolute;
      overflow: hidden;
      left: 0;
      height: 100%;
      width: 100%;

      &::after {
        display: block;
        position: relative;
        content: '';
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: var(--va-skeleton-wave-opacity, 0.5);
        background: linear-gradient(90deg, transparent, var(--va-skeleton-wave-color), transparent);
        animation: var(--va-skeleton-animation-duration) linear 0s infinite normal none running wave;
      }
    }
  }

  &--hidden {
    // Hide visually and from screen readers
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }

  &--lines {
    background:
      repeating-linear-gradient(
        180deg,
        v-bind(colorComputed),
        v-bind(colorComputed) calc($line-height - v-bind(lineGap) / 2),
        transparent calc($line-height - v-bind(lineGap) / 2),
        transparent $line-height,
      );

    .va-skeleton__wave::after {
      mask-image:
        repeating-linear-gradient(
          180deg,
          black,
          black calc($line-height - v-bind(lineGap) / 2),
          transparent calc($line-height - v-bind(lineGap) / 2),
          transparent $line-height,
        );
    }
  }

  &--text {
    width: 100%;
    clip-path:
      polygon(
        0% 0%,
        0% 100%,
        v-bind(lastLineWidth) 100%,
        v-bind(lastLineWidth) calc(100% - $line-height),
        100% calc(100% - $line-height),
        100% 100%,
        $line-height 100%,
        v-bind(lastLineWidth) 100%,
        100% 100%,
        100% 0%
      );
  }

  &--circle {
    min-width: v-bind(widthComputed);
    min-height: v-bind(heightComputed);
  }
}
</style>
