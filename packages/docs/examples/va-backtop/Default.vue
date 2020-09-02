<template>
  <div>
    <va-switch v-model="positionVertical"
      true-value="top"
      false-value="bottom"
      true-inner-label="top"
      false-inner-label="bottom"
      label="Vertical Position:"
      left-label
    />
    <br />
    <va-switch v-model="positionHorizontal"
      true-value="left"
      false-value="right"
      true-inner-label="left"
      false-inner-label="right"
      label="Horizontal Position:"
      left-label
    />
    <br />
    <va-slider
      label="vertical offset:"
      track-label-visible
      v-model="verticalOffset"
      :track-label="`${verticalOffset}%`"
      :min="1"
      :max="100"
    />
    <br />
    <va-slider
      label="horizontal offset:"
      track-label-visible
      v-model="horizontalOffset"
      :track-label="`${horizontalOffset}%`"
      :min="1"
      :max="100"
    />
    <br />
    <va-slider
      label="visibility height:"
      track-label-visible
      v-model="visibilityHeight"
      :track-label="`${visibilityHeight}`"
      :min="0"
      :max="600"
    />
    <br />
    <va-slider
      track-label-visible
      v-model="scrollSpeed"
      label="Scroll speed"
      :track-label="`${scrollSpeed}`"
      :min="1"
      :max="500"
    />
    <br />
    <va-checkbox
      v-model="isSlot"
      :label="`Active Slot: ${isSlot}`" />

    <va-backtop
      target=".base-layout__main"
      :vertical-offset="verticalOffset + '%'"
      :horizontal-offset="horizontalOffset + '%'"
      :horizontal-position="positionHorizontal"
      :vertical-position="positionVertical"
      :visibility-height="visibilityHeight"
      :speed="scrollSpeed"
    >
      <p v-if="isSlot">Slot: back to top</p>
    </va-backtop>
  </div>
</template>

<script>
export default {
  data () {
    return {
      positionVertical: 'bottom',
      positionHorizontal: 'right',

      verticalOffset: 5,
      horizontalOffset: 5,
      visibilityHeight: 1,
      scrollSpeed: 50,
      isSlot: false,
    }
  },
}
</script>
