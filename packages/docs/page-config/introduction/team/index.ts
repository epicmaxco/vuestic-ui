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
    block.title('Meet the Team'),
    block.paragraph('Hi there, we are really pleased to meet you too!\n\nVuestic started as a small admin template back in 2017. It was released on GitHub and was warmly embraced by the Vue.js community. Since then we’ve been contributing to Vuestic daily and today it’s grown into a full-fledged framework with a decent ecosystem around it.\n\nThe team behind Vuestic is in ❤️ with Vue.js and Open Source. We’re doing our best to make developers’ lives easier and  joyful.'),
    block.subtitle('Core Team 🤓'),
    block.paragraph('Established in 2017, [Epicmax](https://epicmax.co/)[[target=_blank]] is a Vue.js development company with over 55 successfully completed projects for it’s clients all over the world.\n\nThe company is committed to Open Source from its beginning. Vuestic was created and backed by Epicmax, and is supported through all the years. You can request a consultation or order web development services by Epicmax via this [form](https://epicmax.co/contacts)[[target=_blank]]\n\nAnd now, please meet the core contributors 🎉'),
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
    block.subtitle('Special Thanks 🙌'),
    block.paragraph('We’d like to thank all contributors and users of Vuestic. Your constant assistance, insights and feedback not only help Vuestic to get a better ecosystem, but also charges the core team with energy and enthusiasm to go an extra mile. With you everything is possible.'),
  ]
})
