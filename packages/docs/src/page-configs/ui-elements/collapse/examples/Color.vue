<template>
  <div style="width: 400px;">
    <va-collapse
      v-model="value[0]"
      header="Collapse header"
      solid
      color="success"
      class="mb-4"
    >
      <div>
        Collapse content
      </div>
    </va-collapse>
    <va-collapse
      v-model="value[1]"
      header="Collapse header"
      solid
      color="warning"
      class="mb-4"
    >
      <div>
        Collapse content
      </div>
    </va-collapse>
    <va-collapse
      v-model="value[2]"
      header="Collapse header"
      solid
      color="danger"
      color-all
      class="mb-4"
    >
      <div>
        Collapse content
      </div>
    </va-collapse>
    <va-collapse
      v-model="value[3]"
      header="Collapse header"
      solid
      color="#000"
      color-all
      text-color="white"
      icon="info"
      class="mb-4"
    >
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
      value: [false, false, false, false],
    }
  },
}
</script>
