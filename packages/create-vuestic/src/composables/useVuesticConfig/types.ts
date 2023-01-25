import { UserAnswers } from "../../prompts"

type ConfigFn<T> = ((answers: UserAnswers) => T) | T

export type Config = {
  import: ConfigFn<string[]>,
  plugin: string,
  css: ConfigFn<string[]>,
}
