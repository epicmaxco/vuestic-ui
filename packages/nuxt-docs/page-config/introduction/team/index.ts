import { TeamItem } from './types'

// TODO: Not sure why Nuxt can not resolve image from dynamic module

import AndreiImage from './images/andrei.jpg'
import YauheniImage from './images/jenia.jpg'
import MaksimImage from './images/maksim.jpg'
import VitalyImage from './images/vitalik.jpg'
import OlegImage from './images/oleg.jpg'
import RustemImage from './images/rustem.jpg'
import AntonImage from './images/anton.jpg'


export default definePageConfig({
  blocks: [
    block.title('team.title'),
    block.paragraph('team.description'),
    block.subtitle('team.coreTeam'),
    block.paragraph('team.coreTeamDescription'),
    block.component('team', {
      team: [
        {
          name: 'Andrey Hrabouski',
          jobTitle: 'CEO',
          image: AndreiImage,
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
              name: 'fa fa-discord',
              url: 'https://discordapp.com/users/344501320117387265',
            },
          ],
        },
        {
          name: 'Yauheni Prakopchyk',
          jobTitle: 'CTO - Vuestic core',
          image: YauheniImage,
          socNetworks: [
            {
              name: 'fa fa-github',
              url: 'https://github.com/asvae',
            },
            {
              name: 'fa fa-discord',
              url: 'https://discordapp.com/users/212184431610298369',
            },
          ],
        },
        {
          name: 'Maksim Nedoshev',
          jobTitle: 'Developer - Vuestic core',
          image: MaksimImage,
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
          image: VitalyImage,
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
          image: OlegImage,
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
          image: RustemImage,
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
          image: AntonImage,
          socNetworks: [
            {
              name: 'fa fa-github',
              url: 'https://github.com/Azgiliat',
            },
          ],
        },
      ] satisfies TeamItem[],
    }),
    block.component('team-banner'),
    block.subtitle('team.specialThanks'),
    block.paragraph('team.specialThanksDescription'),
  ]
})
