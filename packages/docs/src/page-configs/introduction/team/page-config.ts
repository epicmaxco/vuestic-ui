import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { TeamItem } from './types'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('team.title'),
  block.paragraph('team.description'),
  block.subtitle('team.coreTeam'),
  block.paragraph('team.coreTeamDescription'),
  block.component('team', {
    bind: {
      team: [
        {
          name: 'Andrey Hrabouski',
          jobTitle: 'CEO',
          image: require('../team/images/andrei.jpg'),
          socNetworks: [
            {
              name: 'fa fa-github',
              url: 'https://github.com/smartapant',
            },
            {
              name: 'fa fa-twitter',
              url: 'https://twitter.com/Epicmaxco',
            },
            {
              name: 'fa fa-facebook',
              url: 'https://www.facebook.com/profile.php?id=100007598655934',
            },
          ],
        },
        {
          name: 'Yauheni Prakopchyk',
          jobTitle: 'CTO - Vuestic core',
          image: require('../team/images/jenia.jpg'),
          socNetworks: [
            {
              name: 'fa fa-github',
              url: 'https://github.com/asvae',
            },
            {
              name: 'fa fa-twitter',
              url: 'https://twitter.com/asvaee',
            },
            {
              name: 'fa fa-facebook',
              url: 'https://www.facebook.com/yauheni.prakopchyk',
            },
          ],
        },
        {
          name: 'Maksim Nedoshev',
          jobTitle: 'Developer - Vuestic core',
          image: require('../team/images/maxim.jpg'),
          socNetworks: [
            {
              name: 'fa fa-github',
              url: 'https://github.com/m0ksem',
            },
          ],
        },
        {
          name: 'Vitaly Raichev',
          jobTitle: 'Developer - Vuestic UI',
          image: require('../team/images/vitalik.jpg'),
          socNetworks: [
            {
              name: 'fa fa-github',
              url: 'https://github.com/RVitaly1978',
            },
          ],
        },
        {
          name: 'Oleg Kirillov',
          jobTitle: 'Developer - Vuestic UI',
          image: require('../team/images/oleg.jpg'),
          socNetworks: [
            {
              name: 'fa fa-github',
              url: 'https://github.com/aluarius',
            },
          ],
        },
        {
          name: 'Rustem Nasyrov',
          jobTitle: 'Developer - Vuestic UI',
          image: require('../team/images/rustem.jpg'),
          socNetworks: [
            {
              name: 'fa fa-github',
              url: 'https://github.com/rustem-nasyrov',
            },
          ],
        },
        {
          name: 'Anton Shapovalov',
          jobTitle: 'Developer - Vuestic UI',
          image: require('../team/images/anton.jpg'),
          socNetworks: [
            {
              name: 'fa fa-github',
              url: 'https://github.com/Azgiliat',
            },
          ],
        },
      ],
    } as {
      team: TeamItem[]
    },
  }),
  block.component('team-banner'),
  block.subtitle('team.specialThanks'),
  block.paragraph('team.specialThanksDescription'),
]

export default config
