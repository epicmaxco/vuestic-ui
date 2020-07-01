<template>
  <div>
    <va-alert icon="info">
    You successfully read this important alert message with an icon.
    </va-alert>
    <va-alert>
    <template slot="icon">
        <va-icon name="info" color="success" />
    </template>
    You successfully read this important alert message with a slotted icon.
    </va-alert>
  </div>
</template>

<script>
import VaIcon from '../../../ui/src/components/vuestic-components/va-icon/VaIcon'
export default {
  components: {
    VaIcon,
  },
  data () {
    return {

    }
  },
}
</script>
