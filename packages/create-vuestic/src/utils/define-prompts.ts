import prompts, { type PromptObject } from 'prompts'

export const definePrompts = <S extends string, T extends PromptObject<S>[]>(prompts: T) => {
  return prompts
}

type Questions = {
  type: any,
  name: string,
  initial: any
}[]

// Extract answer type from question
type UserQuestionByName<UserQuestions extends PromptObject[], K extends string, T = UserQuestions[number]> = T extends { name: K } ? T : never
type DeBoolean<T> = T extends boolean ? boolean : T // Convert 'true' or 'false to 'boolean'

type ExtractAnswerFromQuestion<UserQuestions extends Questions> = {
  [Name in UserQuestions[number]['name']]: DeBoolean<UserQuestionByName<UserQuestions, Name>['initial']>
}

export const createPrompts = <UserQuestions extends Questions>(questions: UserQuestions): ExtractAnswerFromQuestion<UserQuestions> => {
  return prompts(questions, {
    onCancel() {
      console.log('Cancelled')
      process.exit(0)
    }
  }) as any
}
