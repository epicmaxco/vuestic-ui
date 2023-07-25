import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    type: "Specify the format of component. Supported types are `single`, `list` and `gallery`",
    fileTypes: "Specify supported file formats",
    dropzone: "Enables Drag&Drop",
    hideFileList: "Hide file list if you want to show files somewhere else.",
    value: "The array with uploaded files",
    dropZoneText: "Custom drop zone label text",
    uploadButtonText: "Custom upload button text",
    undo: "Enables the canceling of the removing action for the added files",
    undoDuration: "Undoing action duration",
    undoButtonText: "Cancel button text",
    deletedFileMessage: "Deleted file message",
    files: "Files to be uploaded"
  },
  events: {
    fileAdded: "Emits after files are added",
    fileRemoved: "Emits after file is removed"
  },
  slots: {
    default: "Default slot allows to create custom file upload area."
  }
});
