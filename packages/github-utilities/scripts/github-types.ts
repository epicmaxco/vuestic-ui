export type Label = {
  id: number, //4370229252
  node_id: string, // 'LA_kwDOC_Foic8AAAABBHxoBA'
  url: string, // 'https://api.github.com/repos/epicmaxco/vuestic-ui/labels/backend'
  name: string, // 'backend'
  color: string, // 'C9CF9E'
  default: boolean, // false
  description: string // ''
}

export type PartialLabel = Pick<Label, 'name' | 'color' | 'description'>;
