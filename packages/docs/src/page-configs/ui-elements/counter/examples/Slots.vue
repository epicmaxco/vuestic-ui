<template>
  <div class="row">
    <va-counter class="mx-4 my-2"
      v-model="value"
      width="200px"
    >
      <template #content="{ value }">
        <VaChip icon="done">{{ value }} copies</VaChip>
      </template>
    </va-counter>

    <va-counter class="mx-4 my-2"
      v-model="value"
      width="250px"
    >
      <template #decreaseAction="{ decreaseCount }">
        <VaButton size="small" outline @click="decreaseCount">decrease</VaButton>
      </template>
      <template #increaseAction="{ increaseCount }">
        <VaButton size="small" outline @click="increaseCount">increase</VaButton>
      </template>
    </va-counter>

    <va-counter class="mx-4 my-2"
      v-model="value"
      width="270px"
      buttons
    >
      <template #decreaseAction="{ decreaseCount }">
        <VaButton :rounded="false" @click="decreaseCount">decrease</VaButton>
      </template>
      <template #increaseAction="{ increaseCount }">
        <VaButton :rounded="false" @click="increaseCount">increase</VaButton>
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
