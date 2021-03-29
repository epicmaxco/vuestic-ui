<template>
  <VbDemo>
    <div class="row">
      <VbCard title="default">
        <va-image
          style="width: 200px; height: 200px;"
          :src="getImagePath(200)"
        />
      </VbCard>
      <VbCard title="Slots (loading, error)">
        <button @click="newImage()">
          New image
        </button>
        <button @click="wrongPath()">
          Wrong path
        </button>
        <va-image
          :src="slotImagePath"
          class="image"
          @loaded="$vb.log('loaded', $event)"
          @error="$vb.log('error', $event)"
        >
          <template #loader>
            Loading...
          </template>
          <template #error>
            Error
          </template>
        </va-image>
      </VbCard>
      <VbCard title="Default slot usage examples">
        <va-image
          :src="getImagePath(200)"
          class="image"
        >
          <div class="overlay overlay--top">
            Overlay Top
          </div>
        </va-image>
        <va-image
          :src="getImagePath(200)"
          class="image"
        >
          <div class="overlay overlay--bottom">
            Overlay Bottom
          </div>
        </va-image>
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="4/3">
        <div class="image">
          <va-image
            :ratio="4/3"
            :src="getImagePath(200)"
          />
        </div>
      </VbCard>
      <VbCard title="1/1">
        <div class="image">
          <va-image
            :ratio="1"
            :src="getImagePath(200)"
          />
        </div>
      </VbCard>
      <VbCard title="16/9">
        <div class="image">
          <va-image
            :ratio="16/9"
            :src="getImagePath(200)"
          />
        </div>
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="Portrait">
        <va-image
          style="width: 100px; height: 200px;"
          class="image--portrait"
          :src="getImagePath(100, 200)"
        />
      </VbCard>
      <VbCard title="Portrait cover">
        <va-image
          class="image"
          :src="getImagePath(100, 200)"
        />
      </VbCard>
      <VbCard title="Portrait contain">
        <va-image
          class="image"
          contain
          :src="getImagePath(100, 200)"
        />
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="Landscape">
        <va-image
          style="width: 200px; height: 100px;"
          :src="getImagePath(200, 100)"
        />
      </VbCard>
      <VbCard title="Landscape cover">
        <va-image
          class="image"
          :src="getImagePath(200, 100)"
        />
      </VbCard>
      <VbCard title="Landscape contain">
        <va-image
          class="image"
          contain
          :src="getImagePath(200, 100)"
        />
      </VbCard>
    </div>
  </VbDemo>
</template>

<script>
import VaImage from './index'

export default {
  components: {
    VaImage,
  },
  data () {
    return {
      slotImageSize: 1500,
      slotOverlayPosition: 'top',
    }
  },
  computed: {
    slotImagePath () {
      return this.getImagePath(this.slotImageSize)
    },
  },
  methods: {
    getImagePath (width, height = width) {
      return `https://picsum.photos/${width}/${height}`
    },
    newImage () {
      this.slotImageSize = this.slotImageSize !== 1500 ? 1500 : 1501
    },
    wrongPath () {
      this.slotImageSize = -1
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex: 1 0 100%;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.row + .row {
  margin-top: 20px;
}

.image {
  width: 200px;
  height: 200px;
}

.image--medium {
  width: 400px;
  height: 400px;
}

.image--large {
  width: 600px;
  height: 600px;
}

.image--landscape {
  width: 400px;
  height: 250px;
}

.image--portrait {
  width: 250px;
  height: 400px;
}

.loading,
.error {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  padding: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.2);

  &--top {
    top: 0;
  }

  &--bottom {
    bottom: 0;
  }
}
</style>
