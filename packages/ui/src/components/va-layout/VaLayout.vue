<template>
  <div class="va-layout">
    <template v-for="area in areaNames" :key="area">
      <VaLayoutArea
        v-if="$slots[area]"
        :area="area"
        :config="$props[area] || {}"
        @overlay-click="$emit(`${area}-overlay-click` as any)"
      >
        <slot :name="area" />
      </VaLayoutArea>
    </template>

    <div class="va-layout__area va-layout__area--content">
      <slot>
        <slot name="content" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, useSlots, watchEffect } from 'vue'
import {
  useGridTemplateArea,
  AreaName,
} from './hooks/useGridTemplateArea'
import { useLayoutProps, useLayout } from './hooks/useLayout'
import { useDocument } from '../../composables'
import VaLayoutArea from './components/VaLayoutArea.vue'

const areaNames: AreaName[] = [
  'top',
  'left',
  'right',
  'bottom',
]
</script>

<script lang="ts" setup>
defineOptions({
  name: 'VaLayout',
})

const props = defineProps({
  ...useLayoutProps,
  allowBodyScrollOnOverlay: { type: Boolean, default: false },
})

const emit = defineEmits([
  'top-overlay-click',
  'left-overlay-click',
  'right-overlay-click',
  'bottom-overlay-click',
])

const { paddings } = useLayout(props)

const doDisableScroll = computed(() => {
  return !props.allowBodyScrollOnOverlay && areaNames.some((area) => props[area]?.overlay)
})

const document = useDocument()

watchEffect(() => {
  const overflowParent = document.value?.body

  if (!overflowParent) { return }

  if (doDisableScroll.value) {
    overflowParent.style.overflow = 'hidden'
  } else {
    overflowParent.style.overflow = ''
  }
})

const slots = useSlots()

const templateArea = useGridTemplateArea(props, slots)

const verticalTemplate = computed(() => {
  return [
    slots.top ? 'min-content' : '0fr',
    '1fr',
    slots.bottom ? 'min-content' : '1fr',
  ]
    .filter(Boolean)
    .join(' ')
})

const horizontalTemplate = computed(() => {
  return [
    slots.left ? 'min-content' : '0fr',
    '1fr',
    slots.right ? 'min-content' : '1fr',
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<style lang="scss">
@import '../../styles/resources';
@import "variables";

.va-layout {
  display: grid;
  grid-template-columns: v-bind(horizontalTemplate);
  grid-template-rows: v-bind(verticalTemplate);
  grid-template-areas: v-bind(templateArea);
  gap: 0;
  position: relative;
  z-index: 0;
  max-width: 100%;
  max-height: 100%;

  // Force more importance, because VaLayoutArea component can be loaded after VaLayout
  & &__area {
    @include va-scroll();

    &--content {
      grid-area: content;
      z-index: 0;
      // Make it possible for content to be smaller than the layout
      min-width: 0;
      min-height: 0;

      // When scroll anchor is present in content, there might be overflow, so we add scroll margins
      [id] {
        scroll-margin-top: calc(v-bind("paddings.top + 'px'") + var(--va-layout-scroll-padding));
        scroll-margin-bottom: calc(v-bind("paddings.bottom + 'px'") + var(--va-layout-scroll-padding));
        scroll-margin-left: calc(v-bind("paddings.left + 'px'") + var(--va-layout-scroll-padding));
        scroll-margin-right: calc(v-bind("paddings.right + 'px'") + var(--va-layout-scroll-padding));
      }
    }
  }
}
</style>
