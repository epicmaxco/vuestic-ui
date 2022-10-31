<template>
  <div class="">
    <div
      class="primary-danger-gradient d-flex justify-space-around align-center"
    >
      <span class="px-2">Primary</span>
      <span class="px-2">Success</span>
      <span class="px-2">Danger</span>
    </div>

    <div class="controls d-flex align-center">
      <va-color-palette
        v-model="primaryColor"
        :palette="colorsToChange"
        class="mx-4"
      />

      <span>
        {{ currentColorText }}
        <span class="primary-color">{{ primaryColor }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useColors } from 'vuestic-ui/src/main'

export default {
  props: {
    currentColorText: { type: String, default: 'Current primary color is' },
    buttonText: { type: String, default: 'Primary color button' },
  },
  setup () {
    const { setColors, getColor, presets } = useColors()

    const colorsToChange = [
      presets.value.light.primary,
      '#ef476f',
      '#ffd166',
      '#06d6a0',
      '#118ab2',
    ]

    const primaryColor = computed({
      get () {
        return getColor('primary')
      },
      set (value) {
        setColors({ primary: value })
      },
    })

    return {
      primaryColor,
      colorsToChange,
    }
  },
}
</script>

<style lang="scss" scoped>
.primary-color {
  color: var(--va-primary);
}

.primary-danger-gradient {
  width: 100%;
  height: 4rem;
  background:
    linear-gradient(
      90deg,
      var(--va-primary) 0%,
      var(--va-success) 50%,
      var(--va-danger) 100%
    );

  span {
    background: var(--secondary);
    border-radius: 2rem;
  }
}
</style>
