import {
  bumpPackageJsonVersion,
  executeAndLog,
  getPackageJsonVersion,
  bumpGithubTemplateVersions,
  bumpVersionInGenerators,
  executeCommand, getCommitHash,
} from '../build/utils'

import yargs from 'yargs/yargs'
import semver from 'semver'

const { hideBin } = require('yargs/helpers')

export type ReleaseType = 'monthly' | 'weekly' | 'next' | 'experimental'

export type ReleaseConfig = {
  version: string, // 1.2.3
  distTag: 'latest' | 'next' | 'experimental',
  gitTag: string, // v1.2.3
  branch: string, // 'develop'
  requiredBranch: string // 'develop'
  commit: string, // '12345678'
  shouldCommit: boolean,
}

const argv: {
  releaseType: ReleaseType,
  semverReleaseType: string,
  dryRun: boolean
} = yargs(hideBin(process.argv))
  .option('releaseType', {
    description: 'Internal release type',
    choices: ['monthly', 'weekly', 'next', 'experimental'],
    default: 'alpha',
  })
  .option('dryRun', {
    type: 'boolean',
    description: 'Run without uploading anywhere',
    default: false,
  })
  .argv

const getReleaseConfig = async (releaseType: ReleaseType): Promise<ReleaseConfig> => {
  const currentBranchName = await executeCommand('git rev-parse --abbrev-ref HEAD')
  // 20220602
  const dateIsoShort = new Date().toISOString().split('T')[0].replaceAll('-', '')
  // 12a4dd78
  const commitHash = await getCommitHash()
  // 1.2.3
  const currentVersion = getPackageJsonVersion()
  // v1.2.3
  const gitTag = `v${currentVersion}`

  let result = null

  if (releaseType === 'monthly') {
    result = {
      version: semver.inc(currentVersion, 'minor'),
      gitTag,
      distTag: 'latest',
      shouldCommit: true,
      requiredBranch: 'master',
    }
  }
  if (releaseType === 'weekly') {
    result = {
      version: semver.inc(currentVersion, 'minor'),
      gitTag,
      distTag: 'latest',
      shouldCommit: true,
      requiredBranch: 'develop',
    }
  }
  if (releaseType === 'next') {
    result = {
      version: `${semver.inc(currentVersion, 'patch')}-next-${commitHash}-${dateIsoShort}`,
      gitTag: null,
      distTag: 'next',
      shouldCommit: false,
      requiredBranch: 'develop',
    }
  }
  if (releaseType === 'experimental') {
    result = {
      version: `${semver.inc(currentVersion, 'patch')}-experimental-${commitHash}-${dateIsoShort}`,
      gitTag: null,
      distTag: 'experimental',
      shouldCommit: false,
      requiredBranch: null,
    }
  }

  result.branch = currentBranchName
  result.commit = commitHash

  return result
}

;(async () => {
  const { dryRun, releaseType } = argv

  const releaseConfig = await getReleaseConfig(releaseType)

  const {
    version,
    gitTag,
    distTag,
    branch,
    requiredBranch,
    shouldCommit,
    commit,
  } = releaseConfig

  console.table({
    version,
    gitTag,
    distTag,
    branch,
    requiredBranch,
    commit,
    shouldCommit,
  })

  // **** Check if we have correct state to go for release ****

  try {
    await executeCommand('git diff-index --quiet HEAD --')
  } catch (e) {
    console.error('You have uncommited changes, please commit them before continuing.')
    process.exit()
  }
  if (!dryRun && requiredBranch && branch !== requiredBranch) {
    console.error(`${branch} is incorrect for this flow, use ${requiredBranch} instead`)
    process.exit()
  }

  // **** Update version strings ****

  console.log(`Bumping version to ${version}`)
  bumpPackageJsonVersion('../package.json', version) // ui
  bumpVersionInGenerators(version) // vue-cli-plugin
  bumpGithubTemplateVersions(version) // root .github

  // **** Git updates ****

  console.log('Committing updates')

  if (!dryRun) {
    if (shouldCommit) {
      await executeAndLog(`git commit -am "chore: bump version to ${gitTag}"`)
      await executeAndLog('git push vuestic-ui ')
    }
    if (gitTag) {
      await executeAndLog(`git tag ${gitTag}`)
      await executeAndLog(`git push vuestic-ui ${gitTag}`)
    }
  }

  // **** Dealing with dist ****

  if (dryRun) {
    console.log('Skipping build because dry-run')
  } else {
    // For test it's pain to wait for build as you can test build separately.
    await executeAndLog('npm run build')
  }

  await executeAndLog(`npm publish --tag=${distTag}${dryRun ? ' --dry-run' : ''}`)

  // **** Cleanup ****

  await executeAndLog('git reset --hard HEAD')

  console.log('Released - GLORIOUS SUCCESS')
})()
