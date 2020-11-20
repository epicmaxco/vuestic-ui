import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export class LoadingMixin extends Vue {
  @Prop({ type: Boolean, default: false }) loading?: boolean

  setup () {
    return {
      isLoadingMixin: true,
    }
  }
}
