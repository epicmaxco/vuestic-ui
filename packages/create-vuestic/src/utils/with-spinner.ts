import ora from 'ora';

export const withSpinner = async <T>(message: string, cb: () => Promise<T>) => {
  const spinner = ora('Creating Vue project').start();

  await cb()

  spinner.succeed('Succeeded!')
}
