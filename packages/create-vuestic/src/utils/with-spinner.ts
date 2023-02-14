import ora from 'ora';

export const withSpinner = async <T>(message: string, cb: () => Promise<T>) => {
  const spinner = ora(message).start();

  await cb()

  spinner.succeed()
}
