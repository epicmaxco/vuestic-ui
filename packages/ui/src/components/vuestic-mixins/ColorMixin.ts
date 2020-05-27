import { Component } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../context-test/context-provide/ContextPlugin'
import Vue from 'vue'
import { getColor } from '../../services/ColorThemePlugin'

/**
 * This mixin does not cover all needed color functionality for majority of components.
 * Its main purpose is raw code reuse.
 */
@Component({
  mixins: [
    makeContextablePropsMixin({
      color: {
        type: String,
      },
    }),
  ] as any,
})
export class ColorThemeMixin extends Vue {
  get colorComputed () {
    return getColor(this, (this as any).c_color)
  }

  computeColor (prop: string, defaultColor?: string) {
    return getColor(this, prop, defaultColor)
  }
}
