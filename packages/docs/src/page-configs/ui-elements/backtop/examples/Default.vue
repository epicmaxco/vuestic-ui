<template>
  <va-switch v-model="positionVertical"
             true-value="top"
             false-value="bottom"
             true-inner-label="top"
             false-inner-label="bottom"
             label="Vertical Position:"
             left-label
             class="py-2"
  />
  <br />
  <va-switch v-model="positionHorizontal"
             true-value="left"
             false-value="right"
             true-inner-label="left"
             false-inner-label="right"
             label="Horizontal Position:"
             left-label
             class="pt-2 pb-6"
  />
  <br />
  <va-slider
    label="Vertical offset:"
    track-label-visible
    v-model="verticalOffset"
    :track-label="`${verticalOffset}%`"
    :min="1"
    :max="100"
  />
  <br />
  <va-slider
    label="Horizontal offset:"
    track-label-visible
    v-model="horizontalOffset"
    :track-label="`${horizontalOffset}%`"
    :min="1"
    :max="100"
  />
  <br />
  <va-slider
    label="Visibility height:"
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
    label="Scroll speed:"
    :track-label="`${scrollSpeed}`"
    :min="1"
    :max="500"
  />
  <br />
  <va-checkbox
    v-model="isSlot"
    :label="`Active Slot: ${isSlot}`" />

  <va-backtop
    target=".base-layout__content"
    :vertical-offset="verticalOffset + '%'"
    :horizontal-offset="horizontalOffset + '%'"
    :horizontal-position="positionHorizontal"
    :vertical-position="positionVertical"
    :visibility-height="visibilityHeight"
    :speed="scrollSpeed"
  >
    <p v-if="isSlot">Slot: back to top</p>
  </va-backtop>
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
