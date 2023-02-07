<template>
  <va-button-toggle
    class="mb-6"
    v-model="flip"
    :options="flipOptions"
    preset="secondary"
    border-color="primary"
  />

  <va-switch
    class="mb-2"
    label="Enable rotation"
    size="small"
    v-model="isRotation"
  />

  <va-slider
    class="mb-6"
    :step="5"
    :min="-180"
    :max="180"
    track-label-visible
    :disabled="!isRotation"
    :model-value="rotation || 0"
    @update:model-value="isRotation ? (rotation = $event) : () => {}"
  />

  <div>
    <va-icon class="mr-3" name="thumb_up" size="large" />
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
