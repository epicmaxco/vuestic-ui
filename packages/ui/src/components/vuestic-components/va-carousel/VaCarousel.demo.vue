<template>
  <VbDemo>
    <VbCard title="default">
      <va-carousel navigation pagination>
        <va-carousel-item
          v-for="(item, index) in items"
          :key="index"
          :style="{background: item.color }"
        >
          <div class="demo-item">
            {{ item.text }}
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
          <div class="demo-item">
            {{ item.text }}
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
          <div class="demo-item">
            {{ item.text }}
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
          <div class="demo-item">
            {{ item.text }}
          </div>
        </va-carousel-item>
      </va-carousel>
    </VbCard>

    <VbCard title="wallpapers">
    <va-carousel navigation pagination>
      <template slot="content">Vuestic

        <div class="demo-content-wrapper">
          <h1 style="font-size: 5rem;">Vuestic</h1>
          <h2 style="font-size: 2rem;">UI framework for vuestic-admin</h2>
        </div>
      </template>
      <va-carousel-item class="demo-wallpaper">
        <img src="https://images.wallpaperscraft.com/image/spruce_branches_needles_183603_1280x800.jpg" alt="">
      </va-carousel-item>
      <va-carousel-item class="demo-wallpaper">
        <img src="https://images.wallpaperscraft.com/image/fern_leaves_branch_183649_1280x800.jpg" alt="">
      </va-carousel-item>
      <va-carousel-item class="demo-wallpaper">
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
      items: [
        { color: 'red', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, architecto.' },
        { color: 'orange', text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, porro.' },
        { color: 'yellow', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, dicta?' },
        { color: 'green', text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, maiores?' },
        { color: 'skyblue', text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, maiores?' },
        { color: 'blue', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, numquam!' },
        { color: 'purple', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, consequuntur?' },
      ],
    }
  },
  components: {
    VaCarousel,
    VaCarouselItem,
  },
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

.demo-wallpaper {
  max-width: 1280px;
  height: 700px;
}

.demo-item {
  min-width: 300px;
  height: 100px;
}
</style>
