import { set } from "lodash"

type StoryStatus = 'stale'

const statusToText = (status?: StoryStatus) => {
  if (status === 'stale') {
    return `**<span style="color: #af0f0f">[${status}]</span>**`
  }
  return ''
}

export const addText = (story: any, text?: string, status?: StoryStatus) => {
  set(story, 'parameters.docs.description.story', `${statusToText(status)} ${text || ''}`)
}

export const getStaticDate = () => new Date('Sat Aug 19 2023')
