import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Select"),
    block.paragraph("Select field components are used for collecting user provided information from a list of options. This component opens up a menu for the selection list and action."),

    block.subtitle("Examples"),

    block.example("Default", { title: "Default select" }),
    block.example("Styles", {
      title: "Styles",
      description: "Select styles inherit from input styles"
    }),
    block.example("Variations", {
      title: "Multiple select",
      description: "Includes single or multiple selects."
    }),
    block.example("Decorators", { title: "Decorators" }),
    block.example("ObjectOptions", {
      title: "Objects as options",
      description: "You can use objects as options. Text will be showing from `text-by` property from object. Value can be also returned from select using `value-by` instead of whole object. Comparing object values is done by `track-by` prop or `value-by` if it is not provided.",
    }),
    block.example("TrackBy", {
      title: "Track by",
      description: "Track by can be used if you have multiple options with same value."
    }),
    block.example("Slots", {
      title: "Slots",
      description: "Includes `option`, `content`, `prepend`, `prepend-inner`, `append` and `append-inner` slots."
    }),
    block.example("Tagging", {
      title: "Tagging",
      description: "`content` slot allows you to overwrite default `input` element with custom one. So you are able to set tagging state via adding `VaChip` component:"
    }),
    block.example("State", {
      title: "State",
      description: "Includes error, success, disabled or loading state"
    }),
    block.example("Searchable", {
      title: "Searchable",
      description: "Supports ability to filter option list by typing"
    }),
    block.example("AllowCreate", {
      title: "Allow create",
      description: "You can add options that initial options do not have"
    }),
    block.example("Validation", {
      title: "Validation rules",
      description: "Select accepts an array of functions that take an input value as an argument and return either true / false or a string with an error message"
    }),
    block.example("MaxVisibleOptions", {
      title: "Max visible selected options",
      description: "The `max-visible-options` props sets amount of selected options, that will be shown inside of input wrapper. The rest will be hidden, but may be shown after clicking the badge with hidden options counter."
    }),
    block.example("SelectedTopShown", {
      title: "Displaying selected options at the top of the list",
      description: "The `selected-top-shown` prop forces to display selected options at the top of the options list."
    }),
    block.example("Autocomplete", {
      title: "Autocomplete",
      description: "The `autocomplete` prop enables autocomplete behaviour for the `va-select`."
    }),
    block.example("IconOptions", {
      title:"Icon-selection",
      description: "The 'iconOption' property allows the addition of custom options to the select dropdown menu, each with an icon and a name."
    }),

    block.headline("Keyboard navigation"),
    block.paragraph("By using `ARROW DOWN` and `ARROW UP` you can move between options"),
    block.paragraph("By using `ENTER` and `SPACE` you can select current option"),
    block.paragraph("If you type while option list is opened this will create a search buffer (will reset if you do not type for 1 second) that will be used to search in the options labels"),

    block.subtitle("API"),
    block.api("VaSelect", apiDescription, apiOptions),

    block.changeLog({
      '1.8.0': [
        'Select have outlined style by default',
        '`solid` and `bordered` props moved to `preset="solid"` and `preset="bordered"`',
      ],
    })
  ],
});
