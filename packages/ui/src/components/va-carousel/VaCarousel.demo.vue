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
          <a :href="'https://www.google.com/search?q=' + item" target="_blank">
            Open image in new tab 😏
          </a>
        </template>

        <template #prev-arrow>
          Go back!
        </template>

        <template #prev-next>
          Go forward!
        </template>

        <template #indicator="{ index }">
          Go to ({{ index }})
        </template>
      </VaCarousel>
    </VbCard>

    <VbCard title="Autoscroll">
      Without infinite
      <VaCarousel :items="items" stateful indicators autoscroll />

      With infinite
      <VaCarousel :items="items" stateful indicators autoscroll infinite />
    </VbCard>

    <VbCard title="Infinite">
      <VaCarousel :items="items" stateful indicators infinite />

      <VaCarousel :items="items" stateful indicators vertical infinite />
    </VbCard>

    <VbCard title="Fade">
      <VaCarousel :items="items" stateful indicators infinite effect="fade" />
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
      items: [
        'https://picsum.photos/1500',
        'https://picsum.photos/1501',
        'https://picsum.photos/1502',
        'https://picsum.photos/1503',
        'https://picsum.photos/1504',
      ],
    }
  },
}
</script>

<style>
  .va-carousel {
    min-width: 300px;
  }
</style>
