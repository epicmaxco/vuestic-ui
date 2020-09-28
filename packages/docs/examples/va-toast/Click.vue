<template>
  <div>
    <button @click="$vaToast.init({
      message: 'Custom position (bottom-left)',
      onClick: clickHandler
    })">notification with custom onClick handler</button>
  </div>
</template>

<script>
export default {
  methods: {
    clickHandler () {
      alert('clicked')
    },
  },
}
</script>
