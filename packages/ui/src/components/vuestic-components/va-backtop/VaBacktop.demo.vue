<template>
  <VbDemo>
    <VbCard
      title="Scroll down to see the backtop component and use options to customize it"
      style="margin-bottom: 200vh;"
    >
      <VbCard title="Position">
      <va-radio
        v-for="(option, index) in optionHorizontal"
        :key="index + 'h'"
        v-model="positionHorizontal"
        :option="option"
      />
      <br />
      <va-radio
        v-for="(option, index) in optionVertical"
        :key="index + 'v'"
        v-model="positionVertical"
        :option="option"
      />
      </VbCard>

      <VbCard title="Offset">
      <va-slider
        label="v:"
        track-label-visible
        v-model="verticalOffset"
        :track-label="`${verticalOffset}%`"
        :min="1"
        :max="100"
      />
      <br />
      <va-slider
        label="h:"
        track-label-visible
        v-model="horizontalOffset"
        :track-label="`${horizontalOffset}%`"
        :min="1"
        :max="100"
      />
      </VbCard>

      <VbCard title="Visibility Height">
      <va-slider
        track-label-visible
        v-model="visibilityHeight"
        :track-label="`${visibilityHeight}`"
        :min="0"
        :max="600"
      />
      </VbCard>

      <VbCard title="Scroll back speed">
      <va-slider
        track-label-visible
        v-model="scrollSpeed"
        :track-label="`${scrollSpeed}`"
        :min="1"
        :max="500"
      />
      </VbCard>

      <VbCard title="Slot">
      <va-checkbox
        v-model="isSlot"
        :label="`Active Slot: ${isSlot}`" />
      </VbCard>

      <va-backtop
        target=".VbDemo"
        :vertical-offset="verticalOffset + '%'"
        :horizontal-offset="horizontalOffset + '%'"
        :horizontal-position="positionHorizontal"
        :vertical-position="positionVertical"
        :visibility-height="visibilityHeight"
        :speed="scrollSpeed"
      >
        <p v-if="isSlot">Slot: back to top</p>
      </va-backtop>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaBacktop from './index'
import VaRadio from '../va-radio'
import VaSlider from '../va-slider'
import VaCheckbox from '../va-checkbox'

export default {
  components: {
    VaBacktop,
    VaRadio,
    VaSlider,
    VaCheckbox,
  },
  data () {
    return {
      optionHorizontal: [
        'left',
        'right',
      ],
      optionVertical: [
        'top',
        'bottom',
      ],
      positionVertical: 'bottom',
      positionHorizontal: 'right',

      verticalOffset: 1,
      horizontalOffset: 1,
      visibilityHeight: 1,
      scrollSpeed: 50,
      isSlot: false,
    }
  },
}
</script>
