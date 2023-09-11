<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-select
      v-model="value"
      label="Content slot"
      :options="options"
      multiple
    >
      <template #content="{ value }">
        <va-chip class="mr-2" v-for="v in value" :key="v" size="small">
          {{ v }}
        </va-chip>
      </template>
    </va-select>
    <va-select
      v-model="value"
      label="Prepend slot"
      :options="options"
    >
      <template #prepend>
        <va-icon name="person" class="mr-2" />
      </template>
    </va-select>
    <va-select
      v-model="value"
      label="Prepend inner slot"
      :options="options"
    >
      <template #prependInner>
        <va-icon name="person" />
      </template>
    </va-select>
    <va-select
      v-model="value"
      label="Append inner slot"
      :options="options"
    >
      <template #appendInner>
        <va-icon name="person" />
      </template>
    </va-select>
    <va-select
      v-model="value"
      label="Append slot"
      :options="options"
    >
      <template #append>
        <va-icon name="person" class="ml-2" />
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
      value: ["one"],
    };
  },
};
</script>
