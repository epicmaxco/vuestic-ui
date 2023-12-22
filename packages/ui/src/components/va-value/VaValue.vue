<script lang="ts">
import {
  defineComponent,
  ref,
  h,
  Fragment,
  type Ref,
  type PropType,
} from 'vue'

import { renderSlotNodes } from '../../utils/headless'

type MustBeGeneric = any

export default defineComponent({
  name: 'VaValue',

  props: {
    defaultValue: { type: null as unknown as PropType<any>, required: false, default: false },
  },

  setup (props, { slots }) {
    const value = ref<MustBeGeneric>(props.defaultValue)

    // Vue will unwrap Refs passed as slot bind, so we make a fake not-Ref.
    const slotBind: Ref<MustBeGeneric> = new Proxy(value, {
      get (target, prop) {
        if (prop === 'value') {
          return target.value
        }

        return target[prop as keyof Ref<MustBeGeneric>]
      },
      set (target, prop, value) {
        if (prop === 'value') {
          target.value = value
        }

        return true
      },
    })

    return () => {
      return h(Fragment, [renderSlotNodes(slots.default, slotBind)])
    }
  },
})
</script>
