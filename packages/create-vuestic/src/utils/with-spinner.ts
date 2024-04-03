import ora from 'ora';

export const withSpinner = async <T>(message: string, cb: () => Promise<T>) => {
  const spinner = ora(message).start();

  try {
    await cb()
  }
  catch (e) {
    throw e
  }
  finally {
    spinner.succeed()
  }
}
