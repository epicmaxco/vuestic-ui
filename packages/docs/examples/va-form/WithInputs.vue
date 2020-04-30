<template>
  <va-form>
    <va-input
      label="Name"
      stateful
      required
    />
    <va-select
      label="City"
      stateful
      required
      :options="['Minsk', 'Los Angeles', 'San Francisco', 'Peru']"
    />
    <va-button @click="validate()">Validate</va-button>
  </va-form>
</template>

<script>
export default {}
</script>
