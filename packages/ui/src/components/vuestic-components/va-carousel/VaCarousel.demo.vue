<template>
  <VbDemo>
    <VbCard title="default">
      <va-carousel navigation>
        <va-carousel-item
          v-for="(item, index) in items"
          :key="index"
          :style="{background: item.color }"
        >
          <div>
            {{$vb.lorem(100)}}
          </div>
        </va-carousel-item>
      </va-carousel>
    </VbCard>

    <VbCard title="loop">
      <va-carousel loop navigation pagination>
        <va-carousel-item
          v-for="(item, index) in items"
          :key="index"
          :style="{background: item.color }"
        >
          <div>
            {{$vb.lorem(100)}}
          </div>
        </va-carousel-item>
      </va-carousel>
    </VbCard>

    <VbCard title="autoplay & loop">
      <va-carousel loop autoplay>
        <va-carousel-item
          v-for="(item, index) in items"
          :key="index"
          :style="{background: item.color }"
        >
          <div>
            {{$vb.lorem(100)}}
          </div>
        </va-carousel-item>
      </va-carousel>
    </VbCard>

    <VbCard title="draggable">
      <va-carousel draggable>
        <va-carousel-item
          v-for="(item, index) in items"
          :key="index"
          :style="{background: item.color }"
        >
          <div>
            {{$vb.lorem(100)}}
          </div>
        </va-carousel-item>
      </va-carousel>
    </VbCard>

    <VbCard title="Gallery mode">
    <va-carousel
      pagination
      pagination-position="right"
      :width="1280"
      :height="800"
    >
      <template slot="content">
        <div class="demo-content-wrapper">
          <h1 style="font-size: 5rem;">Vuestic</h1>
          <h2 style="font-size: 2rem;">UI framework for vuestic-admin</h2>
        </div>
      </template>
      <va-carousel-item>
        <img src="https://images.wallpaperscraft.com/image/spruce_branches_needles_183603_1280x800.jpg" alt="">
      </va-carousel-item>
      <va-carousel-item>
        <img src="https://images.wallpaperscraft.com/image/fern_leaves_branch_183649_1280x800.jpg" alt="">
      </va-carousel-item>
      <va-carousel-item>
        <img src="https://images.wallpaperscraft.com/image/spruce_branches_needles_128622_1280x800.jpg" alt="">
      </va-carousel-item>
    </va-carousel>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VaCarousel from './VaCarousel.vue'
import VaCarouselItem from './VaCarouselItem.vue'

@Component({
  components: { VaCarousel, VaCarouselItem },
})
export default class VaCarouselDemo extends Vue {
  items = [
    { color: 'red' },
    { color: 'orange' },
    { color: 'yellow' },
    { color: 'green' },
    { color: 'skyblue' },
    { color: 'blue' },
    { color: 'purple' },
  ]
}
</script>

<style lang="scss" scoped>
.demo-content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #ffffff;
}
</style>
