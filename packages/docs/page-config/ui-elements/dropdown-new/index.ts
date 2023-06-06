import apiOptions from "./api-options";

import specs from "./specs.md?raw";

export default definePageConfig({
  blocks: [
    block.title("dropdown-new.title"),
    block.paragraph("dropdown-new.text"),

    // examples/
    block.example("Default"),

    block.example("PlacementAndOffset"),

    // block.example("Trigger"),
    //
    // block.example("Cursor"),
    //
    // block.example("PreventOverflow"),
    //
    // block.api("VaDropdown", apiOptions),
    //
    // block.collapse("useDropdown hook specs", [block.markdown(specs)]),
  ],
});
