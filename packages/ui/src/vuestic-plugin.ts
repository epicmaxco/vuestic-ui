import { App } from 'vue'

import VaAccordion from './components/va-accordion'
import VaAffix from './components/va-affix'
import VaAlert from './components/va-alert'
import VaAppBar from './components/va-app-bar'
import VaAvatar from './components/va-avatar'
import VaBacktop from './components/va-backtop'
import VaBadge from './components/va-badge'
import VaButton from './components/va-button'
import VaButtonDropdown from './components/va-button-dropdown'
import VaButtonGroup from './components/va-button-group'
import VaButtonToggle from './components/va-button-toggle'
import VaBreadcrumbs, { VaBreadcrumbsItem } from './components/va-breadcrumbs'
import VaCard, {
  VaCardContent,
  VaCardTitle,
} from './components/va-card'
import VaCheckbox from './components/va-checkbox'
import VaChip from './components/va-chip'
import VaCollapse from './components/va-collapse'
import VaColorIndicator from './components/va-color-indicator'
import { VaColorPalette } from './components/va-color-palette'
import VaColorInput from './components/va-color-input'
import VaConfig from './components/va-config'
import VaContent from './components/va-content'
import VaDivider from './components/va-divider'
import { VaDatePicker } from './vuestic-components/va-date-picker'
import { VaDateInput } from './vuestic-components/va-date-input'
import VaDropdown, { VaDropdownContent } from './components/va-dropdown'
import VaFileUpload from './components/va-file-upload'
import VaHover from './components/va-hover'
import VaIcon from './components/va-icon'
import VaImage from './components/va-image'
import VaInnerLoading from './components/va-inner-loading'
import VaInput, { VaInputWrapper } from './components/va-input'
import VaList, {
  VaListItem,
  VaListItemLabel,
  VaListItemSection,
  VaListLabel,
  VaListSeparator,
} from './components/va-list'
import VaModal from './components/va-modal'
import VaNavbar, { VaNavbarItem } from './components/va-navbar'
import VaPagination from './components/va-pagination'
import VaParallax from './components/va-parallax'
import VaPopover from './components/va-popover'
import {
  VaProgressBar,
  VaProgressCircle,
} from './components/va-progress-bar'
import VaRadio from './components/va-radio'
import VaRating from './components/va-rating'
import VaScrollbar from './components/va-scrollbar'
import VaSelect from './components/va-select'
import VaSeparator from './components/va-separator'
import VaSidebar, { VaSidebarItem, VaSidebarItemContent, VaSidebarItemTitle } from './components/va-sidebar'
import VaSlider from './components/va-slider'
import VaSwitch from './components/va-switch'
import VaTabs, { VaTab } from './components/va-tabs'
import VaTimeline, { VaTimelineItem } from './components/va-timeline'
import VaTreeRoot, {
  VaTreeCategory,
  VaTreeNode,
} from './components/va-tree-view'
import VaForm from './components/va-form'
import VaOptionList from './components/va-option-list'
import VaInfiniteScroll from './components/va-infinite-scroll'

// Excluded from v2
// import VaColorSlider from './vuestic-components/va-color-slider/VaColorSlider.vue'
// import VaColorPicker from './vuestic-components/va-color-picker/VaColorPicker.vue'
// import VaColorInput from './vuestic-components/va-color-input/VaColorInput.vue'
// import VaColorInputAdvanced from './vuestic-components/va-color-input/VaColorInputAdvanced.vue'
// import VaColorPaletteAdvanced from './vuestic-components/va-color-palette/VaColorPaletteAdvanced.vue'
// import VaColorPalette from './vuestic-components/va-color-palette/VaColorPalette.vue'
// import VaDataTable from './vuestic-components/va-data-table/VaDataTable.vue'
// import VaPopup from './vuestic-components/va-popup/popup/VaPopup.vue'

import { installPlatform } from './components/va-popup/install'
import DropdownPopperSubplugin
  from './components/va-dropdown/dropdown-popover-subplugin'
// import { registerVuesticObject } from './resize-events'
import ToastInstall from './components/va-toast/install'

import ColorHelpersPlugin from './services/color-config/color-css-variables-updater'
import { GlobalConfig } from './services/global-config/global-config'
import { GlobalConfigPlugin } from './services/global-config/global-config-plugin'
import VaSpacer from './components/va-spacer'

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
  VaDatePicker,
  VaDateInput,
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
