<script setup lang="ts">
  import { VaButtonToggle } from 'vuestic-ui';
  import { ref, watch } from 'vue';
  import { FlexState, HumanState } from './types';

  const horizontalOptions = [
    { icon: 'align_horizontal_left', value: 'left' },
    { icon: 'align_horizontal_center', value: 'center' },
    { icon: 'align_horizontal_right', value: 'right' },
  ]

  const verticalOptions = [
    { icon: 'align_vertical_top', value: 'top' },
    { icon: 'align_vertical_center', value: 'center' },
    { icon: 'align_vertical_bottom', value: 'bottom' },
  ]

  const directionOptions = [
    { icon: 'arrow_forward', value: 'horizontal' },
    { icon: 'arrow_downward', value: 'vertical' },
  ]


  const humanToFlex = (humanState: HumanState): FlexState => {
    const vars = {
      horizontal: { horizontal: 'justify-content', vertical: 'align-items' },
      vertical: { horizontal: 'align-items', vertical: 'justify-content' },
    } as const


    return {
      display: 'flex',
      'flex-direction': humanState.direction === 'horizontal' ? 'row' : 'column',
      [vars[humanState.direction].horizontal]: humanState.horizontal === 'left' ? 'flex-start' : humanState.horizontal === 'center' ? 'center' : 'flex-end',
      [vars[humanState.direction].vertical]: humanState.vertical === 'top' ? 'flex-start' : humanState.vertical === 'center' ? 'center' : 'flex-end',
    } as FlexState
  }

  const flexToHuman = (flexState: FlexState): HumanState => {
    const vars = {
      row: { justifyContent: 'horizontal', alignItems: 'vertical' },
      column: { justifyContent: 'vertical', alignItems: 'horizontal' },
    } as const

    return {
      direction: flexState['flex-direction'] === 'row' ? 'horizontal' : 'vertical',
      [vars[flexState['flex-direction']].justifyContent]: flexState['justify-content'] === 'flex-start' ? 'left' : flexState['justify-content'] === 'center' ? 'center' : 'right',
      [vars[flexState['flex-direction']].alignItems]: flexState['align-items'] === 'flex-start' ? 'top' : flexState['align-items'] === 'center' ? 'center' : 'bottom',
    } as HumanState
  }

  const props = defineProps<{ state: FlexState }>()

  const state = ref<HumanState>(flexToHuman(props.state))

  const emit = defineEmits(['update:state'])

  watch(state, () => {
    emit('update:state', humanToFlex(state.value))
  }, { deep: true })
</script>

<template>
  <div class="va-devtools-flex-editor">
    <VaButtonToggle v-model="state.horizontal" :options="horizontalOptions" preset="primary" />
    <VaButtonToggle v-model="state.vertical" :options="verticalOptions" preset="primary" />
    <VaButtonToggle v-model="state.direction" :options="directionOptions" preset="primary" />
  </div>
</template>

<style lang="scss" scoped>
  .va-devtools-flex-editor {
    display: flex;
    gap: 8px;
  }
</style>
