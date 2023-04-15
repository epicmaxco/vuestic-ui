<script setup lang="ts">
import { VaSelect } from '..'

const options = [1, 2, 3, 4, 5, 6]
</script>

<template>
  <Story title="VaSelect/Visual/Style">
    <Variant
      title="Default (solid)"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Default (solid)"
        :options="options"
      />
    </Variant>

    <Variant
      title="Outline"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Outline"
        :options="options"
        outline
      />
    </Variant>

    <Variant
      title="Bordered"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Bordered"
        :options="options"
        bordered
      />
    </Variant>

    <Variant
      title="Default (solid) (Purple color)"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Default (solid) (Purple color)"
        color="#990099"
        :options="options"
      />
    </Variant>

    <Variant
      title="Outline (Purple color)"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Outline (Purple color)"
        color="#990099"
        :options="options"
        outline
      />
    </Variant>

    <Variant
      title="Bordered (Purple color)"
      :initState="() => ({ value: null })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Bordered (Purple color)"
        color="#990099"
        :options="options"
        bordered
      />
    </Variant>
    <Variant
      title="Required Mark"
      :initState="() => ({ value: '' })"
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        class="mb-6"
        label="Required Mark"
        :options="options"
        required-mark
      />
    </Variant>
  </Story>
</template>
