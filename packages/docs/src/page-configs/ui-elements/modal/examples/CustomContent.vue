<template>
  <va-button @click="showCustomContent = !showCustomContent">
    Show custom content modal
  </va-button>
  <va-modal
    v-model="showCustomContent"
    no-padding
  >
    <template #content="{ ok }">
      <va-image :ratio="16/9" src="https://picsum.photos/1500" />
      <va-card-title>
        Title!
      </va-card-title>
      <va-card-content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id perferendis, illum rem dolorum obcaecati dolorem. Laborum, odio ipsum qui quaerat itaque reiciendis error nemo tenetur beatae. Vel obcaecati magni maxime!
      </va-card-content>
      <va-card-actions>
        <va-button @click="ok" color="warning">Ok!</va-button>
      </va-card-actions>
    </template>
  </va-modal>
</template>

<script>
export default {
  data () { return { showCustomContent: false } },
}
</script>
