<template>
  <div class="flex gap-8 flex-wrap">
    <VaCounter
      v-model="value"
      buttons
      rounded
      :flat="false"
      style="width: 220px"
    >
      <template #content="{ value }">
        <VaChip icon="done">
          {{ value }} copies
        </VaChip>
      </template>
    </VaCounter>

    <VaCounter
      v-model="value"
      buttons
      style="width: 360px"
    >
      <template #decreaseAction>
        <VaButtonGroup>
          <VaButton
            v-for="step in steps"
            :key="step"
            class="!px-0"
            @click="value -= step"
          >
            -{{ step }}
          </VaButton>
        </VaButtonGroup>
      </template>
      <template #increaseAction>
        <VaButtonGroup>
          <VaButton
            v-for="step in steps"
            :key="step"
            class="!px-0"
            @click="value += step"
          >
            +{{ step }}
          </VaButton>
        </VaButtonGroup>
      </template>
    </VaCounter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 10,
      steps: [1, 10, 100],
    };
  },
};
</script>
