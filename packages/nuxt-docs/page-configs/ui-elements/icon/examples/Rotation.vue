<template>
  <va-button-toggle
    v-model="flip"
    :options="flipOptions"
    :rounded="false"
    outline
    class="mb-4"
  />

  <va-switch label="Enable rotation" size="small" v-model="isRotation" />

  <va-slider
    :step="5"
    :min="-180"
    :max="180"
    :disabled="!isRotation"
    class="mb-4"
    :model-value="rotation || 0"
    @update:model-value="isRotation ? (rotation = $event) : () => {}"
  >
    <template #append>
      <va-input
        v-model.number="rotation"
        readonly
        style="width: 65px; flex-shrink: 0"
      />
    </template>
  </va-slider>

  <div>
    <va-icon name="thumb_up" size="large" :rotation="0" class="mr-3" />
    <va-icon
      name="thumb_up"
      size="large"
      color="#ed6c02"
      :rotation="rotation"
      :flip="flip"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    const flipOptions = [
      { label: "off", value: "off" },
      { label: "horizontal", value: "horizontal" },
      { label: "vertical", value: "vertical" },
      { label: "both", value: "both" },
    ];

    return {
      flipOptions,
      flip: flipOptions[0].value,
      rotation: 0,
      isRotation: true,
    };
  },

  watch: {
    isRotation(value) {
      if (!value) {
        this.rotation = undefined;
      }
    },
  },
});
</script>
