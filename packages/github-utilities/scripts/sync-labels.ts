import fetch from 'node-fetch'
import inquirer from 'inquirer'
import dotenv from 'dotenv'
import { Label, PartialLabel } from './github-types'
import chalk from 'chalk'
import {
  testTokenPermission,
  getLabels,
  createLabel,
  updateLabel, deleteLabel,
} from './github-api'

dotenv.config()

// Main function
const main = async () => {
  const questions = [
    {
      type: 'input',
      name: 'repoFrom',
      message: 'Source owner/repo:',
      default: process.env.GITHUB_LABEL_SOURCE,
    },
    {
      type: 'input',
      name: 'repoTo',
      message: 'Target owner/repo:',
      default: process.env.GITHUB_LABEL_TARGET,
    },
    {
      type: 'input',
      name: 'token',
      message: 'Github token',
      default: process.env.GITHUB_TOKEN,
    },
  ]

  const { repoFrom, repoTo, token } = await inquirer.prompt(questions)

  const isTokenValid = await testTokenPermission(token, repoTo)
  if (!isTokenValid) {
    return
  }

  console.info(`Syncing labels ${repoFrom} to ${repoTo}`)

  const labelsFrom = await getLabels(repoFrom, token)
  const labelsTo = await getLabels(repoTo, token)

  const onlySource = []
  const detailsDiffer = []
  const onlyTarget = []

  labelsFrom.forEach(labelFrom => {
    const labelTo = labelsTo.find(labelTo => labelTo.name === labelFrom.name)
    // Label missing
    if (!labelTo) {
      onlySource.push(labelFrom)
      return
    }
    // Details differ
    if (labelTo.description !== labelFrom.description || labelTo.color !== labelFrom.color) {
      detailsDiffer.push(labelFrom)
    }
  })
  labelsTo.forEach(labelTo => {
    const labelFrom = labelsFrom.find(labelFrom => labelFrom.name === labelTo.name)
    if (!labelFrom) {
      onlyTarget.push(labelTo)
      return
    }
  })

  const formatLabels = (labels: Label[]) => labels.map(label => label.name).join(', ')

  console.info(chalk.bold.whiteBright(`Only source labels (${onlySource.length})`) + `: ${formatLabels(onlySource)}`)
  console.info(chalk.bold.whiteBright(`Different details (${detailsDiffer.length})`) + `: ${formatLabels(detailsDiffer)}`)
  console.info(chalk.bold.whiteBright(`Only target labels (${onlyTarget.length})`) + `: ${formatLabels(onlyTarget)}`)

  // We want to ask to create labels that are missing in target repo.
  const { newLabels } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'newLabels',
    message: 'New labels',
    choices: onlySource.map(l => l.name),
    pageSize: 10,
  }])
  if (newLabels.length) {
    for (const labelName of newLabels) {
      const label = onlySource.find(l => l.name === labelName)
      const partialLabel: PartialLabel = {
        name: label.name,
        color: label.color,
        description: label.description,
      };
      await createLabel(repoTo, partialLabel, token);
      console.info(chalk.bold.whiteBright(`Label created - ${label.name + ': ' + label.description}`))
    }
  }

  // We want to ask for update on labels, where color or descriptions are different.
  const { differentLabels } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'differentLabels',
    message: 'Labels to sync',
    choices: detailsDiffer.map(l => l.name),
    pageSize: 10,
  }])
  if (differentLabels.length) {
    for (const labelName of differentLabels) {
      const label = detailsDiffer.find(l => l.name === labelName)
      const partialLabel: PartialLabel = {
        name: label.name,
        color: label.color,
        description: label.description,
      };
      await updateLabel(repoTo, partialLabel, token);
      console.info(chalk.bold.whiteBright(`Label updated - ${label.name + ': ' + label.description}`))
    }
  }

  // We want to ask to delete labels, that are only present in target repo.
  const { deleteLabels } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'deleteLabels',
    message: 'Labels to delete',
    choices: onlyTarget.map(l => l.name),
    pageSize: 10,
  }])

  if (deleteLabels.length) {
    for (const labelName of deleteLabels) {
      await deleteLabel(repoTo, labelName, token);
      console.info(chalk.bold.whiteBright(`Label removed - ${labelName}`))
    }
  }
}

main()
