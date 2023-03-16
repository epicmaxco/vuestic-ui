<script lang="ts">
import {
  defineComponent,
  ref,
  h,
  Fragment,
  type Ref,
} from 'vue'

import { renderSlotNode } from '../../utils/headless'

export default defineComponent({
  name: 'VaValue',

  props: {
    defaultValue: { required: true },
  },

  setup (props, { slots }) {
    const value = ref<any>(props.defaultValue)

    // Vue will unwrap Refs passed as slot bind, so we make a fake not-Ref.
    const slotBind: Ref<any> = new Proxy(value, {
      get (target, prop) {
        if (prop === 'value') {
          return target.value
        }

        return target[prop]
      },
      set (target, prop, value) {
        if (prop === 'value') {
          target.value = value
        }

        return true
      },
    })

    return () => {
      return h(Fragment, [renderSlotNode(slots.default, slotBind)])
    }
  },
})
</script>
