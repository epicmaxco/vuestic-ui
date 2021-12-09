<template>
  <div style="width: 300px;">
    <va-input
      class="mb-4"
      v-model="value"
      label="Icon prepend"
    >
      <template #prepend>
        <va-icon
          name="share"
        />
      </template>
    </va-input>
    <va-input
      class="mb-4"
      v-model="value"
      label="Icon prepend inner"
    >
      <template #prependInner>
        <va-icon
          name="share"
        />
      </template>
    </va-input>
    <va-input
      class="mb-4"
      v-model="value"
      label="Icon append"
    >
      <template #append>
        <va-icon
          name="share"
        />
      </template>
    </va-input>
    <va-input
      class="mb-4"
      v-model="value"
      label="Icon append inner"
    >
      <template #appendInner>
        <va-icon
          name="share"
        />
      </template>
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
