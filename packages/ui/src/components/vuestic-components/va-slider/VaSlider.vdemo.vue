<template>
  <VbDemo>
    <VbCard
      width="500px"
      title="default"
    >
      <va-slider v-model="value" />
    </VbCard>
    <VbCard
      width="500px"
      title="Sliders without track"
    >
      <va-slider
        range
        track-label-visible
        :show-track="false"
        v-model="value2"
      />
      <va-slider
        :show-track="false"
        v-model="value"
      />
    </VbCard>

    <VbCard
      width="500px"
      height="350px"
      title="Vertical sliders"
    >
      <div style="display: flex; flex-direction: row; height: 300px;">
        <div style="display: flex; width: 50%; justify-content: center;">
          <va-slider
            vertical
            v-model="value"
          />
        </div>
        <div style="display: flex; width: 50%; justify-content: center;">
          <va-slider
            range
            vertical
            track-label-visible
            pins
            :step="10"
            icon-prepend="volume_off"
            icon-append="volume_up"
            v-model="value2"
          />
        </div>
      </div>
    </VbCard>
    <VbCard
      width="500px"
      title="value visible"
    >
      <va-slider
        track-label-visible
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="custom label"
    >
      <va-slider
        track-label-visible
        v-model="value3"
        :track-label="`${value3}px`"
        :step="5"
        :min="min"
        :max="max"
      />
      <input v-model.number="min">
      <input v-model.number="max">
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Label"
    >
      <va-slider
        label="Label"
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Slot Label"
    >
      <va-slider
        label="Label"
        v-model="value"
      >
        <div
          style="margin-right: 1rem;"
          slot="label"
        >
          SLOT
        </div>
      </va-slider>
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Inverted Slot Label"
    >
      <va-slider
        label="Label"
        invert-label
        v-model="value"
      >
        <div
          style="margin-left: 1rem;"
          slot="label"
        >
          INVERTED SLOT
        </div>
      </va-slider>
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Inverse Label"
    >
      <va-slider
        label="Label"
        invert-label
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Left Icon"
    >
      <va-slider
        icon="volume_off"
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Right Icon"
    >
      <va-slider
        icon-right="volume_up"
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Both Icons"
    >
      <va-slider
        icon="volume_off"
        icon-right="volume_up"
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Disabled Slider"
    >
      <va-slider
        disabled
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Readonly Slider"
    >
      <va-slider
        readonly
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Pins"
    >
      <va-slider
        pins
        :step="10"
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Colored sliders"
    >
      <va-slider
        color="#f333f2"
        v-model="value"
      />
      <va-slider
        color="info"
        track-color="warning"
        v-model="value"
      />
      <va-slider
        color="warning"
        track-color="grey"
        label-color="danger"
        label="Label"
        invert-label
        v-model="value"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range"
    >
      <va-slider
        range
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Visible Value"
    >
      <va-slider
        range
        track-label-visible
        v-model="value2"
      />
      {{ '[' + value2[0] + ',' + value2[1] + ']' }}
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Label"
    >
      <va-slider
        range
        label="Label"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Inverse Label"
    >
      <va-slider
        range
        label="Label"
        invert-label
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Left Icon"
    >
      <va-slider
        range
        icon="volume_off"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Right Icon"
    >
      <va-slider
        range
        icon-right="volume_up"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Both Icons"
    >
      <va-slider
        range
        icon="volume_off"
        icon-right="volume_up"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Disabled Range"
    >
      <va-slider
        range
        disabled
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Pins"
    >
      <va-slider
        range
        pins
        :step="10"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Colorful Range"
    >
      <va-slider
        range
        color="info"
        v-model="value2"
      />
    </VbCard>
    <VbCard
      width="500px"
      title="Slider With Input"
    >
<!--      <va-slider v-model="value">-->
<!--        <va-input-->
<!--          v-model="value"-->
<!--          slot="prepend"-->
<!--        />-->
<!--      </va-slider>-->
    </VbCard>
    <VbCard
      width="500px"
      title="Range With Inputs (demo for presentation)"
    >
<!--      <va-slider-->
<!--        range-->
<!--        v-model="value2"-->
<!--      >-->
<!--        <template #prepend>-->
<!--          <va-input-->
<!--            v-model.number="value2[0]"-->
<!--          />-->
<!--        </template>-->
<!--        <template #append>-->
<!--          <va-input-->
<!--            v-model="value2[1]"-->
<!--          />-->
<!--        </template>-->
<!--      </va-slider>-->
    </VbCard>
  </VbDemo>
</template>

<script>
import VaSlider from './VaSlider.vue'
import VaInput from '../va-input/VaInput'

export default {
  components: {
    // VaInput,
    VaSlider,
  },
  data () {
    return {
      value: 90,
      value2: [20, 60],
      value3: 1500,
      value4: [1100, 1320],
      min: 1000,
      max: 2000,
    }
  },
}
</script>
<style scoped lang="scss">
  .VbCard {
    min-width: 200px;
  }
</style>
