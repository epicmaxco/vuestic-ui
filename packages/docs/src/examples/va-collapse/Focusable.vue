<template>
  <div>
    <va-collapse
      v-model="value"
      :focusable="isFocusable"
    >
      <template #header>
        <va-button>
          Focus me with the tab key!
        </va-button>
      </template>
    </va-collapse>

    <va-switch
      v-model="isFocusable"
      :label="':focusable=\'' + isFocusable + '\''"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false,
      isFocusable: true,
    }
  },
}
</script>
