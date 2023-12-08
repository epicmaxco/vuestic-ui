<template>
  <div class="colors-editor">
    <div
      v-for="color in colors"
      :key="color.name"
      class="r"
    >
      <span class="name">{{ color.name }}:</span>

      <VaColorPalette
        v-model="color.value"
        :palette="colorsPalette"
      />
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch } from "vue";

export default {
  props: {
    modelValue: { type: Array },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const { modelValue } = toRefs(props);

    const colors = ref([...modelValue.value]);

    watch(
      colors,
      () => {
        ctx.emit("update:modelValue", colors.value);
      },
      { deep: true }
    );

    const colorsPalette = colors.value.map((c) => c.value);

    return {
      colors,
      colorsPalette,
    };
  },
};
</script>

<style>
.r {
  display: flex;
  align-items: center;
}

.name {
  padding-right: 0.5rem;
  width: 33%;
}
</style>
