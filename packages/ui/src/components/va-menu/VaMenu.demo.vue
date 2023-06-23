<template>
  <va-menu
    v-model="defeaultOptions.value"
    class="mb-6"
    :options="defeaultOptions.options"
    @option-click="clickHandler"
  />
</template>

<script lang="ts">
import VaMenu from './VaMenu.vue'

export default {
  components: { VaMenu },
  data () {
    return {
      defeaultOptions: {
        value: true,
        options: [
          { id: '0', text: 'one', value: 'one', icon: 'accessible_forward', rightIcon: '' },
          { id: '1', text: 'two', value: 'two', icon: '', rightIcon: 'accessible_forward' },
          { id: '2', text: 'three', value: 'three', icon: 'accessible_forward', rightIcon: '' },
          { id: '3', text: 'four', value: 'four', icon: '', rightIcon: 'accessible_forward' },
          { id: '4', text: 'five', value: 'five', icon: 'accessible_forward', rightIcon: '' },
        ],
      },
    }
  },
  methods: {
    clickHandler (option) {
      console.log('You clicked on ' + option.text)
    },
  },
}

</script>
