<script setup lang="ts">
import { ref } from 'vue'
import VaTextarea from './VaTextarea.vue'

const text = ref('test\n\ntest\ntest\ntest')
const autosizeValue = ref('')
const autosizeValueWithLimits = ref('')
</script>

<template>
  <VbCard title="Textarea">
      <VaTextarea
        v-model="text"
        label="Name"
        type="textarea"
      />
    </VbCard>
    <VbCard title="Style">
      <VaTextarea
        v-model="text"
        label="Name"
        type="textarea"
        preset="solid"
      />

      <VaTextarea
        v-model="text"
        label="Name"
        type="textarea"
        preset="bordered"
      />
    </VbCard>
    <VbCard title="Textarea autosize">
      <VaTextarea
        v-model="autosizeValue"
        label="Name"
        type="textarea"
        autosize
      />
    </VbCard>
    <VbCard title="Textarea autosize limits (2-4)">
      <VaTextarea
        v-model="autosizeValueWithLimits"
        label="Name"
        type="textarea"
        autosize
        :min-rows="2"
        :max-rows="4"
      />
    </VbCard>
    <VbCard title="Textarea readonly">
      <VaTextarea
        id="textarea-id-example"
        placeholder="Try to type in ..."
        label="Readonly"
        type="textarea"
        readonly
      />
    </VbCard>
    <VbCard title="Textarea disabled">
      <VaTextarea
        name="textarea-name-example"
        aria-label="textarea-aria-example"
        placeholder="Try to focus"
        label="Disabled"
        type="textarea"
        disabled
      />
    </VbCard>
</template>
