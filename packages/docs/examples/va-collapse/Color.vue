<template>
  <div>
    <va-collapse
      v-model="value[0]"
      style="width: 400px;"
      header="Expand header"
      color="success"
    >
      <div>
        Expand content
      </div>
    </va-collapse>
    <va-collapse
      v-model="value[1]"
      style="width: 400px;"
      header="Expand header"
      solid
      color="warning"
    >
      <div>
        Expand content
      </div>
    </va-collapse>
    <va-collapse
      v-model="value[2]"
      style="width: 400px;"
      header="Expand header"
      solid
      color="danger"
      color-all
    >
      <div>
        Expand content
      </div>
    </va-collapse>
    <va-collapse
      v-model="value[3]"
      style="width: 400px;"
      header="Expand header"
      solid
      color="#000"
      color-all
      text-color="white"
      icon="info"
    >
      <div>
        Expand content
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
