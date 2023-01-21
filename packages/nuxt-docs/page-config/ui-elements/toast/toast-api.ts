import { PageGenerationHelper } from "../../../helpers/DocsHelper";
import { ToastOptions } from "../../../../../ui/src/components/va-toast/types";

export const methodsApi = (block: PageGenerationHelper) =>
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
  );

const optionsTableData: [keyof ToastOptions, string][] = [
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
];

export const optionsApi = (block: PageGenerationHelper) =>
  block.table(["name", { title: "type", type: "code" }], optionsTableData);

const optionsApiExample = `
export default {
  methods: {
    onButtonClick() {
      this.$vaToast.init('Toast example!')
    },
  },

  beforeRouteLeave (to, from, next) {
    this.$vaToast.closeAll()
    next()
  },
}
`;

const compositionApiExample = `
import { useToast } from 'vuestic-ui'
export default defineComponent({
  setup() {
    const { init, close, closeAll } = useToast()

    return {
      onButtonClick: () => init('Toast example!'),
    }
  }
})
`;

export const apiExamplesObject = {
  "options Api": optionsApiExample,
  "composition Api": compositionApiExample,
};
