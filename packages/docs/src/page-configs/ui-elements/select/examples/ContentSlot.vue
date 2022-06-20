<template>
  <div style="max-width: 300px;">
    <va-select
      class="mb-4"
      label="String"
      :options="options"
      v-model="value"
      multiple
    >
      <template #content="{ valueString }">
        <div tabindex="0">{{ valueString }}</div>
      </template>
    </va-select>

    <va-select
      class="mb-4"
      label="Custom chips (first 3)"
      :options="options"
      v-model="value"
      multiple
    >
      <template #content="{ value }">
        <div tabindex="0">
          <va-chip
            v-for="chip in value.slice(0, 3)"
            :key="chip"
            size="small"
            class="mr-1 my-1"
          >
            {{ chip }}
          </va-chip>
        </div>
      </template>
    </va-select>

    <va-select
      class="mb-4"
      label="Removable chips"
      :options="options"
      v-model="value"
      multiple
    >
      <template #content="{ value }">
        <div tabindex="0">
          <va-chip
            v-for="chip in value"
            :key="chip"
            size="small"
            class="mr-1 my-1"
            closeable
            @update:modelValue="deleteChip(chip)"
          >
            {{ chip }}
          </va-chip>
        </div>
      </template>
    </va-select>
  </div>
</template>

<script>
export default {
  name: 'Chips',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      value: [],
    }
  },
  methods: {
    deleteChip (chip) {
      this.value = this.value.filter((v) => v !== chip)
    },
  },
}
</script>
