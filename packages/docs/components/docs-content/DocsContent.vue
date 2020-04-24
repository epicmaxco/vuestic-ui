<template>
<div>
  <dynamic-template v-for="(block, index) in config" :key="index" :block="block"></dynamic-template>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DynamicTemplate from '../dynamic-template/DynamicTemplate.vue'
import ratingConfig from './configs/rating'

@Component({
  components: { DynamicTemplate },
})
export default class DocsContent extends Vue {
  get config () {
    return ratingConfig
  }
}
</script>
