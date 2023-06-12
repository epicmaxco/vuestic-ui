import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Toast"),
    block.paragraph("Component for sending a notification to the user. To make it easier to create toast we have a shorthands. For options API it is `$vaToast`. For composition api we have `useToast` hook. Hook and global object have similar API."),
    block.paragraph("In options API you can use VaToastPlugin (automatically installed with createVuestic). `$vaToast` have a few methods: init, close, closeAll."),
    block.paragraph("In composition API you can use `useToast` hook."),
    block.code({
      "options Api": "options-api",
      "composition Api": "composition-api",
    }),

    block.table(
      [
        "Method name",
        { title: "Api Type", type: "code" },
        { title: "description", type: "markdown" },
      ],
      [
        [
          "init(options: string | NotificationOptions)",
          "Options | Composition",
          "Creates new toast instance. Returns toast instance id",
        ],
        [
          "close(id: string)",
          "Options | Composition",
          "Closes specific using its id.",
        ],
        [
          "closeAll(allApps?: boolean = false)",
          "Options | Composition",
          "Closes all instances created in this Vue App. If you want to close all toasts on webpage, set allApps to true.",
        ],
        [
          "closeAllCreatedInThisHook()",
          "Composition",
          "Using this method you can close all toasts created in one setup context",
        ],
      ]
    ),
    block.subtitle("Init Options"),
    block.table(
      ["name", { title: "type", type: "code" }],
      [
        ["title", "string"],
        ["message", "string | VNode"],
        ["iconClass", "string"],
        ["customClass", "string"],
        ["duration", "number"],
        ["closeable", "boolean"],
        ["dangerouslyUseHtmlString", "boolean"],
        ["render", "() => VNode"],
        ["onClose", "() => void"],
        ["onClick", "() => void"],
        ["offsetX", "number"],
        ["position", "NotificationPosition"],
        ["offsetY", "number"],
        ["visible", "boolean"],
        ["color", "string"],
      ]
    ),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "By default, run this component in events by using the `init` method with a setting object."
    }),
    block.example("Color", {
      title: "Color",
      description: "Set different colors using `color` prop. You can either user theme string HEX color value."
    }),
    block.example("Offset", {
      title: "Offset",
      description: "Use `offset` property to set the offset of the toast."
    }),
    block.example("Position", {
      title: "Position",
      description: "Use `position` property to set the custom position of the toast. Available are `top-right`, `top-left`, `bottom-right`, `bottom-left`."
    }),
    block.example("Close", {
      title: "Close",
      description: "You can use close method to close the notification and you can set custom onClose event."
    }),
    block.example("Click", {
      title: "Click",
      description: "You can set custom onClick event to handle the click on button."
    }),

    block.subtitle("API"),
    block.api("VaToast", apiDescription, apiOptions),

    block.subtitle("FAQ"),
    block.headline("What is the difference between a component and a service?"),
    block.paragraph("The difference is in implementation. The service behaves more flexibly and it is easier to bind it to certain events than to render the whole element. \n Each prop you provide to the component you can provide to the service too by using the setting object."),
  ],
});
