import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("File Upload"),
    block.paragraph("The `va-file-upload` component is an input for selecting and uploading files with a richer interface than the default one."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default usage",
      description: "By default it’s displayed as a simple button to upload files."
    }),
    block.example("DragAndDrop", {
      title: "Drag & Drop",
      description: "The `dropzone` prop is used to add drag and drop possibility to the `va-file-upload` component",
    }),
    block.example("Validation", {
      title: "Specify file types",
      description: "Add `file-types` prop with allowed extensions to add file types validation"
    }),
    block.example("Gallery", {
      title: "As gallery",
      description: "With `type === gallery` prop you can show user picture preview of uploaded files"
    }),
    block.example("Slots", {
      title: "Slot",
      description: "Allows to create custom file upload area."
    }),
    block.example("Undo", {
      title: "Canceling the removing action"
    }),
    block.example("Disabled", {
      title: "Disabled",
      "description": "Use the `disabled` prop to disable any actions with a component"
    }),

    block.subtitle("API"),
    block.api("VaFileUpload", apiDescription, apiOptions),
  ],
});
