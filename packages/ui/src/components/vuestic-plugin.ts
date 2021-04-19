import { App } from 'vue'
// @ts-ignore
// import { BusPlugin } from 'vue-epic-bus'

import VaAccordion from './vuestic-components/va-accordion'
import VaAffix from './vuestic-components/va-affix'
import VaAlert from './vuestic-components/va-alert'
import VaAppBar from './vuestic-components/va-app-bar'
import VaAvatar from './vuestic-components/va-avatar'
import VaBacktop from './vuestic-components/va-backtop'
import VaBadge from './vuestic-components/va-badge'
import VaButton from './vuestic-components/va-button'
import VaButtonDropdown from './vuestic-components/va-button-dropdown'
import VaButtonGroup from './vuestic-components/va-button-group'
import VaButtonToggle from './vuestic-components/va-button-toggle'
import VaBreadcrumbs, { VaBreadcrumbsItem } from './vuestic-components/va-breadcrumbs'
import VaCard, {
  VaCardContent,
  VaCardTitle,
} from './vuestic-components/va-card'
import VaCheckbox from './vuestic-components/va-checkbox'
import VaChip from './vuestic-components/va-chip'
import VaCollapse from './vuestic-components/va-collapse'
import VaColorIndicator from './vuestic-components/va-color-indicator'
import { VaColorPalette } from './vuestic-components/va-color-palette'
import VaColorInput from './vuestic-components/va-color-input'
import VaConfig from './vuestic-components/va-config'
import VaContent from './vuestic-components/va-content'
import VaDivider from './vuestic-components/va-divider'
import VaDatePicker from './vuestic-components/va-date-picker'
import VaDropdown from './vuestic-components/va-dropdown'
import VaFileUpload from './vuestic-components/va-file-upload'
import VaHover from './vuestic-components/va-hover'
import VaIcon from './vuestic-components/va-icon'
import VaImage from './vuestic-components/va-image'
import VaInnerLoading from './vuestic-components/va-inner-loading'
import VaInput, { VaInputWrapper } from './vuestic-components/va-input'
import VaList, {
  VaListItem,
  VaListItemLabel,
  VaListItemSection,
  VaListLabel,
  VaListSeparator,
} from './vuestic-components/va-list'
import VaMediumEditor from './vuestic-components/va-medium-editor'
import VaModal from './vuestic-components/va-modal'
import VaNavbar, { VaNavbarItem } from './vuestic-components/va-navbar'
import VaPagination from './vuestic-components/va-pagination'
import VaParallax from './vuestic-components/va-parallax'
import VaPopover from './vuestic-components/va-popover'
import {
  VaProgressBar,
  VaProgressCircle,
} from './vuestic-components/va-progress-bar'
import VaRadio from './vuestic-components/va-radio'
import VaRating from './vuestic-components/va-rating'
import VaScrollbar from './vuestic-components/va-scrollbar'
import VaSelect from './vuestic-components/va-select'
import VaSeparator from './vuestic-components/va-separator'
import VaSidebar, { VaSidebarItem, VaSidebarItemContent, VaSidebarItemTitle } from './vuestic-components/va-sidebar'
import VaSlider from './vuestic-components/va-slider'
import VaSwitch from './vuestic-components/va-switch'
import VaTabs, { VaTab } from './vuestic-components/va-tabs'
import VaTimeline, { VaTimelineItem } from './vuestic-components/va-timeline'
import VaTreeRoot, {
  VaTreeCategory,
  VaTreeNode,
} from './vuestic-components/va-tree-view'
import VaForm from './vuestic-components/va-form'
import VaOptionList from './vuestic-components/va-option-list'
import VaInfiniteScroll from './vuestic-components/va-infinite-scroll'

// Excluded from v2
// import VaColorSlider from './vuestic-components/va-color-slider/VaColorSlider.vue'
// import VaColorPicker from './vuestic-components/va-color-picker/VaColorPicker.vue'
// import VaColorInput from './vuestic-components/va-color-input/VaColorInput.vue'
// import VaColorInputAdvanced from './vuestic-components/va-color-input/VaColorInputAdvanced.vue'
// import VaColorPaletteAdvanced from './vuestic-components/va-color-palette/VaColorPaletteAdvanced.vue'
// import VaColorPalette from './vuestic-components/va-color-palette/VaColorPalette.vue'
// import VaDataTable from './vuestic-components/va-data-table/VaDataTable.vue'
// import VaPopup from './vuestic-components/va-popup/popup/VaPopup.vue'

import { installPlatform } from './vuestic-components/va-popup/install'
import DropdownPopperSubplugin
  from './vuestic-components/va-dropdown/dropdown-popover-subplugin'
