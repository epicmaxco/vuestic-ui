import { DocsHelper } from '../../../../../helpers/DocsHelper'

const prefix = (text: string) => `iconsConfig.problem.${text}`

export const config = [
  // Problem
  DocsHelper.paragraph(prefix('definition')),
  DocsHelper.paragraph(prefix('materialIcons')),
  DocsHelper.code(`
      <span class="material-icons">
        star
      </span>
    `),
  DocsHelper.paragraph(prefix('fontAwesome')),
  DocsHelper.code(`
    <i class="fas fa-star"></i>
  `),
  DocsHelper.paragraph(prefix('summary')),
]
