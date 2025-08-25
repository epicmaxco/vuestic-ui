import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Skip Link"),
    block.paragraph("`va-skip-link` skip to the target component."),

    block.subtitle("Basic usage"),

    block.paragraph("By default, `va-skip-link` needs a target and position, please keep in mind that the component should be placed as the very first element."),

    block.subtitle("Example"),

    block.paragraph("To test this component - click `Esc`, then press `Tab` and you should be able to see a button that would get you straight to content on `Enter`."),
    
    block.subtitle("API"),
    block.api("VaSkipLink", apiDescription, apiOptions),
  ],
});
