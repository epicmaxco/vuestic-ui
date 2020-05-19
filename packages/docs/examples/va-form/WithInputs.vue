<template>
  <div>
    <va-button @click="/*$refst.form.validate() doesn't work for some reason*/() => {}">Validate</va-button>
    <va-form ref="form">
      <va-input
        label="Name"
        stateful
        :rules="[value => value === 'Ben' || 'Should be Ben']"
      />
      <va-select
        label="City"
        stateful
        :options="['Minsk', 'Los Angeles', 'San Francisco', 'Peru']"
      />
    </va-form>
  </div>
</template>
