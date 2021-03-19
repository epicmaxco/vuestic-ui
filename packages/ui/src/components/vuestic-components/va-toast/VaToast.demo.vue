<template>
  <VbDemo>
    <VbCard title="Basic usage">
      <button @click="$vaToast.init('yo')">notification</button>
    </VbCard>
    <VbCard title="Colors">
      <button
        v-for="(color, index) in colors"
        :key="index"
        @click="$vaToast.init({ message: `${color} notification`, color })"
      >
        {{color}}
      </button>
    </VbCard>
    <VbCard title="Custom Offsets">
      <button @click="$vaToast.init(customOffsets)">notification with custom offsets</button>
    </VbCard>
    <VbCard title="Custom Position">
      <button @click="$vaToast.init(customPosition)">notification with custom position</button>
    </VbCard>
    <VbCard title="Custom onClose">
      <button @click="$vaToast.init(customOnCloseHandler)">notification with custom onClose handler</button>
    </VbCard>
    <VbCard title="Close">
      <button @click="$vaToast.close('notification_4')">Close #4 toast</button>
    </VbCard>
    <VbCard title="Close All">
      <button @click="$vaToast.closeAll()">Close all toasts</button>
    </VbCard>
  </VbDemo>
</template>

<script>
import { useGlobalConfig } from '../../../services/GlobalConfigPlugin'

export default {
  setup () {
    const { setGlobalConfig } = useGlobalConfig()

    setGlobalConfig(config => ({
      ...config,
      VaToast: {
        color: 'red',
      },
    }))
  },

  data () {
    return {
      colors: ['primary', 'secondary', 'danger', 'warning', 'info'],
      customOffsets: {
        message: 'Custom offsets, (Y: 100, X: 100)',
        offsetX: 100,
        offsetY: 100,
      },
      customPosition: {
        position: 'bottom-left',
        message: 'Custom position (bottom-left)',
      },
      customOnCloseHandler: {
        position: 'bottom-right',
        message: 'Custom handler (bottom-right)',
        onClose: () => console.log('Handle onClose'),
      },
    }
  },
}
</script>
