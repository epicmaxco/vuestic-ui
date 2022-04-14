import { $root } from 'vuestic-ui/src/components/va-timeline/VaTimelineItem/VaTimelineItem.vue'

export const aliasCodeExample = `
const aliases = [
  {
    name: 'close',
    to: 'fa4-times',
  },
  {
    name: 'twitter',
    to: 'fa4-twitter',
    color: '#1da1f2', // {{ $t('all.code.aliasAndFontExample.twitterColor') }}
  },
  {
    name: 'vuestic-logo',
    component: VuesticLogoSVGComponent,
    color: '#62e471', // {{ $t('all.code.aliasAndFontExample.vuesticColor') }}
  },
  {
    name: 'english',
    to: 'flag-gb-small'
  }
]
`

export const aliasesTransformationsExample = `
{{ $t('all.code.aliasAndFontExample.from') }}  <va-icon name="close" />
{{ $t('all.code.aliasAndFontExample.alias') }} { name: 'close', to: 'fa4-times' }
{{ $t('all.code.aliasAndFontExample.font') }}  { name: 'fa4-{code}', resolve: ..., color: '#e0e0e0' }
{{ $t('all.code.aliasAndFontExample.to') }}    <i class="fa fa-times" style="color: #e0e0e0;"></i>

{{ $t('all.code.aliasAndFontExample.from') }}  <va-icon name="twitter" />
{{ $t('all.code.aliasAndFontExample.alias') }} { name: 'twitter', to: 'fa4-twitter', color: '#1da1f2' }
{{ $t('all.code.aliasAndFontExample.font') }}  { name: 'fa4-{code}', resolve: ..., color: '#e0e0e0' }
{{ $t('all.code.aliasAndFontExample.to') }}    <i class="fa fa-twitter" style="color: '#1da1f2';"></i>

{{ $t('all.code.aliasAndFontExample.from') }}  <va-icon name="twitter" color="#eee" />
{{ $t('all.code.aliasAndFontExample.alias') }} { name: 'twitter', to: 'fa4-twitter', color: '#1da1f2' }
{{ $t('all.code.aliasAndFontExample.font') }}  { name: 'fa4-{code}', resolve: ..., color: '#e0e0e0' }
{{ $t('all.code.aliasAndFontExample.to') }}    <i class="fa fa-twitter" style="color: '#eee';"></i>

{{ $t('all.code.aliasAndFontExample.from') }}  <va-icon name="vuestic-logo" />
{{ $t('all.code.aliasAndFontExample.alias') }} { name: 'vuestic-logo', component: VuesticLogoSVGComponent, color: '#62e471' }
{{ $t('all.code.aliasAndFontExample.to') }}    <VuesticLogoSVGComponent style="color: '#62e471';" />

{{ $t('all.code.aliasAndFontExample.from') }}  <va-icon name="english" />
{{ $t('all.code.aliasAndFontExample.alias') }} { name: 'english', to: "flag-gb-small" }
{{ $t('all.code.aliasAndFontExample.font') }}  { name: 'flag-{code}-{size}', resolve: ..., tag: 'span' }
{{ $t('all.code.aliasAndFontExample.to') }}    <span class="flag-icon flag-icon-gb flag-icon-small"></span>
`
