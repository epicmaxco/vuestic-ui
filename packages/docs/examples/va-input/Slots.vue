<template>
  <div>
    <va-input
      class="my-2"
      v-model="value"
      label="Icon prepend"
    >
      <va-icon
        slot="prepend"
        name="share"
      />
    </va-input>
    <va-input
      class="my-2"
      v-model="value"
      label="Icon prepend inner"
    >
      <va-icon
        slot="prependInner"
        name="share"
      />
    </va-input>
    <va-input
      class="my-2"
      v-model="value"
      label="Icon append"
    >
      <va-icon
        slot="append"
        name="share"
      />
    </va-input>
    <va-input
      class="my-2"
      v-model="value"
      label="Icon append inner"
    >
      <va-icon
        slot="appendInner"
        name="share"
      />
    </va-input>
  </div>
</template>

<script>
export default {
  name: 'Slots',
  data () {
    return {
      value: '',
    }
  },
}
</script>
