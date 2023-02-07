type StringWithAutocomplete<T> = T | (string & Record<never, never>)

export type TableData = string[][];
export type TableColumn = string | { title: string, type?: StringWithAutocomplete<'strong' | 'markdown' | 'code' | 'pre' | 'plain' | 'translationString'> }
