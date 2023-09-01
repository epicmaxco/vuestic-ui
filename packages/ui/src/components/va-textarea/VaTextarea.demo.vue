<script setup lang="ts">
import { ref } from 'vue'
import VaTextarea from './VaTextarea.vue'

const text = ref('test\n\ntest\ntest\ntest')
const autosizeValue = ref('')
const autosizeValueWithLimits = ref('')
</script>

<template>
  <VbCard title="Textarea">
    <VaTextarea v-model="text" label="Name" type="textarea" />
  </VbCard>
  <VbCard title="Style">
    <VaTextarea v-model="text" label="Name" type="textarea" preset="solid" />

    <VaTextarea v-model="text" label="Name" type="textarea" preset="bordered" />
  </VbCard>
  <VbCard title="Textarea autosize">
    <VaTextarea v-model="autosizeValue" label="Name" autosize />
  </VbCard>
  <VbCard title="Textarea autosize limits (2-4)">
    <VaTextarea v-model="autosizeValueWithLimits" label="Name" autosize :min-rows="2" :max-rows="4" />
  </VbCard>
  <VbCard title="Textarea readonly">
    <VaTextarea id="textarea-id-example" placeholder="Try to type in ..." label="Readonly" readonly />
  </VbCard>
  <VbCard title="Textarea disabled">
    <VaTextarea name="textarea-name-example" aria-label="textarea-aria-example" placeholder="Try to focus"
      label="Disabled" disabled />
  </VbCard>
  <VbCard title="Counter">
    <VaTextarea v-model="text" counter label="Name" class="mb-6" />
    <VaTextarea v-model="text" :max-length="30" counter label="Name" class="mb-6" />
    <VaTextarea v-model="text" :max-length="30" counter class="mb-6">
      <template #counter="{ valueLength, maxLength }">
        Additional message, {{ `${valueLength}/${maxLength}` }}
      </template>
    </VaTextarea>
    <VaTextarea v-model="text" :max-length="30" counter label="Name">
      <template #counter="{ valueLength, maxLength }">
        Additional message, {{ `${valueLength}/${maxLength}` }}
      </template>
    </VaTextarea>
  </VbCard>
  <VbCard title="Validation">
    <VaTextarea v-model="text" label="Name" error :error-messages="['Error message!']" autosize :max-rows="1" />
    <VaTextarea v-model="text" label="Name" error :error-messages="['Error message!']" />
    <VaTextarea v-model="text" label="Name" success :messages="['Error message!']" autosize :max-rows="1" />
    <VaTextarea v-model="text" label="Name" :messages="['Message!']" />
    <VaTextarea v-model="text" label="Name" :rules="[(v) => 'Min rows count must be 2']" />
  </VbCard>
</template>
