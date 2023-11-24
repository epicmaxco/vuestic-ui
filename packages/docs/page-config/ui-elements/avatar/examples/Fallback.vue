<template>
  <VaAvatar
    src="https://not-exist"
    class="mr-6"
  />
  <VaAvatar
    src="https://not-exist"
    fallback-icon="warning"
  />
</template>

<script setup>
import { useGlobalConfig } from 'vuestic-ui/src/services/global-config';

const { mergeGlobalConfig } = useGlobalConfig()

mergeGlobalConfig({
  components: {
    VaAvatar: {
      fallbackSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
})
</script>

