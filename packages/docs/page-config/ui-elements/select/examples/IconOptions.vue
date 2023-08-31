<template>
  <div class="max-w-sm">
    <va-select
      v-model="value"
      :options="options"
    />
  </div>
</template>

<script>
import VaSelect from 'vuestic-ui/src/components/va-select/VaSelect.vue'

export default {
  components: {
    VaSelect
  },
  data() {
    return {
      value: { code: 'in', text: 'Information', icon: 'info' },
      options: [
        { code: 'in', text: 'Information', icon: 'info' },
        { code: 'fa', text: 'Face', icon: 'face' },
        { code: 'wr', text: 'Warning', icon: 'va-warning' }
      ],
    };
  },
};
</script>
