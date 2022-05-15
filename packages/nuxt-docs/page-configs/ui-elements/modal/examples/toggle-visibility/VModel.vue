<template>
  <p>
    <va-button @click="showModal = !showModal">
      Show modal (v-model)
    </va-button>
    <va-modal v-model="showModal" :message="message" />
  </p>
</template>
<script>
export default {
  data () {
    return {
      showModal: false,
      message:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis, consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.',
    }
  },
}
</script>
