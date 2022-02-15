<template>
  <div class="row">
    <va-counter class="mx-4 my-2"
      v-model="value"
      width="200px"
    >
      <template #content="{ value }">
        <VaChip icon="done">{{ value }} times</VaChip>
      </template>
    </va-counter>

    <va-counter class="mx-4 my-2"
      v-model="value"
      width="250px"
    >
      <template #decreaseAction="{ decrease }">
        <VaButton size="small" :rounded="false" @click="decrease">decrease</VaButton>
      </template>
      <template #increaseAction="{ increase }">
        <VaButton size="small" outline @click="increase">increase</VaButton>
      </template>
    </va-counter>

    <va-counter class="mx-4 my-2"
      v-model="value"
      width="270px"
      buttons
    >
      <template #decreaseAction="{ decrease }">
        <VaButton :rounded="false" @click="decrease">decrease</VaButton>
      </template>
      <template #increaseAction="{ increase }">
        <VaButton outline @click="increase">increase</VaButton>
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
