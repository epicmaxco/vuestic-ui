import type { StoryFn } from '@storybook/vue3';
import { userEvent } from './interaction-utils/userEvent';
import { sleep } from '../src/utils/sleep';
import { expect } from '@storybook/jest'
import { ComponentPublicInstance, ComponentOptions } from 'vue';

type PlayFn = NonNullable<StoryFn['play']>

type AdditionalArgs = {
  event: typeof userEvent,
  expect: typeof expect,
  sleep: typeof sleep,
}
type DefinedStoryTests<Methods> = (
  context: Parameters<PlayFn>[0] & AdditionalArgs & {
    /** Methods from story instance */
    methods: Methods
  }
) => ReturnType<PlayFn>

type DefinedStory<Methods> = {
  story: StoryFn & (() => ReturnType<StoryFn> & { methods?: Methods }),

  tests?: DefinedStoryTests<Methods>
}

export const defineStory = <T>(story: DefinedStory<T>) => {
  const s: StoryFn = () => {
    const vue = story.story()

    /** Globally register $methods, so we can access it in tests */
    const fakeMounted = function (this: ComponentPublicInstance<any>) {
      ;(document as any).$methods = this
    }

    if ('mounted' in vue) {
      const originalMounted = vue.mounted
      vue.mounted = function (this: ComponentPublicInstance<any>) {
        originalMounted?.call(this)
        fakeMounted.call(this)
      }
    } else {
      (vue as any).mounted = fakeMounted
    }

    return vue
  }

  if (story.tests) {
    s.play = (context) => {
      return story.tests!({
        ...context,
        event: userEvent,
        expect,
        sleep,
        /** Readonly methods from story component instance */
        methods: new Proxy({}, {
          get(target, key) {
            return (document as any).$methods[key]
          }
        }) as T
      })
    }
  }

  return s
}
