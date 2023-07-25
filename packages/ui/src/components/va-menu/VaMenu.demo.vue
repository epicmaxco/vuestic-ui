<template>
  <va-menu
    v-model="defeaultOptions.value"
    class="mb-6"
    :options="defeaultOptions.options"
    @option-click="clickHandler"
  />
  <div style="background-coloror:red">
    <va-menu
    v-model="defeaultOptions.value"
    class="mb-6"
    :options="defeaultOptions.options"
    @option-click="clickHandler"
    >
      <template #anchor>
        <div style="background-color: blue; width: 300px; height: 300px;">

        </div>
      </template>
    </va-menu>
  </div>
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
          { id: '0', text: 'one', value: 'one', icon: 'accessible_forward', rightIcon: '', disabled: true, group: '' },
          { id: '1', text: 'two', value: 'two', icon: '', rightIcon: 'accessible_forward', group: 'A1' },
          { id: '2', text: 'three', value: 'three', icon: 'accessible_forward', rightIcon: '', group: 'A1' },
          { id: '3', text: 'four', value: 'four', icon: '', rightIcon: 'accessible_forward', disabled: true, group: 'A2' },
          { id: '4', text: 'five', value: 'five', icon: 'accessible_forward', rightIcon: '', group: 'A2' },
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
