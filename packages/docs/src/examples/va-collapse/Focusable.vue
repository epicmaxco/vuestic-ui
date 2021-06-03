<template>
  <div>
    <va-collapse
      v-model="value"
      header="A default one"
      class="mb-4"
    >
      <div>
        Collapse content
      </div>
    </va-collapse>

    <va-collapse
      v-model="value"
      :focusable="false"
      header=":focusable='false'"
      class="mb-4"
    >
      <div>
        Collapse content
      </div>
    </va-collapse>

    <span>For the next one you'll see that the button is not focused right after the default one</span>
    <va-collapse
      v-model="value"
    >
      <template #header>
        <va-button>A button</va-button>
      </template>
      <div>
        Collapse content
      </div>
    </va-collapse>

    <span>And now it is (with <code>focusable</code> prop set to <code>false</code>)</span>
    <va-collapse
      v-model="value"
      :focusable="false"
    >
      <template #header>
        <va-button>A button inside&nbsp;<code>&lt;va-collapse :focusable="false"&gt;</code></va-button>
      </template>
      <div>
        Collapse content
      </div>
    </va-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false,
    }
  },
}
</script>
