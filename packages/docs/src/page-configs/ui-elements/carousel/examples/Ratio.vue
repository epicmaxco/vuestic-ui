<template>
  <div>
    <va-carousel :items="items" v-model="value" :ratio="1/1" />
  </div>
  <div class="mt-4">
    <va-carousel :items="items" v-model="value" :ratio="21/9" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 0,
      items: [
        'https://picsum.photos/1500',
        'https://picsum.photos/1501',
        'https://picsum.photos/1502',
        'https://picsum.photos/1503',
        'https://picsum.photos/1504',
      ],
    }
  },
}
</script>
