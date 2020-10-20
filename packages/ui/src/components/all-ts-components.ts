// Temporary file.
// Rollup doesn't like mixing <script> and <scrip lang="ts"> components for some reason.
// So this list is for subset of components that use only TS internally.
// Intention is to gradually move all components here.
// At current state it allows to test/tweak build process.

import VaAffix from './vuestic-components/va-affix/VaAffix.vue'
import VaAlert from './vuestic-components/va-alert/VaAlert.vue'
import VaAvatar from './vuestic-components/va-avatar/VaAvatar.vue'
import VaBacktop from './vuestic-components/va-backtop/VaBacktop.vue'
import VaBadge from './vuestic-components/va-badge/VaBadge.vue'
import VaBreadcrumbs from './vuestic-components/va-breadcrumbs/VaBreadcrumbs.vue'
import VaBreadcrumbsItem from './vuestic-components/va-breadcrumbs/VaBreadcrumbsItem.vue'
import VaButton from './vuestic-components/va-button/VaButton.vue'
import VaButtonDropdown from './vuestic-components/va-button-dropdown/VaButtonDropdown.vue'
import VaButtonGroup from './vuestic-components/va-button-group/VaButtonGroup.vue'
import VaButtonToggle from './vuestic-components/va-button-toggle/VaButtonToggle.vue'
import VaCard from './vuestic-components/va-card/VaCard.vue'
import VaCardContent from './vuestic-components/va-card/VaCardContent.vue'
import VaCardTitle from './vuestic-components/va-card/VaCardTitle.vue'
import VaSeparator from './vuestic-components/va-card/VaSeparator.vue'
import VaCheckbox from './vuestic-components/va-checkbox/VaCheckbox.vue'
import VaAdvancedColorPicker from './vuestic-components/va-color-picker/VaAdvancedColorPicker.vue'
import VaColorInput from './vuestic-components/va-color-picker/VaColorInput.vue'
import VaColorPickerInput from './vuestic-components/va-color-picker/VaColorPickerInput.vue'
import VaColorSquare from './vuestic-components/va-color-picker/VaColorSquare.vue'
import VaPaletteCustom from './vuestic-components/va-color-picker/VaPaletteCustom.vue'
import VaSimplePalettePicker from './vuestic-components/va-color-picker/VaSimplePalettePicker.vue'
import VaSliderColorPicker from './vuestic-components/va-color-picker/VaSliderColorPicker.vue'
import VaContent from './vuestic-components/va-content/VaContent.vue'
// import VaDataTable from './vuestic-components/va-data-table/VaDataTable.vue'
// import VaDatePicker from './vuestic-components/va-date-picker/VaDatePicker.vue'
import VaDivider from './vuestic-components/va-divider/VaDivider.vue'
import VaDropdown from './vuestic-components/va-dropdown/VaDropdown.vue'
import VaExpand from './vuestic-components/va-expand/VaExpand.vue'
import VaExpandGroup from './vuestic-components/va-expand-group/VaExpandGroup.vue'
import VaForm from './vuestic-components/va-form/VaForm.vue'
import VaHover from './vuestic-components/va-hover/VaHover.vue'
import VaIcon from './vuestic-components/va-icon/VaIcon.vue'
import VaImage from './vuestic-components/va-image/VaImage.vue'
import VaInfiniteScroll from './vuestic-components/va-infinite-scroll/VaInfiniteScroll.vue'
import VaInnerLoading from './vuestic-components/va-inner-loading/VaInnerLoading.vue'
import VaInput from './vuestic-components/va-input/VaInput.vue'
import VaList from './vuestic-components/va-list/VaList.vue'
import VaListItem from './vuestic-components/va-list/VaListItem.vue'
import VaListItemLabel from './vuestic-components/va-list/VaListItemLabel.vue'
import VaListItemSection from './vuestic-components/va-list/VaListItemSection.vue'
import VaListLabel from './vuestic-components/va-list/VaListLabel.vue'
import VaListSeparator from './vuestic-components/va-list/VaListSeparator.vue'
import VaModal from './vuestic-components/va-modal/VaModal.vue'
import VaOptionList from './vuestic-components/va-option-list/VaOptionList.vue'
import VaPagination from './vuestic-components/va-pagination/VaPagination.vue'
import VaParallax from './vuestic-components/va-parallax/VaParallax.vue'
import VaProgressBar from './vuestic-components/va-progress-bar/progress-types/VaProgressBar.vue'
import VaProgressCircle from './vuestic-components/va-progress-bar/progress-types/VaProgressCircle.vue'
import VaRadio from './vuestic-components/va-radio/VaRadio.vue'
import VaRating from './vuestic-components/va-rating/VaRating.vue'
import VaRatingItem from './vuestic-components/va-rating/VaRatingItem.vue'
import VaSelect from './vuestic-components/va-select/VaSelect.vue'
import VaSelectOptionList from './vuestic-components/va-select/VaSelectOptionList.vue'
import VaSidebar from './vuestic-components/va-sidebar/VaSidebar.vue'
import VaSlider from './vuestic-components/va-slider/VaSlider.vue'
import VaSpacer from './vuestic-components/va-spacer/VaSpacer.vue'
import VaSwitch from './vuestic-components/va-switch/VaSwitch.vue'
import VaTab from './vuestic-components/va-tabs/VaTab.vue'
import VaTabs from './vuestic-components/va-tabs/VaTabs.vue'
import VaTabsContent from './vuestic-components/va-tabs/VaTabsContent.vue'
import VaTabsItems from './vuestic-components/va-tabs/VaTabsItems.vue'
import VaTag from './vuestic-components/va-tag/VaTag.vue'
import VaToast from './vuestic-components/va-toast/VaToast.vue'

import { VueConstructor } from 'vue'

export const allComponents = [
  VaAffix,
  VaAlert,
  VaAvatar,
  VaBacktop,
  VaBadge,
  VaBreadcrumbs,
  VaBreadcrumbsItem,
  VaButton,
  VaButtonDropdown,
  VaButtonGroup,
  VaButtonToggle,
  VaCard,
  VaCardContent,
  VaCardTitle,
  VaSeparator,
  VaCheckbox,
  VaAdvancedColorPicker,
  VaColorInput,
  VaColorPickerInput,
  VaColorSquare,
  VaPaletteCustom,
  VaSimplePalettePicker,
  VaSliderColorPicker,
  VaContent,
  // VaDataTable,
  // VaDatePicker,
  VaDivider,
  VaDropdown,
  VaExpand,
  VaExpandGroup,
  VaForm,
  VaHover,
  VaIcon,
  VaImage,
  VaInfiniteScroll,
  VaInnerLoading,
  VaInput,
  VaList,
  VaListItem,
  VaListItemLabel,
  VaListItemSection,
  VaListLabel,
  VaListSeparator,
  VaModal,
  VaOptionList,
  VaPagination,
  VaParallax,
  VaProgressBar,
  VaProgressCircle,
  VaRadio,
  VaRating,
  VaRatingItem,
  VaSelect,
  VaSelectOptionList,
  VaSidebar,
  VaSlider,
  VaSpacer,
  VaSwitch,
  VaTab,
  VaTabs,
  VaTabsContent,
  VaTabsItems,
  VaTag,
  VaToast,
] as (VueConstructor & {name: string})[]
