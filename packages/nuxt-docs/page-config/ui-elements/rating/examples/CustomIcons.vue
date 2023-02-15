<template>
  <va-rating
    v-model="value"
    class="mb-2"
    icon="favorite"
    empty-icon="favorite_border"
  />
  <va-rating
    v-model="value"
    icon="thumb_up_alt"
    empty-icon="thumb_up_off_alt"
  />
</template>

<script>
export default {
  data() {
    return {
      value: 3,
    };
  },
};
</script>
