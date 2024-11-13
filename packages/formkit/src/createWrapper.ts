import { DefineComponent, defineComponent, h } from 'vue'
import { useInput } from '@formkit/vue'

type FormkitComponentType = 'text' | 'number' | 'button' | 'checkbox' | 'radio' | 'select' | 'textarea'

export const createFormkitWrapper = <C extends DefineComponent>(
  component: C,
  options: {
    type: FormkitComponentType,
  } = { type: 'text' }
) => {
  return defineComponent((props, ctx) => {
    const node = useInput(
      {
        type: options.type,
      },
      ctx
    )


    return () => h(component, {
      ...props,
    }, ctx.slots)
  }, {
    inheritAttrs: false,

    props: {

    }
  })
}
