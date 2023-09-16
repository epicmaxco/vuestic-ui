import { set } from "lodash"

type StoryStatus =
  | 'stale' // Feature works, but story smells
  | 'broken' // Feature doesn't work

const statusToText = (status?: StoryStatus) => {
  if (status === 'stale') {
    return `**<span style="color: #c9892b">[${status}]</span>**`
  }
  if (status === 'broken') {
    return `**<span style="color: white; background: #e52953">[${status}]</span>**`
  }
  return ''
}

export const addText = (story: any, text?: string, status?: StoryStatus) => {
  set(story, 'parameters.docs.description.story', `${statusToText(status)} ${text || ''}`)
}

export const getStaticDate = () => new Date('Sat Aug 19 2023')
