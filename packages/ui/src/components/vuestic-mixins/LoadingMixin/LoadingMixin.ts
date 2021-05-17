import { prop, Vue } from 'vue-class-component'

class Props {
  loading = prop<boolean>({ type: Boolean, default: false })
}

export class LoadingMixin extends Vue.with(Props) {
  isLoadingMixin!: boolean

  created () {
    this.isLoadingMixin = true
  }
}
