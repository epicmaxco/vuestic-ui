<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaSelect
      v-model="value"
      label="Content slot"
      :options="options"
      multiple
    >
      <template #content="{ value }">
        <VaChip v-for="v in value" :key="v" class="mr-2" size="small">
          {{ v }}
        </VaChip>
      </template>
    </VaSelect>
    <VaSelect
      v-model="value"
      label="Prepend slot"
      :options="options"
    >
      <template #prepend>
        <VaIcon name="person" class="mr-2" />
      </template>
    </VaSelect>
    <VaSelect
      v-model="value"
      label="Prepend inner slot"
      :options="options"
    >
      <template #prependInner>
        <VaIcon name="person" />
      </template>
    </VaSelect>
    <VaSelect
      v-model="value"
      label="Append inner slot"
      :options="options"
    >
      <template #appendInner>
        <VaIcon name="person" />
      </template>
    </VaSelect>
    <VaSelect
      v-model="value"
      label="Append slot"
      :options="options"
    >
      <template #append>
        <VaIcon name="person" class="ml-2" />
      </template>
    </VaSelect>
    <VaSelect
      v-model="value"
      label="Option slot"
      :options="options"
    >
      <template #option="{ option, index, selectOption }">
        <div class="flex justify-between items-center p-2">
          Have a nice day!
          <VaButton
            class="mb-2"
            size="small"
            @click="selectOption(option)"
          >
            {{ option }} ({{ index + 1 }})
          </VaButton>
        </div>
      </template>
    </VaSelect>
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
      value: ["one"],
    };
  },
};
</script>
