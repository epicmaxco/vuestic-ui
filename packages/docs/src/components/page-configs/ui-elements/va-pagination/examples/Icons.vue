<template>
  <va-pagination
    :pages="10"
    :visible-pages="3"
    boundary-icon-left='volume_off'
    boundary-icon-right='volume_up'
    direction-icon-right='volume_down'
    direction-icon-left='volume_mute'
    v-model="value"
  />
</template>
<script>
export default {
  data () {
    return {
      value: 3,
    }
  },
}
</script>
