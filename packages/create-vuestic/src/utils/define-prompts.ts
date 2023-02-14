import prompts, { type PromptObject } from 'prompts'

export const definePrompts = <S extends string, T extends PromptObject<S>[]>(prompts: T) => {
  return prompts
}

type Question = {
  type: any,
  name: string,
  initial: any,
  choices?: { title: string, value: any }[],
}
type Questions = Question[]

// Extract answer type from question
type UserQuestionByName<UserQuestions extends PromptObject[], K extends string, T = UserQuestions[number]> = T extends { name: K } ? T : never
type DeBoolean<T> = T extends boolean ? boolean : T // Convert 'true' or 'false to 'boolean'
type DeFun<T> = T extends (...args: any[]) => infer R ? R : T // If function, use return type

type ExtractValue<T extends Question> =
  NonNullable<DeFun<T['type']>> extends 'multiselect' ?
    (T['choices'] extends { title: string, value: infer V }[] ? V[] : never) :
  NonNullable<DeFun<T['type']>> extends 'select' ?
    (T['choices'] extends { title: string, value: infer V }[] ? V : never) :
  // any other type: text, number, confirm, etc.
    DeBoolean<T['initial']>

type ExtractAnswerFromQuestion<UserQuestions extends Questions> = {
  [Name in UserQuestions[number]['name']]: ExtractValue<UserQuestionByName<UserQuestions, Name>>
}

export const createPrompts = <UserQuestions extends Questions>(questions: UserQuestions): ExtractAnswerFromQuestion<UserQuestions> => {
  return prompts(questions, {
    onCancel() {
      console.log('Cancelled')
      process.exit(0)
    }
  }) as any
}
