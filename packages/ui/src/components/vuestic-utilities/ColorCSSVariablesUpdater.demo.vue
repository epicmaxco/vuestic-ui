<template>
  <VbDemo>
    <VbCard title="Update CSS Variable">
      <div class="mb-4">
        <a class="title title--danger">
          This is title danger color
        </a>
        <va-chip color="danger">This is vue component</va-chip>
      </div>

      <va-divider />
      Change danger color to:
      <va-button @click="change('#4ab2e3')" color="#4ab2e3">
        danger = blue
      </va-button>
      <va-button @click="change('#e34b4a')" color="#e34b4a">
        danger = red
      </va-button>
    </VbCard>
  </VbDemo>
</template>

<script>
import { setColors } from '../../services/color-config/color-config'

export default {
  methods: {
    change (color) {
      setColors({ danger: color })
    },
  },
}
</script>
