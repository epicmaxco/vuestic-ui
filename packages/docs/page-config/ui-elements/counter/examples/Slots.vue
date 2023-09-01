<template>
  <div class="flex gap-8 flex-wrap">
    <va-counter
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
    </va-counter>

    <va-counter
      v-model="value"
      buttons
      style="width: 360px"
    >
      <template #decreaseAction>
        <va-button-group>
          <va-button
            v-for="step in steps"
            :key="step"
            class="!px-0"
            @click="value -= step"
          >
            -{{ step }}
          </va-button>
        </va-button-group>
      </template>
      <template #increaseAction>
        <va-button-group>
          <va-button
            v-for="step in steps"
            :key="step"
            class="!px-0"
            @click="value += step"
          >
            +{{ step }}
          </va-button>
        </va-button-group>
      </template>
    </va-counter>
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
