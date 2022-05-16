<template>
  <div class="row">
    <va-counter class="mx-4 my-2"
      v-model="value"
      width="220px"
    >
      <template #content="{ value }">
        <VaChip icon="done">{{ value }} copies</VaChip>
      </template>
    </va-counter>

    <va-counter class="mx-4 my-2"
      v-model="value"
      width="220px"
    >
      <template #decreaseAction="{ decreaseCount }">
        <VaButton size="small" outline @click="decreaseCount">dec</VaButton>
      </template>
      <template #increaseAction="{ increaseCount }">
        <VaButton size="small" outline @click="increaseCount">inc</VaButton>
      </template>
    </va-counter>

    <va-counter class="mx-4 my-2"
      v-model="value"
      width="220px"
      buttons
    >
      <template #decreaseAction="{ decreaseCount }">
        <VaButton :rounded="false" @click="decreaseCount">dec</VaButton>
      </template>
      <template #increaseAction="{ increaseCount }">
        <VaButton :rounded="false" @click="increaseCount">inc</VaButton>
      </template>
    </va-counter>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 10,
    }
  },
}
</script>
