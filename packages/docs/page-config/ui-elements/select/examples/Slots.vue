<template>
  <div style="max-width: 300px">
    <va-select
      v-model="value"
      class="mb-6"
      label="Content slot"
      :options="options"
      multiple
    >
      <template #content="{ valueString }">
        {{ valueString }}
      </template>
    </va-select>
    <va-select
      v-model="value"
      class="mb-6"
      label="Prepend slot"
      :options="options"
    >
      <template #prepend>
        <va-icon name="share" />
      </template>
    </va-select>
    <va-select
      v-model="value"
      class="mb-6"
      label="Prepend inner slot"
      :options="options"
    >
      <template #prependInner>
        <va-icon name="share" />
      </template>
    </va-select>
    <va-select
      v-model="value"
      class="mb-6"
      label="Append inner slot"
      :options="options"
    >
      <template #appendInner>
        <va-icon name="share" />
      </template>
    </va-select>
    <va-select
      v-model="value"
      class="mb-6"
      label="Append slot"
      :options="options"
    >
      <template #append>
        <va-icon name="share" />
      </template>
    </va-select>
    <va-select
      v-model="value"
      label="Option slot"
      :options="options"
    >
      <template #option="{ option, index, selectOption }">
        <div class="flex justify-between items-center p-2">
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
  name: "Slots",
  data() {
    return {
      options: [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ],
      value: "",
    };
  },
};
</script>
