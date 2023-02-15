<template>
  <div class="flex justify-between">
    <p
      class="inline-flex items-center py-2 px-4"
      :style="{ background: 'var(--va-background-element)'}"
    >
      Color preset
      <va-button-toggle
        v-model="theme"
        :options="themeOptions"
        class="ml-2"
      />
    </p>

    <p
      class="inline-flex items-center py-2 px-4"
      :style="{ background: 'var(--va-background-element)'}"
    >
      Primary color
      <va-color-palette
        v-model="primaryColor"
        class="ml-2"
        :palette="primaryColorVariants"
      />
    </p>
  </div>
</template>

<script>
import { ref, watchEffect, toRef } from "vue";
import { useColors } from "vuestic-ui/src/main";

export default {
  setup() {
    const { presets, applyPreset, colors } = useColors();

    const theme = ref(
      localStorage.getItem("vuestic-docs-theme")?.toLowerCase() || "light"
    );

    watchEffect(() => {
      applyPreset(theme.value);
    });

    const primaryColorVariants = [
      "#2c82e0",
      "#ef476f",
      "#ffd166",
      "#06d6a0",
      "#8338ec",
    ];

    const primaryColor = toRef(colors, "primary");

    return {
      theme,
      themeOptions: Object.keys(presets.value).map((themeName) => ({
        value: themeName,
        label: themeName,
      })),

      primaryColor,
      primaryColorVariants,
    };
  },
};
</script>
