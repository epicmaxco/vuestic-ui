import { App } from 'vue'

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
// import VaDatePicker from './vuestic-components/wip-va-date-picker'
import VaDropdown, { VaDropdownContent } from './vuestic-components/va-dropdown'
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

import ColorHelpersPlugin from '../services/color-config/color-css-variables-updater'
import { GlobalConfig } from '../services/global-config/global-config'
import { GlobalConfigPlugin } from '../services/global-config/global-config-plugin'
import VaSpacer from './vuestic-components/va-spacer'

installPlatform()

// Used object because we want string name (this way it's not getting obfuscated on build).
const vuesticComponentMap = {
  VaAccordion,
  VaAffix,
  VaAlert,
  VaAvatar,
  VaAppBar,
  VaBacktop,
  VaBadge,
  VaButton,
  VaButtonGroup,
  VaButtonToggle,
  VaBreadcrumbs,
  VaBreadcrumbsItem,
  VaCard,
  VaCardContent,
  VaCardTitle,
  VaCheckbox,
  VaChip,
  VaCollapse,
  VaColorPalette,
  VaColorIndicator,
  VaColorInput,
  VaConfig,
  VaContent,
  // VaDatePicker,
  VaDropdown,
  VaDropdownContent,
  VaFileUpload,
  VaHover,
  VaIcon,
  VaImage,
  VaInnerLoading,
  VaInput,
  VaInputWrapper,
  VaList,
  VaListItem,
  VaListItemLabel,
  VaListItemSection,
  VaListLabel,
  VaListSeparator,
  VaModal,
  VaNavbar,
  VaNavbarItem,
  VaPagination,
  VaParallax,
  VaPopover,
  VaProgressBar,
  VaProgressCircle,
  VaRadio,
  VaRating,
  VaScrollbar,
  VaSelect,
  VaSeparator,
  VaSidebar,
  VaSidebarItem,
  VaSidebarItemContent,
  VaSidebarItemTitle,
  VaSlider,
  VaSpacer,
  VaSwitch,
  VaTab,
  VaTabs,
  VaTimeline,
  VaTimelineItem,
  VaTreeCategory,
  VaTreeNode,
  VaTreeRoot,
  VaButtonDropdown,
  VaForm,
  VaDivider,
  VaOptionList,
  VaInfiniteScroll,
  // VaDataTable,
  // VaPopup,
  // VaColorPalette,
  // VaColorPicker,
  // VaColorSlider,
  // VaColorInput,
  // VaColorInputAdvanced,
  // VaColorPaletteAdvanced,
}

export const VuesticPlugin = {
  install (app: App, vuesticConfig: GlobalConfig): void {
    Object.entries(vuesticComponentMap).forEach(([name, component]) => {
      app.component(name, component)
    })

    app.use(DropdownPopperSubplugin)

    app.use(ToastInstall)

    app.use(GlobalConfigPlugin, vuesticConfig)

    app.use(ColorHelpersPlugin)
  },
}
