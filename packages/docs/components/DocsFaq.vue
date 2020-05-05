<template>
  <div>
    <template v-for="(item, index) in items">
      <h3 :key="index">
        {{$t(item.question)}}
      </h3>
      <p :key="index">
        {{$t(item.answer)}}
      </p>
    </template>
  </div>
</template>
<script>

export default {
  props: {
    items: {
      type: Array,
    },
  },
}
</script>
