<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-input
      v-model="value"
      class="mb-6"
      label="Icon prepend"
      placeholder="Enter email"
    >
      <template #prepend>
        <va-icon
          name="mail_outline"
          class="mr-2"
          color="secondary"
        />
      </template>
    </va-input>
    <va-input
      v-model="value"
      class="mb-6"
      label="Icon prepend inner"
      placeholder="Enter email"
    >
      <template #prependInner>
        <va-icon
          name="mail_outline"
          color="secondary"
        />
      </template>
    </va-input>
    <va-input
      v-model="value"
      class="mb-6"
      label="Icon append"
      placeholder="Enter email"
    >
      <template #append>
        <va-icon
          name="mail_outline"
          class="ml-2"
          color="secondary"
        />
      </template>
    </va-input>
    <va-input
      v-model="value"
      class="mb-6"
      label="Icon append inner"
      placeholder="Enter email"
    >
      <template #appendInner>
        <va-icon
          name="mail_outline"
          color="secondary"
        />
      </template>
    </va-input>
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
