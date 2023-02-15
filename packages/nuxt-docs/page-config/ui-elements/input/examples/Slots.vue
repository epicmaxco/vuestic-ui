<template>
  <div style="max-width: 300px">
    <va-input
      v-model="value"
      class="mb-6"
      label="Icon prepend"
    >
      <template #prepend>
        <va-icon name="share" />
      </template>
    </va-input>
    <va-input
      v-model="value"
      class="mb-6"
      label="Icon prepend inner"
    >
      <template #prependInner>
        <va-icon name="share" />
      </template>
    </va-input>
    <va-input
      v-model="value"
      class="mb-6"
      label="Icon append"
    >
      <template #append>
        <va-icon name="share" />
      </template>
    </va-input>
    <va-input
      v-model="value"
      class="mb-6"
      label="Icon append inner"
    >
      <template #appendInner>
        <va-icon name="share" />
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
