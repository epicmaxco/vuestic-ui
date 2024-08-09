<script setup lang="ts">
import { computed } from 'vue'
import { VaButton } from 'vuestic-ui'
import { useComponent } from '../../composables/useComponent';
import FlexEditor from './FlexEditor.vue';
import { FlexState } from './types';

const { options } = useComponent()

const onFlexEditorUpdate = (state: Record<string, string>) => {
  const newStyle = {
    ...options.style.value,
    ...state,
  }

  options.style.value = newStyle
}

const isFlexContainer = computed(() => {
  return options.style.value.display === 'flex'
})

const makeFlexContainer = () => {
  options.style.value = {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
  }
}

const flexStyles = computed(() => {
  return {
    display: options.style.value.display,
    'flex-direction': options.style.value['flex-direction'],
    'justify-content': options.style.value['justify-content'],
    'align-items': options.style.value['align-items'],
  } as FlexState
})
</script>

<template>
  <div v-if="!isFlexContainer" class="va-devtools-layout-editor--no-flex-container">
    <p>Layout settings are only available for flex containers for now.</p>
    <VaButton preset="secondary" @click="makeFlexContainer">Make flex container</VaButton>
  </div>
  <div v-else>
    <FlexEditor :state="flexStyles" @update:state="onFlexEditorUpdate" />
  </div>
</template>

<style lang="scss" scoped>
  .va-devtools-layout-editor {
    &--no-flex-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
</style>
