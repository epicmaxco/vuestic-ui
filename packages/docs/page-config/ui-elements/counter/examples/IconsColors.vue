<template>
  <div class="flex gap-8 flex-wrap">
    <va-counter
      v-model="value"
      increase-icon="add_circle_outline"
      decrease-icon="remove_circle_outline"
      color="#6938D1"
    />

    <va-counter
      v-model="value"
      outline
      increase-icon="arrow_upward"
      decrease-icon="arrow_downward"
      color="#0FB58D"
    />

    <va-counter
      v-model="value"
      outline
      preset="secondary"
      margins="0"
      color="#262824"
      buttons
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 10,
    };
  },
};
</script>
