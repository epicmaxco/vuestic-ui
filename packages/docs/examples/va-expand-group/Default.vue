<template>
  <va-expand-group v-model="value" style="width: 400px;">
    <va-expand
      v-for="(expand, index) in expands"
      :key="index"
      :header="expand.title"
    >
      <div>
        {{ expand.content }}
      </div>
    </va-expand>
  </va-expand-group>
</template>

<script>
export default {
  data () {
    return {
      value: [false, false, false],
      expands: [
        { title: 'First expand', content: 'first expand content' },
        { title: 'Second expand', content: 'second expand content' },
        { title: 'Third expand', content: 'third expand content' },
      ],
    }
  },
}
</script>
