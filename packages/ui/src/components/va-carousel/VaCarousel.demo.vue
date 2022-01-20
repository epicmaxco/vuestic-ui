<template>
  <VbDemo>
    <VbCard title="Title">
      <VaCarousel :items="items" v-model="currentSlide" />
    </VbCard>

    <VbCard title="Arrows">
      <VaCarousel :items="items" v-model="currentSlide" arrows />
    </VbCard>

    <VbCard title="Indicators">
      <VaCarousel :items="items" v-model="currentSlide" indicators />

      // Change on hover
      <VaCarousel :items="items" v-model="currentSlide" indicators indicatorTrigger="hover" />
    </VbCard>

    <VbCard title="Vertical">
      <VaCarousel :items="items" v-model="currentSlide" indicators vertical />
    </VbCard>

    <VbCard title="Slots">
      <VaCarousel :items="items" v-model="currentSlide" arrows indicators>
        <template #default="{ item }">
          <a :href="'https://www.google.com/search?q=' + item">
            Google search {{ item }}
          </a>
        </template>

        <template #prev-arrow>
          Go back!
        </template>

        <template #prev-next>
          Go forward!
        </template>

        <template #indicator="{ item, index }">
          Go to {{ item }} ({{ index }})
        </template>
      </VaCarousel>
    </VbCard>

    <VbCard title="Autoscroll">
      Without loop
      <VaCarousel :items="items" stateful indicators autoscroll />

      With loop
      <VaCarousel :items="items" stateful indicators autoscroll loop />
    </VbCard>

    <VbCard title="Infinite">
      <VaCarousel :items="items" stateful indicators infinite />

      <VaCarousel :items="items" stateful indicators vertical infinite />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCarousel from './VaCarousel'

export default {
  components: {
    VaCarousel,
  },

  data () {
    return {
      currentSlide: 0,
      items: ['apple', 'orange', 'banana', 'mango', 'avocado'],
    }
  },
}
</script>

<style>
.va-carousel {
  min-width: 300px;
}
</style>
