<template>
  <div style="max-width: 300px;">
    <va-select
      class="mb-4"
      label="Content slot"
      :options="options"
      v-model="value"
      multiple
    >
      <template #content="{ valueString }">
        {{ valueString }}
      </template>
    </va-select>
    <va-select
      class="mb-4"
      label="Prepend slot"
      :options="options"
      v-model="value"
    >
      <template #prepend>
        <va-icon
          name="share"
        />
      </template>
    </va-select>
    <va-select
      class="mb-4"
      label="Prepend inner slot"
      :options="options"
      v-model="value"
    >
      <template #prependInner>
        <va-icon
          name="share"
        />
      </template>
    </va-select>
    <va-select
      class="mb-4"
      label="Append inner slot"
      :options="options"
      v-model="value"
    >
      <template #appendInner>
        <va-icon
          name="share"
        />
      </template>
    </va-select>
    <va-select
      class="mb-4"
      label="Append slot"
      :options="options"
      v-model="value"
    >
      <template #append>
        <va-icon
          name="share"
        />
      </template>
    </va-select>
    <va-select
      label="Option slot"
      :options="options"
      v-model="value"
    >
      <template v-slot:option="{ option, index, selectOption }">
        <div class="d-flex justify-space-between align-center pa-2">
          Have a nice day!
          <va-button
            class="mb-2"
            size="small"
            @click="selectOption(option)"
          >
            {{ option }} ({{ index + 1 }})
          </va-button>
        </div>
      </template>
    </va-select>
  </div>
</template>

<script>
export default {
  name: 'Slots',
  data () {
    return {
      options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
      value: '',
    }
  },
}
</script>
