<template>
  <div>
    <p>Default</p>
    <va-color-input-advanced
      v-model="value"
    >
    </va-color-input-advanced>
    <br/>

    <p>Slider Mode</p>
    <va-color-input-advanced
      v-model="value"
      mode="slider"
    >
    </va-color-input-advanced>
    <br/>

    <p>Advanced Mode</p>
    <va-color-input-advanced
      v-model="value"
      mode="advanced"
    >
      <va-color-input v-model="value" />
    </va-color-input-advanced>
    <br/>

    <p>Palette Mode</p>
    <va-color-input-advanced
      v-model="value"
      mode="palette"
      :palette="['#4ae387', '#e34a4a', '#4ab2e3', '#db76df', '#f7cc36', '#fff', '#000']"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '#FF00FF',
    }
  },
}
</script>
