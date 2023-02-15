<template>
  <va-switch
    v-model="positionVertical"
    true-value="top"
    false-value="bottom"
    true-inner-label="top"
    false-inner-label="bottom"
    label="Vertical Position:"
    left-label
    class="py-2"
  />
  <br>
  <va-switch
    v-model="positionHorizontal"
    true-value="left"
    false-value="right"
    true-inner-label="left"
    false-inner-label="right"
    label="Horizontal Position:"
    left-label
    class="pt-2 pb-6"
  />
  <br>
  <va-slider
    v-model="verticalOffset"
    label="Vertical offset:"
    track-label-visible
    :track-label="`${verticalOffset}%`"
    :min="1"
    :max="100"
  />
  <br>
  <va-slider
    v-model="horizontalOffset"
    label="Horizontal offset:"
    track-label-visible
    :track-label="`${horizontalOffset}%`"
    :min="1"
    :max="100"
  />
  <br>
  <va-slider
    v-model="visibilityHeight"
    label="Visibility height:"
    track-label-visible
    :track-label="`${visibilityHeight}`"
    :min="0"
    :max="600"
  />
  <br>
  <va-slider
    v-model="scrollSpeed"
    track-label-visible
    label="Scroll speed:"
    :track-label="`${scrollSpeed}`"
    :min="1"
    :max="500"
  />
  <br>
  <va-checkbox
    v-model="isSlot"
    :label="`Active Slot: ${isSlot}`"
  />

  <va-backtop
    :vertical-offset="verticalOffset + '%'"
    :horizontal-offset="horizontalOffset + '%'"
    :horizontal-position="positionHorizontal"
    :vertical-position="positionVertical"
    :visibility-height="visibilityHeight"
    :speed="scrollSpeed"
  >
    <p v-if="isSlot">
      Slot: back to top
    </p>
  </va-backtop>
</template>

<script>
export default {
  data() {
    return {
      positionVertical: "bottom",
      positionHorizontal: "right",

      verticalOffset: 5,
      horizontalOffset: 5,
      visibilityHeight: 1,
      scrollSpeed: 50,
      isSlot: false,
    };
  },
};
</script>
