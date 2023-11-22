<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaInput
      v-model="value"
      class="mb-6"
      label="Icon prepend"
      placeholder="Enter email"
    >
      <template #prepend>
        <VaIcon
          name="mail_outline"
          class="mr-2"
          color="secondary"
        />
      </template>
    </VaInput>
    <VaInput
      v-model="value"
      class="mb-6"
      label="Icon prepend inner"
      placeholder="Enter email"
    >
      <template #prependInner>
        <VaIcon
          name="mail_outline"
          color="secondary"
        />
      </template>
    </VaInput>
    <VaInput
      v-model="value"
      class="mb-6"
      label="Icon append"
      placeholder="Enter email"
    >
      <template #append>
        <VaIcon
          name="mail_outline"
          class="ml-2"
          color="secondary"
        />
      </template>
    </VaInput>
    <VaInput
      v-model="value"
      class="mb-6"
      label="Icon append inner"
      placeholder="Enter email"
    >
      <template #appendInner>
        <VaIcon
          name="mail_outline"
          color="secondary"
        />
      </template>
    </VaInput>
  </div>
</template>

<script>
export default {
  name: "Slots",
  data() {
    return {
      value: "",
    };
  },
};
</script>
