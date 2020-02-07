<template>
  <VbDemo>
    <div class="row">
      <VbCard title="Slots (Loading, Error)">
        <button @click="newImage">New image</button>
        <button @click="wrongPath">Wrong path</button>
        <va-image :src="slotImagePath" class="image--large">
          <template v-slot:loader>
            <div class="loading">Loading...</div>
          </template>
          <template v-slot:error>
            <div class="error">Error</div>
          </template>
        </va-image>
      </VbCard>
      <VbCard title="Slots (Loading, Error)">
        <input v-model="slotOverlayValue" />
        <button @click="changeOverlayPosition('top')">Top</button>
        <button @click="changeOverlayPosition('bottom')">Bottom</button>
        <va-image :src="getImagePath(600)" class="image--large">
          <div class="overlay" :class="slotOverlayClasses">{{ slotOverlayValue }}</div>
        </va-image>
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="Small">
        <va-image :src="getImagePath(600)" class="image--small" />
      </VbCard>
      <VbCard title="Medium">
        <va-image :src="getImagePath(600)" class="image--medium" />
      </VbCard>
      <VbCard title="Large">
        <va-image :src="getImagePath(600)" class="image--large" />
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="4/3">
        <div class="image--medium">
          <va-image :ratio="4/3" :src="getImagePath(400)" />
        </div>
      </VbCard>
      <VbCard title="1/1">
        <div class="image--medium">
          <va-image :ratio="1" :src="getImagePath(400)" />
        </div>
      </VbCard>
      <VbCard title="16/9">
        <div class="image--medium">
          <va-image :ratio="16/9" :src="getImagePath(400)" />
        </div>
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="Portrait">
        <va-image class="image--portrait" :src="getImagePath(250, 400)" />
      </VbCard>
      <VbCard title="Portrait cover">
        <va-image class="image--medium" :src="getImagePath(250, 400)" />
      </VbCard>
      <VbCard title="Portrait contain">
        <va-image class="image--medium" contain :src="getImagePath(250, 400)" />
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="Landscape">
        <va-image class="image--landscape" :src="getImagePath(400, 250)" />
      </VbCard>
      <VbCard title="Landscape cover">
        <va-image class="image--medium" :src="getImagePath(400, 250)" />
      </VbCard>
      <VbCard title="Landscape contain">
        <va-image class="image--medium" contain :src="getImagePath(400, 250)" />
      </VbCard>
    </div>
  </VbDemo>
</template>

<script>
import VaImage from './VaImage'

export default {
  components: {
    VaImage,
  },
  data () {
    return {
      slotImageSize: 1500,
      slotOverlayValue: 'Overlay',
      slotOverlayPosition: 'top',
    }
  },
  computed: {
    slotImagePath () {
      return this.getImagePath(this.slotImageSize)
    },
    slotOverlayClasses () {
      return {
        'overlay--top': this.slotOverlayPosition === 'top',
        'overlay--bottom': this.slotOverlayPosition === 'bottom',
      }
    }
  },
  methods: {
    getImagePath (width, height = width) {
      return `https://picsum.photos/${width}/${height}`
    },
    newImage () {
      this.slotImageSize = this.slotImageSize != 1500 ? 1500 : 1501
    },
    wrongPath () {
      this.slotImageSize = -1
    },
    changeOverlayPosition (position) {
      this.slotOverlayPosition = position
    },
  }
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

.image--small {
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
