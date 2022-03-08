<template>
  <va-carousel :items="items" v-model="value" arrows indicators>
    <template #default="{ item }">
      <va-avatar :src="item" />
    </template>

    <template #prev-arrow> Go back! </template>

    <template #prev-next> Go forward! </template>

    <template #indicator="{ index }"> Go to {{ index }} </template>
  </va-carousel>
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
