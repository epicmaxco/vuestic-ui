<template>
  <VbDemo>
    <div class="row">
      <VbCard title="Slots (Loading, Error)">
        <button @click="newImage">New image</button>
        <button @click="wrongPath">Wrong path</button>
        <div class="image--large">
          <va-image :src="slotImagePath">
            <template v-slot:loader>
              <div>Loading...</div>
            </template>
            <template v-slot:error>
              <div>Error</div>
            </template>
          </va-image>
        </div>
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="Small">
        <va-image class="image--small" :src="getImagePath(600)" />
      </VbCard>
      <VbCard title="Medium">
        <va-image class="image--medium" :src="getImagePath(600)" />
      </VbCard>
      <VbCard title="Large">
        <va-image class="image--large" :src="getImagePath(600)" />
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
      slotImageSize: 1500
    }
  },
  computed: {
    slotImagePath () {
      return this.getImagePath(this.slotImageSize)
    }
  },
  methods: {
    getImagePath (w, h = w) {
      return `https://picsum.photos/${w}/${h}`
    },
    newImage () {
      this.slotImageSize = this.slotImageSize != 1500 ? 1500 : 1501
    },
    wrongPath () {
      this.slotImageSize = -1
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
  width: 350px;
  height: 250px;
}

.image--portrait {
  width: 250px;
  height: 400px;
}
</style>
