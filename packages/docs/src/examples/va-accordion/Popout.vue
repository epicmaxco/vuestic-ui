<template>
  <va-accordion
    v-model="value"
    style="width: 400px;"
    popout
  >
    <va-collapse
      v-for="(collapse, index) in collapses"
      :key="index"
      :header="collapse.title"
    >
      <div>
        {{ collapse.content }}
      </div>
    </va-collapse>
  </va-accordion>
</template>

<script>
export default {
  data () {
    return {
      value: [false, false, false],
      collapses: [
        { title: 'First collapse', content: 'first collapse content' },
        { title: 'Second collapse', content: 'second collapse content' },
        { title: 'Third collapse', content: 'third collapse content' },
      ],
    }
  },
}
</script>
