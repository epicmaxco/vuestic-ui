import { type UserAnswers, getUserAnswers } from './../prompts';

let answers: UserAnswers | null = null

export const useUserAnswers = async () => {
  if (!answers) {
    answers = await getUserAnswers()
    console.log('')
  }
  return answers
}
