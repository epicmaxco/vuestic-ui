import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "Model of the component. Must be Array if using 'multiple' prop",
    clearValue: "Sets value that should be set after clearing",
    options: "Available options that the user can select from",
    disabledBy: "Specify the key in the object to be used as item `disabled` prop. Can be string (path to the key) or function of type: `(option) => option.disabled`",
    valueBy: "When `options` prop items are an objects, this key will be used as `modelValue`. Can be string (path to the key) or function of type: `(option) => option.value`",
    trackBy: "When `options` prop items are an objects, this key will be used to track selected `options`. Can be string (path to the key) or function of type: `(option) => option.track`",
    textBy: "When `options` prop items are an objects, this key will be used as displayed text. Can be string (path to the key) or function of type: `(option) => option.text`",
    placeholder: "Sets the placeholder text to input",
    placement: "Sets option list placement. [More about placements](/ui-elements/dropdown#placement-and-offset)",
    tagMax: "Sets maximum tag count after whom selection will be cropped",
    tags: "Sets selection display as tags",
    deletableTags: "Sets ability to delete tags",
    searchable: "Sets ability to filter option list by typing",
    multiple: "Sets select in multiple mode",
    maxSelections: "Sets the maximum amount of selected options",
    width: "Sets option list width",
    maxHeight: "Sets option list maximum height",
    noOptionsText: "Sets text whom displaying if list have no items",
    fixed: "Sets dropdown placement strategy",
    clearable: "Sets ability to clear selection",
    hideSelected: "Sets ability to hide selected options",
    allowCreate: "Allow creating new options. Can be set to `unique` if you want to create only unique options",
    clearIcon: "Sets the clear icon",
    dropdownIcon: "Sets the dropdown icon. Can be object if you want to sets different open/close icons",
    bordered: "Applies style with bottom border",
    separator: "Text to separate selected values",
    maxVisibleOptions: "Max selected options amount, that will be shown inside of input wrapper.",
    selectedTopShown: "Selected options will be shown at the top of the options list.",
    autocomplete: "Enables the autocomplete behaviour.",
    highlightMatchedText: "Highlight chars in options that are match the input value (search or autocomplete).",
    minSearchChars: "Minimal amount of chars in input value to initiate search or autocomplete.",
    ariaLabel: "Set aria label. By default it `$t:selectOption` is value is selected and `$t:noSelectedOption` if value is empty.",
    ariaClearLabel: "Set aria label for clear button",
    ariaSearchLabel: "Set aria label for search input",
    autoSelectFirstOption: "Automatically select the first option",
    closeOnAnchorClick:"Dropdown will be closed when anchor is clicked",
    hoverOutTimeout: "Time in `ms` after mouse leave dropdown before it will be closed",
    hoverOverTimeout: "Time in `ms` after mouse enter dropdown before it will be opened",
    trigger: "Action that will triggered when open and close dropdown.",
    virtualScroller: "Enables virtual scrolling",
    searchPlaceholderText: "The text of placeholder of the search input"
  },
  events: {
    clear: "Emitted if select value has been cleared",
    updateSearch: "Emitted if search value has changed",
    createNew: "Emitted if search input has created new option",
    scrollBottom: "Emitted once the scroll position of options has reached the bottom"
  },
  methods: {
    reset: "Clearing select value"
  },
  slots: {
    prepend: "Adds an item outside the input and before input content",
    prependInner: "Adds an item inside the input and before input content",
    append: "Adds an item outside the input and after input content",
    appendInner: "Adds an item inside the input and after input content",
    content: "Adds an item instead the input",
    option: "Allows to specify option template",
    hiddenOptionsBadge: "Replaces default badge with hidden options counter (see `maxVisibleOptions` prop).",
    hideOptionsButton: "Replaces default button for hiding selected options that are over the limit (see `maxVisibleOptions` prop)."
  }
});
