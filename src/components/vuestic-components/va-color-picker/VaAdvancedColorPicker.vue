<template>
  <ChromePicker v-model="valueProxy" class="va-advanced-color-picker"/>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'va-advanced-color-picker',
  components: {
    ChromePicker: Chrome,
  },
  props: {
    value: {
      default: '',
    },
  },
  computed: {
    valueProxy: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value.hex)
      },
    },
  },
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-advanced-color-picker {
  .vc-chrome-field {
    display: flex;
    position: relative;
    width: 100%;
    min-height: 2.375rem;
    border-style: solid;
    border-width: 0 0 thin 0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding-left: 0 !important;
  }
  .vc-editable-input {
    display: flex;
    position: relative;
    align-items: flex-end;
    width: 100%;
  }
  .vc-input__input {
    width: 100%;
    height: 1.5rem;
    margin-bottom: 0.125rem;
    padding: 0.25rem 0.5rem;
    color: #34495e;
    background-color: transparent;
    border-style: none;
    box-shadow: none !important;
    outline: none;
    font-size: 1rem !important;
    font-family: $font-family-sans-serif;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left !important;

    &::placeholder {
      color: $brand-secondary;
    }

    &:placeholder-shown {
      padding-bottom: 0.875rem;
    }
  }

  .vc-input__label {
    position: absolute;
    bottom: 0.875rem;
    left: 0.5rem;
    margin-bottom: 0.5rem;
    max-width: calc(100% - 0.25rem);
    color: $vue-green !important;
    font-size: 0.625rem;
    letter-spacing: 0.0375rem;
    line-height: 1.2;
    font-weight: bold;
    text-transform: uppercase;
    @include va-ellipsis();
    transform-origin: top left;
  }
}
</style>
