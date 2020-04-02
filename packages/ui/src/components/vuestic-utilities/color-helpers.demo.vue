<template>
  <VbDemo>
    <VbCard title="Background utilities">
      <p class="background--danger">
        .background--danger
      </p>
    </VbCard>
    <VbCard title="Text color utilities">
      <p class="text--danger">
        .text--danger
      </p>
    </VbCard>
    <VbCard title="Reactivity">
      <button @click="change('blue')">
        danger=blue
      </button>
      <button @click="change('red')">
        danger=red
      </button>
    </VbCard>
  </VbDemo>
</template>

<script>
import './color-helpers-plugin'
export default {
  methods: {
    change (color) {
      this.$themes.danger = color
    },
  },
}
</script>
