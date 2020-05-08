<template>
  <div>
    <template v-for="(item, index) in items">
      <h3 :key="index">
        {{$t(item.question)}}
      </h3>
      <p :key="index">
        {{$t(item.answer)}}
      </p>
    </template>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FaqBlock } from '../types/configTypes'

@Component({})
export default class DocsFaq extends Vue {
  @Prop({ type: Array }) items!: FaqBlock[]
}
</script>
