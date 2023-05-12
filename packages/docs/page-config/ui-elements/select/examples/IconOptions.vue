<template>
    <div style="max-width: 300px;">
      <va-select
        v-model="value"
        :options="options"
        :option-component="iconOption"
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
        value: "",
        options: [
          { code: 'sv', name: 'Svenska', icon: 'flag-se' },
          { code: 'en', name: 'English', icon: 'flag-gb' },
          { code: 'fr', name: 'Français', icon: 'flag-fr' },
          { code: 'de', name: 'Deutsch', icon: 'flag-de' }
        ],
      };
    },
    computed: {
      iconOption() {
        return {
          props: ['option'],
          template: `<div><i class="icon-${this.option.icon}"></i> {{option.name}}</div>`
        }
      }
    }
  };
  </script>
  