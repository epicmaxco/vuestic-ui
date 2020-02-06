<template>
  <VbDemo>
    <div class="row">
      <VbCard title="Loading slot">
        <div class="image--medium">
          <va-image src="http://picsum.photos/1500/1500">
            <template v-slot:loader>
              <div>Loading...</div>
            </template>
          </va-image>
        </div>
      </VbCard>
      <VbCard title="Error slot">
        <div class="image--medium">
          <va-image src="badurl">
            <template v-slot:error>
              <div>Error</div>
            </template>
          </va-image>
        </div>
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="Small">
        <va-image
          class="image--small"
          src="https://picsum.photos/200/200"
        />
      </VbCard>
      <VbCard title="Medium">
        <va-image
          class="image--medium"
          src="https://picsum.photos/400/400"
        />
      </VbCard>
      <VbCard title="Large">
        <va-image
          class="image--large"
          src="https://picsum.photos/600/600"
        />
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="Portrait">
        <va-image
          class="image--portrait"
          src="https://picsum.photos/250/400"
        />
      </VbCard>
      <VbCard title="Portrait cover">
        <va-image
          class="image--medium"
          src="https://picsum.photos/250/400"
        />
      </VbCard>
      <VbCard title="Portrait contain">
        <va-image
          class="image--medium"
          contain
          src="https://picsum.photos/250/400"
        />
      </VbCard>
    </div>
    <div class="row">
      <VbCard title="Landscape">
        <va-image
          class="image--landscape"
          src="https://picsum.photos/400/250"
        />
      </VbCard>
      <VbCard title="Landscape cover">
        <va-image
          class="image--medium"
          src="https://picsum.photos/400/250"
        />
      </VbCard>
      <VbCard title="Landscape contain">
        <va-image
          class="image--medium"
          contain
          src="https://picsum.photos/400/250"
        />
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
