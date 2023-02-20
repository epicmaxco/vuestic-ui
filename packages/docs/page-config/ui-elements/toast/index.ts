import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("toast.title"),
    block.paragraph("toast.summaryText"),
    block.paragraph("toast.optionsAPI"),
    block.paragraph("toast.compositionAPI"),
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
    block.subtitle("toast.toastOptionsHeader"),
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

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Color"),
    block.example("Offset"),
    block.example("Position"),
    block.example("Close"),
    block.example("Click"),

    block.subtitle("all.api"),
    block.api("VaToast", apiOptions),

    block.subtitle("all.faq"),
    block.headline("toast.faq.questions[0].question"),
    block.paragraph("toast.faq.questions[0].answer"),
  ],
});
