<template>
  <div>
    <va-alert icon="info">
    You read this important alert message with an icon.
    </va-alert>
    <va-alert>
    <template slot="icon">
        <va-icon name="info"/>
    </template>
    You read this important alert message with a slotted icon.
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
