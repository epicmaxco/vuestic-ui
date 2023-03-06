<template>
  <div style="max-width: 300px;">
    <va-input
      v-model="value"
      class="mb-6"
      label="Name long long long long long long long long long long long long"
      placeholder="Long label"
    />
    <va-input
      id="input-ID"
      v-model="value"
      class="mb-6"
      name="input-Name"
      label="with ID and Name attrs"
      placeholder="Check <input> in devtools"
    />
    <va-input
      v-model="value"
      class="mb-6"
      label="Disabled"
      placeholder="Disabled"
      disabled
    />
    <va-input
      v-model="value"
      class="mb-6"
      label="Readonly"
      placeholder="Readonly"
      readonly
    />
    <va-input
      v-model="value"
      counter
      class="mb-6"
    />
    <va-input
      v-model="value"
      :max-length="30"
      counter
      class="mb-6"
    />
    <va-input
      v-model="value"
      :max-length="30"
      counter
      class="mb-6"
    >
      <template #counter="{ valueLength, maxLength }">
        <b
          style="margin-left: auto;"
          :style="{
            color:
              valueLength > maxLength
                ? 'var(--va-danger)'
                : 'var(--va-success)',
          }"
        >
          {{ maxLength - valueLength }}
        </b>
      </template>
    </va-input>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ExtendedDefault",
  setup() {
    const value = ref("");

    return {
      value,
    };
  },
};
</script>
