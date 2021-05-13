export const aliasCodeExample = `
const aliases = [
  {
    name: 'close',
    to: 'fa4-times',
  },
  {
    name: 'twitter',
    to: 'fa4-twitter',
    color: '#1da1f2', // Twitter blue brand color
  },
  {
    name: 'vuestic-logo',
    component: VuesticLogoSVGComponent,
    color: '#62e471', // Vuestic green brand color
  },
  {
    name: 'english',
    to: 'flag-gb-small'
  }
]
`

export const aliasesTransformationsExample = `
from  <va-icon name="close" />
alias { name: 'fa4-times' }
to    <i class="fa fa-twitter" style="color: '#e0e0e0';"></i>


from  <va-icon name="twitter" />
alias { name: 'fa4-twitter', color: '#1da1f2' }
to    <i class="fa fa-twitter" style="color: '#1da1f2';"></i>

from  <va-icon name="twitter" color="#eee"/>
alias { name: 'fa4-twitter', color:'#1da1f2', color: '#eee' }
to    <i class="fa fa-twitter" style="color: '#eee';"></i>

from  <va-icon name="vuestic-logo" />
to    <VuesticLogoSVGComponent style="color: '#62e471';" />

from  <va-icon name="english" />
alias { name: "flag-gb-small" }
to    <span class="flag-icon flag-icon-gb flag-icon-small"></span>
`
