<template>
  <VbDemo>
    <VbCard title="default">
    <va-carousel>
      <va-carousel-item style="background: yellow;">
        Item 1 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </va-carousel-item>
      <va-carousel-item style="background: green;">
        Item 2 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </va-carousel-item>
      <va-carousel-item style="background: red;">
        Item 3 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </va-carousel-item>
      <va-carousel-item style="background: blue;">
        Item 4 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </va-carousel-item>
    </va-carousel>
    </VbCard>

    <VbCard title="wallpapers">
    <va-carousel loop>
      <va-carousel-item style="max-width: 1280px; height: 700px;">
      <!-- <va-carousel-item> -->
        <img src="https://images.wallpaperscraft.com/image/spruce_branches_needles_183603_1280x800.jpg" alt="">
      </va-carousel-item>
      <va-carousel-item style="max-width: 1280px; height: 700px;">
      <!-- <va-carousel-item> -->
        <!-- <img src="https://images.wallpaperscraft.com/image/tulips_flowers_flowering_183645_1366x768.jpg" alt=""> -->
        <img src="https://images.wallpaperscraft.com/image/fern_leaves_branch_183649_1280x800.jpg" alt="">
      </va-carousel-item>
      <va-carousel-item style="max-width: 1280px; height: 700px;">
      <!-- <va-carousel-item> -->
        <img src="https://images.wallpaperscraft.com/image/spruce_branches_needles_128622_1280x800.jpg" alt="">
      </va-carousel-item>
    </va-carousel>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCarousel from './VaCarousel'
import VaCarouselItem from './VaCarouselItem'

export default {
  data () {
    return {
      value: 0,
    }
  },
  components: {
    VaCarousel,
    VaCarouselItem,
  },
}
</script>
