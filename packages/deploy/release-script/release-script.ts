import {
  bumpPackageJsonVersion,
  executeAndLog,
  getPackageJsonVersion,
  bumpGithubTemplateVersions,
  bumpVersionInGenerators,
  executeCommand, getCommitHash,
} from './utils'

import semver from 'semver'

import inquirer, { DistinctQuestion } from 'inquirer'
import chalk from 'chalk'

export type ReleaseType = 'large' | 'tiny' | 'next' | 'experimental'

export type ReleaseConfig = {
  version: string, // 1.2.3
  distTag: 'latest' | 'next' | 'experimental',
  gitTag: string, // v1.2.3
  branch: string, // 'develop'
  requiredBranch: string // 'develop'
  commit: string, // '12345678'
  shouldCommit: boolean,
  remote: string,
}

const gitTagFromVersion = (version: string) => `v${version}`

const incrementVersion = (version: string, type: 'major' | 'minor' | 'patch'): string => {
  const result = semver.inc(version, type)
  if (!result) {
    throw new Error(`Unable to increment ${type} version on '${version}'`)
  }
  return result
}

const getReleaseConfig = async (releaseType: ReleaseType): Promise<ReleaseConfig> => {
  const remote = (await enterRemoteName()) || 'upstream'

  const currentBranchName = await executeCommand('git rev-parse --abbrev-ref HEAD')
  // 20220602
  const dateIsoShort = new Date().toISOString().split('T')[0].replace(/-/g, '')
  // 12a4dd78
  const commitHash = await getCommitHash()
  // 1.2.3
  const currentVersion = getPackageJsonVersion()

  let result: Partial<ReleaseConfig> | null = null

  if (releaseType === 'large') {
    const version = incrementVersion(currentVersion, 'minor')
    result = {
      version,
      gitTag: gitTagFromVersion(version),
      distTag: 'latest',
      shouldCommit: true,
      requiredBranch: 'master',
    }
  }
  if (releaseType === 'tiny') {
    const version = incrementVersion(currentVersion, 'patch')
    result = {
      version,
      gitTag: gitTagFromVersion(version),
      distTag: 'latest',
      shouldCommit: true,
      requiredBranch: 'develop',
    }
  }
  if (releaseType === 'next') {
    const version = incrementVersion(currentVersion, 'patch')
    result = {
      version: `${version}-next-${commitHash}-${dateIsoShort}`,
      gitTag: undefined,
      distTag: 'next',
      shouldCommit: false,
      requiredBranch: 'develop',
    }
  }
  if (releaseType === 'experimental') {
    result = {
      version: `0.0.0-experimental-${commitHash}-${dateIsoShort}`,
      gitTag: undefined,
      distTag: 'experimental',
      shouldCommit: false,
      requiredBranch: undefined,
    }
  }

  result!.branch = currentBranchName
  result!.commit = commitHash
  result!.remote = remote

  return result! as ReleaseConfig
}

// Check if we have correct state to go for release
const runReleaseChecks = async (releaseConfig :ReleaseConfig, dryRun: boolean) => {
  const {
    branch,
    requiredBranch,
  } = releaseConfig

  try {
    await executeCommand('git diff-index --quiet HEAD --')
  } catch (e) {
    console.log(chalk.red('You have uncommited changes, please commit before attempting to release.'))
    return false
  }
  if (!dryRun && requiredBranch && branch !== requiredBranch) {
    console.log(chalk.red(`${branch} is incorrect for this flow, use ${requiredBranch} instead`))
    return false
  }
  return true
}

const runReleaseScript = async (releaseConfig: ReleaseConfig, dryRun: boolean) => {
  const {
    version,
    gitTag,
    distTag,
    branch,
    requiredBranch,
    shouldCommit,
    commit,
    remote,
  } = releaseConfig

  // **** Attempt building dist ****

  if (dryRun) {
    console.log(chalk.yellow('Skipping build because dry-run'))
  } else {
    // For test it's pain to wait for build as you can test build separately.
    await executeAndLog('cd ../ui && npm run build')
  }

  // **** Update version strings ****

  console.log(chalk.white(`Bumping version to ${version}`))
  bumpPackageJsonVersion('../../ui/package.json', version) // ui
  bumpVersionInGenerators(version) // vue-cli-plugin
  bumpGithubTemplateVersions(version) // root .github

  // **** Publishing on npm ****

  await executeAndLog(`cd ../ui && npm publish --tag=${distTag} --verbose${dryRun ? ' --dry-run' : ''}`)


  // **** Git updates ****

  console.log(chalk.white('Committing updates'))
  if (!dryRun) {
    if (shouldCommit) {
      await executeAndLog(`git commit -am "chore: bump version to ${gitTag}"`)
      // TODO: Maybe save remote name in .env or pass as arg.
      await executeAndLog(`git push ${remote}`)
    }
    if (gitTag) {
      await executeAndLog(`git tag ${gitTag}`)
      await executeAndLog(`git push ${remote} ${gitTag}`)
    }
  }
  // **** Cleanup ****

  await executeAndLog('git reset --hard HEAD')

  console.log(chalk.green('Released - 😎 GLORIOUS SUCCESS 😎'))
}

const simplePrompt = async <T> (question: DistinctQuestion<T>): Promise<T> => {
  const result = await inquirer.prompt({
    name: 'question',
    ...question,
  })
  // Inquirer typing is pure pain.
  return (result as unknown as { question: T }).question
}
const inquireReleaseType = async () => simplePrompt<ReleaseType>({
  type: 'list',
  message: 'Select build type',
  choices: ['experimental', 'next', 'tiny', 'large'],
  default: 'experimental',
})
const inquireDryRun = async () => simplePrompt<boolean>({
  type: 'confirm',
  default: false,
  message: 'Do you want a dry-run? (there won\'t be any non reversible changes)',
})
const checkIfTooLate = async (releaseType: ReleaseType) => {
  const result = await simplePrompt<boolean | undefined>({
    type: 'confirm',
    default: false,
    when: () => new Date().getHours() > 20 && ['large', 'tiny'].includes(releaseType),
    message: 'It\'s too late already, sure you\'re up for release at this time?',
  })
  if (result === undefined) {
    return true
  }
  return result
}
const enterRemoteName = async () => simplePrompt<string>({
  type: 'input',
  default: 'upstream',
  message: 'Enter remote name',
})
const confirmRelease = async () => simplePrompt<boolean>({
    type: 'confirm',
    default: false,
    message: 'Please check release details are correct. All good?',
  })

;(async () => {
  const releaseType = await inquireReleaseType()
  const dryRun = await inquireDryRun()
  const releaseConfig = await getReleaseConfig(releaseType)

  console.table(releaseConfig)

  if (!(
    await runReleaseChecks(releaseConfig, dryRun)
    && await confirmRelease()
    && await checkIfTooLate(releaseType)
  )) {
    return
  }
  await runReleaseScript(releaseConfig, dryRun)
})()
