<script setup lang="ts">
import { computed, PropType } from 'vue';
import type { PlaygroundOption } from '@/composables/useComponentPlayground'

const props = defineProps({
  options: {
    type: Array as PropType<PlaygroundOption[]>,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  slots: {
    type: Array as PropType<{ name: string, value: string}[]>,
    required: true,
  }
})

const optionValues = computed(() => {
  const values = {} as Record<string, any>
  props.options.forEach(({ key, value }) => {
    if (!value) { return }
    values[key] = value
  })
  return values
})
</script>

<template>
  <div class="component-playground">
    <div class="component-playground__example">
      <slot v-bind="{ bind: optionValues, slots }" />
    </div>
    <va-card class="component-playground__options" square>
      <va-card-content>
        <div class="mb-2" v-for="option in options">
          <va-input v-if="option.type === 'input'" v-model="option.value" :label="option.key" />
          <va-select v-if="option.type === 'select'" v-model="option.value" :options="option.options"
            :label="option.key" clearable />
          <va-checkbox v-if="option.type === 'checkbox'" v-model="option.value" :label="option.key"
            :true-value="true" :false-value="false" />
        </div>
      </va-card-content>
    </va-card>
  </div>
  <div class="component-playground">
    <div class="component-playground__code">
      <CodeView :code="code" language="html" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-playground {
  background: var(--va-background-element);
  padding: 1rem;
  display: flex;

  --va-card-box-shadow: none;

  &+& {
    padding-top: 0;
  }

  &__example {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--va-background-primary)
  }

  &__code {
    width: 100%;
    border: 1px solid var(--va-background-primary)
  }
}
</style>
