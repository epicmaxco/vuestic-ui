import { type render } from './transform'

export type ChangeLog = Awaited<ReturnType<typeof render>>
