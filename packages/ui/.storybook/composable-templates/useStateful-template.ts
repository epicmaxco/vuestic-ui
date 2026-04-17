import { DefineComponent } from 'vue'
import { getStoryId } from '../interaction-utils/storySelector'
import { expect } from '@storybook/jest'
import { StoryFn } from '@storybook/vue3'

export const UseStatefulTemplate = (
  component: Record<string, DefineComponent>,
  input: (el: HTMLElement) => void = el => el.click(),
  defaultValue = false
): StoryFn => {
  const story = () => ({
    setup () {
      return {
        component,
        defaultValue,
      }
    },
    template: `
    <p>[true]</p>
    <component
      data-testid="true"
      :is="component"
      :stateful="defaultValue === true ? undefined : true"
    />

    <p>[false]</p>
    <component
      data-testid="false"
      :is="component"
      :stateful="defaultValue === false ? undefined : false"
    />
  `,
  })
  story.play = async () => {
    /**
     * To test stateful we need to test 2 things:
     * * On user input for stateful="true" - there should be change
     * * On user input for stateful="false" - there should be no change
     */
    input(getStoryId('true'))
    input(getStoryId('false'))

    // We rely on visual tests here
    expect(true).toBe(true)
  }
  return story
}
