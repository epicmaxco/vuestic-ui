import {
  VNode,
  Component,
  ConcreteComponent,
  h,
  defineComponent,
  shallowReactive,
} from 'vue'
import { RouteRecord, RouteLocationNormalized } from 'vue-router'

/**
 * Find which layout the component should render.
 * If the component is not specified layout name, `default` is used.
 * Otherwise return undefined.
 */
function resolveLayoutName (matched: RouteRecord[]): string | undefined {
  const defaultName = 'default'
  const last = matched[matched.length - 1]
  if (!last) {
    return
  }

  const Component: any = last.components.default
  if (!Component) {
    return
  }

  const isAsync = typeof Component === 'function' && !(Component.options || Component.__o)
  if (isAsync) {
    return
  }

  return getLayoutName(Component) || defaultName
}

function getLayoutName (
  Component: any, /* ComponentOptions | VueConstructor */
): string | undefined {
  const isCtor = typeof Component === 'function' && (Component.options || Component.__o)
  const options = isCtor ? (Component.options || Component.__o) : Component

  if (options.layout) {
    return options.layout
  } else {
    // Retrieve super component and mixins
    const mixins: any[] = (options.mixins || []).slice().reverse()
    const extend: any = options.extends || []

    return mixins.concat(extend).reduce<string | undefined>((acc, c) => {
      return acc || getLayoutName(c)
    }, undefined)
  }
}

function loadAsyncComponents (route: RouteLocationNormalized): Promise<unknown> {
  const promises: Promise<unknown>[] = []

  route.matched.forEach((record) => {
    Object.keys(record.components).forEach((key) => {
      const component: any = record.components[key]
      const isAsync = typeof component === 'function' && !(component.options || component.__o)

      if (isAsync) {
        promises.push(
          component().then((loaded: any) => {
            record.components[key] = normalizeEsModuleComponent(loaded)
          }),
        )
      }
    })
  })

  return Promise.all(promises)
}

function normalizeEsModuleComponent (
  comp: Component | { default: Component },
): Component {
  const c: any = comp
  const isEsModule =
    c.__esModule ||
    (typeof Symbol !== 'undefined' && c[Symbol.toStringTag] === 'Module')
  return isEsModule ? c.default : c
}

function install () {
  console.info(
    '[vue-router-layout] app.use(VueRouterLayout) is no longer needed. You can sefely remove it.',
  )
}

export function createRouterLayout (
  resolve: (layoutName: string) => Promise<Component | { default: Component }>,
) {
  return defineComponent({
    name: 'RouterLayout',

    data () {
      return {
        layoutName: undefined as string | undefined,
        layouts: shallowReactive(
          Object.create(null) as Record<string, Component>,
        ),
      }
    },

    async beforeRouteEnter (to, _from, next) {
      await loadAsyncComponents(to)

      const name = resolveLayoutName(to.matched)
      const layoutComp = name
        ? normalizeEsModuleComponent(await resolve(name))
        : undefined

      next((vm: any) => {
        vm.layoutName = name
        if (name && layoutComp) {
          vm.layouts[name] = layoutComp
        }
      })
    },

    async beforeRouteUpdate (to, _from, next) {
      try {
        await loadAsyncComponents(to)

        const name = resolveLayoutName(to.matched) || this.layoutName
        if (name && !this.layouts[name]) {
          this.layouts[name] = normalizeEsModuleComponent(await resolve(name))
        }

        this.layoutName = name
        next()
      } catch (error) {
        next(error)
      }
    },

    render (): VNode {
      const layout = this.layoutName && this.layouts[this.layoutName]
      if (!layout) {
        return h('span')
      }
      return h(layout as ConcreteComponent, {
        key: this.layoutName,
      })
    },
  })
}

export default {
  install,
}

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    layout?: string
  }
}
