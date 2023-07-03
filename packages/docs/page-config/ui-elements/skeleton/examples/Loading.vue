<template>
  <div :aria-busy="isLoading">
    <VaSkeletonGroup v-if="isLoading" animation="wave" :delay="0">
      <VaCard>
        <va-card-content class="flex items-center">
          <VaSkeleton variant="circle" width="1rem" height="48px" />
          <VaSkeleton variant="text" class="ml-2 va-text" :lines="2" />
        </va-card-content>
        <va-card-actions class="flex justify-end">
          <VaSkeleton class="mr-2" variant="rounded" inline width="82px" height="32px" />
          <VaSkeleton variant="rounded" inline width="64px" height="32px" />
        </va-card-actions>
      </VaCard>
    </VaSkeletonGroup>

    <VaCard v-else>
      <va-card-content class="flex items-center">
        <VaAvatar src="https://i.pinimg.com/280x280_RS/08/e9/ba/08e9ba9cbd24db8de0c250570af460a4.jpg" />
        <p class="ml-2 mb-0 va-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tincidunt, nisl eget aliquam tincidunt, nisl nisl aliquam
          tortor, eget aliquam nisl nisl sit amet lorem.
        </p>
      </va-card-content>

      <va-card-actions class="flex justify-end">
        <va-button color="primary">Message</va-button>
        <va-button color="secondary">Follow</va-button>
      </va-card-actions>
    </VaCard>

    <va-divider class="my-8" />

    <va-button @click="load">Load</va-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)

const load = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

onMounted(load)
</script>
