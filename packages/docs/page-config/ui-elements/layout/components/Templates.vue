<script setup lang="ts">
  import DocsPreview from './previews/Docs.vue';
  import DocsCode from './previews/DocsExample.vue?raw';
  import DocsExample from './previews/DocsExample.vue';
  import LargeSidebarPreview from './previews/LargeSidebar.vue';
  import LargeSidebarCode from './previews/LargeSidebarExample.vue?raw';
  import LargeSidebarExample from './previews/LargeSidebarExample.vue';
  import AllAreasPreview from './previews/AllAreas.vue';
  import AllAreasCode from './previews/AllAreasExample.vue?raw';
  import AllAreasExample from './previews/AllAreasExample.vue';
  import DoubleSidebar from './previews/DoubleSidebar.vue';
  import DoubleSidebarCode from './previews/DoubleSidebarExample.vue?raw';
  import DoubleSidebarExample from './previews/DoubleSidebarExample.vue';
  import CodeView from '../../../../modules/page-config/blocks/shared/code/CodeView.vue'

  import { ref, computed } from 'vue'
  import { getWindow } from '../../../../../ui/src/utils/ssr';
  import { useToast } from 'vuestic-ui';

  const activeItem = ref<any | null>(null)

  const doShowModal = computed({
    get: () => !!activeItem.value,
    set: (value) => {
      if (!value) {
        activeItem.value = null
      }
    },
  })

  const items = [
    {
      code: DocsCode,
      preview: markRaw(DocsPreview),
      example: markRaw(DocsExample),
    },
    {
      code: LargeSidebarCode,
      preview: markRaw(LargeSidebarPreview),
      example: markRaw(LargeSidebarExample),
    },
    {
      code: AllAreasCode,
      preview: markRaw(AllAreasPreview),
      example: markRaw(AllAreasExample),
    },
    {
      code: DoubleSidebarCode,
      preview: markRaw(DoubleSidebar),
      example: markRaw(DoubleSidebarExample),
    },
  ]


  const onItemClick = (index: number) => {
    if (activeItem.value === items[index]) {
      activeItem.value = null
      return
    }

    activeItem.value = items[index]
  }

  const copyButtonState = ref<'default' | 'active' | 'error'>('default')

  const { init } = useToast()

  const copyCode = async () => {
    try {
      await getWindow()?.navigator.clipboard.writeText(activeItem.value.code)
      copyButtonState.value = 'active'
      init({
        message: 'Copied to clipboard',
        color: 'success',
      })
    } catch (e: any) {
      if (e.message === 'NotAllowedError') {
        copyButtonState.value = 'error'
      }
    }

    setTimeout(() => { copyButtonState.value = 'default' }, 1500)
  }
</script>

<template>
  <div class="layout-selector flex justify-center flex-wrap relative">
    <component
      :is="item.preview"
      v-for="(item, index) in items"
      :key="item.preview.name"
      class="w-1/4 layout-selector__item"
      role="button"
      :class="{
        'layout-selector__item--active': activeItem === index,
      }"
      @click="onItemClick(index)"
    />
  </div>

  <VaModal
    v-model="doShowModal"
    fullscreen
    hide-default-actions
    style="--va-modal-padding: 0px"
    max-width="100%"
  >
    <component :is="activeItem.example">
      <div class="p-8">
        <div class="bg-[var(--va-background-element)] rounded-md">
          <div class="flex justify-end px-4 pt-4">
            <VaButton
              :loading="copyButtonState === 'active'"
              :color="copyButtonState === 'error' ? 'danger' : 'primary'"
              @click="copyCode"
              icon="fa4-files-o"
              preset="secondary"
            >
              Copy code example to clipboard
            </VaButton>
          </div>

          <CodeView
            :code="activeItem.code"
            language="html"
          />
        </div>
      </div>
    </component>
  </VaModal>
</template>

<style lang="scss">
  .layout-selector {
    position: relative;
    height: 100%;
    width: 100%;

    &__item {
      cursor: pointer;

      &:hover {
        path {
          stroke: var(--va-primary) !important;
          stroke-width: 2px;
        }
      }
    }
  }
</style>