// import { registerVuesticObject } from './resize-events'
import ToastInstall from './vuestic-components/va-toast/install'

import { GlobalConfig } from '../services/global-config/global-config'
import { GlobalConfigPlugin } from '../services/global-config/global-config-plugin'
import VaSpacer from './vuestic-components/va-spacer'

installPlatform()

// We need to have direct naming of components to avoid problems with component names being corrupted after the build is minified
const vuesticComponentsMap = new Map([
  ['VaAccordion', VaAccordion],
  ['VaAffix', VaAffix],
  ['VaAlert', VaAlert],
  ['VaAvatar', VaAvatar],
  ['VaAppBar', VaAppBar],
  ['VaBacktop', VaBacktop],
  ['VaBadge', VaBadge],
  ['VaButton', VaButton],
  ['VaButtonGroup', VaButtonGroup],
  ['VaButtonToggle', VaButtonToggle],
  ['VaBreadcrumbs', VaBreadcrumbs],
  ['VaBreadcrumbsItem', VaBreadcrumbsItem],
  ['VaCard', VaCard],
  ['VaCardContent', VaCardContent],
  ['VaCardTitle', VaCardTitle],
  ['VaCheckbox', VaCheckbox],
  ['VaChip', VaChip],
  ['VaCollapse', VaCollapse],
  ['VaColorPalette', VaColorPalette],
  ['VaColorIndicator', VaColorIndicator],
  ['VaColorInput', VaColorInput],
  ['VaConfig', VaConfig],
  ['VaContent', VaContent],
  ['VaDatePicker', VaDatePicker],
  ['VaDropdown', VaDropdown],
  ['VaFileUpload', VaFileUpload],
  ['VaHover', VaHover],
  ['VaIcon', VaIcon],
  ['VaImage', VaImage],
  ['VaInnerLoading', VaInnerLoading],
  ['VaInput', VaInput],
  ['VaInputWrapper', VaInputWrapper],
  ['VaList', VaList],
  ['VaListItem', VaListItem],
  ['VaListItemLabel', VaListItemLabel],
  ['VaListItemSection', VaListItemSection],
  ['VaListLabel', VaListLabel],
  ['VaListSeparator', VaListSeparator],
  ['VaMediumEditor', VaMediumEditor],
  ['VaModal', VaModal],
  ['VaNavbar', VaNavbar],
  ['VaNavbarItem', VaNavbarItem],
  ['VaPagination', VaPagination],
  ['VaParallax', VaParallax],
  ['VaPopover', VaPopover],
  ['VaProgressBar', VaProgressBar],
  ['VaProgressCircle', VaProgressCircle],
  ['VaRadio', VaRadio],
  ['VaRating', VaRating],
  ['VaScrollbar', VaScrollbar],
  ['VaSelect', VaSelect],
  ['VaSeparator', VaSeparator],
  ['VaSidebar', VaSidebar],
  ['VaSidebarItem', VaSidebarItem],
  ['VaSidebarItemContent', VaSidebarItemContent],
  ['VaSidebarItemTitle', VaSidebarItemTitle],
  ['VaSlider', VaSlider],
  ['VaSpacer', VaSpacer],
  ['VaSwitch', VaSwitch],
  ['VaTab', VaTab],
  ['VaTabs', VaTabs],
  ['VaTimeline', VaTimeline],
  ['VaTimelineItem', VaTimelineItem],
  ['VaTreeCategory', VaTreeCategory],
  ['VaTreeNode', VaTreeNode],
  ['VaTreeRoot', VaTreeRoot],
  ['VaButtonDropdown', VaButtonDropdown],
  ['VaForm', VaForm],
  ['VaDivider', VaDivider],
  ['VaOptionList', VaOptionList],
  ['VaInfiniteScroll', VaInfiniteScroll],
  // ['VaDataTable', VaDataTable],
  // ['VaPopup', VaPopup],
  // ['VaColorPalette', VaColorPalette],
  // ['VaColorPicker', VaColorPicker],
  // ['VaColorSlider', VaColorSlider],
  // ['VaColorInput', VaColorInput],
  // ['VaColorInputAdvanced', VaColorInputAdvanced],
  // ['VaColorPaletteAdvanced', VaColorPaletteAdvanced],
])

export const VuesticPlugin = {
  install (app: App, vuesticConfig: GlobalConfig): void {
    for (const [name, component] of vuesticComponentsMap) {
      app.component(name, component)
    }
    // registerVuesticObject(app)

    // app.use(BusPlugin)

    app.use(DropdownPopperSubplugin)

    app.use(ToastInstall)

    app.use(GlobalConfigPlugin, vuesticConfig)
  },
}
