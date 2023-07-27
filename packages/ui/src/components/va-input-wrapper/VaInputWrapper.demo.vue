<script lang="ts" setup>
import {
  VaInputWrapper,
  VaInput,
  VaSelect,
  VaDateInput,
  VaCounter,
  VaCheckbox,
  VaRadio,
  VaTimeInput,
  VaColorInput,
} from '../'

import { computed, reactive } from 'vue'

const playground = reactive({
  innerLabel: false,
  onDark: false,
  solid: false,
})

const preset = computed(() => (playground.solid ? 'solid' : ''))
</script>

<template>
  <VbDemo>
    <VbCard title="default">
      <VaInputWrapper />
    </VbCard>

    <VbCard title="label (outer default)">
      <VaInputWrapper label="Label" />
    </VbCard>

    <VbCard title="label (inner)">
      <VaInputWrapper label="Label" inner-label />
    </VbCard>

    <VbCard title="long label">
      <VaInputWrapper
        label="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, dolores quaerat laudantium labore culpa hic at modi iste? Modi harum ipsa autem eveniet sunt iste quia, fugiat iure dolor incidunt! "
        inner-label
      />
    </VbCard>

    <VbCard title="tall label (chinese characters)">
      <VaInputWrapper label="測試" inner-label />
    </VbCard>

    <VbCard title="bottom">
      <VaInputWrapper label="測試" inner-label :counterValue="3" />
    </VbCard>

    <VbCard title="Variants">
      <div class="flex flex-col gap-4">
        <VaInput label="Outline" preset="outline" />
        <VaInput label="Solid" preset="solid" />
        <VaInput label="Bordered" preset="bordered" />
      </div>
    </VbCard>

    <VbCard title="States">
      <div class="flex flex-col gap-2">
        <VaInputWrapper label="loading" loading />
        <VaInputWrapper label="error" error />
        <VaInputWrapper label="success" success />
        <VaInputWrapper label="success" success loading error />
      </div>
    </VbCard>

    <VbCard title="text color">
      <div class="p-4 bg-black text-white">
        <VaInputWrapper label="on black bg" inner-label>
          Content
        </VaInputWrapper>
      </div>
      <div class="p-4 bg-white text-black">
        <VaInputWrapper label="on white bg" inner-label>
          Content
        </VaInputWrapper>
      </div>
      <div class="p-4">
        <VaInputWrapper label="background" background="warning">
          Content
        </VaInputWrapper>
      </div>
    </VbCard>

    <VbCard title="Complex components">
      <div>
        Controls:
        <div>
          InnerLabel: <input v-model="playground.innerLabel" type="checkbox" />
        </div>
        <div>OnDark: <input v-model="playground.onDark" type="checkbox" /></div>
        <div>Preset: <input v-model="playground.solid" type="checkbox" /></div>
      </div>
      <div
        class="flex flex-col gap-4 pa-4"
        :class="{
          'bg-gray-700': playground.onDark,
          'text-white': playground.onDark,
        }"
      >
        <div>
          <VaInput
            label="Label"
            :inner-label="playground.innerLabel"
            :preset="preset"
            model-value="Example text"
          />
        </div>
        <div>
          <VaSelect
            label="Label"
            :inner-label="playground.innerLabel"
            :preset="preset"
            model-value="Example text"
          />
        </div>
        <div>
          <VaCounter
            label="label"
            :model-value="3"
            :inner-label="playground.innerLabel"
            :preset="preset"
          />
        </div>
        <div>
          <VaDateInput
            label="Label"
            :inner-label="playground.innerLabel"
            :model-value="new Date()"
            :preset="preset"
          />
        </div>
        <div>
          <VaCheckbox label="Label" :inner-label="playground.innerLabel" :preset="preset" />
        </div>
        <div>
          <VaRadio label="Label" :inner-label="playground.innerLabel" :preset="preset" />
        </div>
        <div>
          <VaTimeInput
            label="time input"
            :model-value="new Date()"
            :inner-label="playground.innerLabel"
            :preset="preset"
          />
        </div>
        <div>
          <VaColorInput
            label="color input"
            model-value="Example text"
            :inner-label="playground.innerLabel"
            :preset="preset"
          />
        </div>
      </div>
    </VbCard>
  </VbDemo>
</template>
