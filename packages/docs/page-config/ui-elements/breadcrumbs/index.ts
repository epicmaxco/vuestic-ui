import vaBreadcrumbsApiOptions from "./va-breadcrumbs-api-options";
import vaBreadcrumbsItemApiOptions from "./va-breadcrumbs-item-api-options";

export default definePageConfig({
  blocks: [
    block.title("Breadcrumbs"),
    block.paragraph("The breadcrumbs component is used for application navigation. It shows the location of the current page within the navigation hierarchy. It’s used with `va-breadcrumb-item` components."),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Default",
      description: "This is a basic usage of the `va-breadcrumbs` component."
    }),
    block.example("Align", {
      title: "Align",
      description: "Changes component position on the page."
    }),
    block.example("Separator", {
      title: "Separator",
      description: "You can use your own separator and customize its color."
    }),
    block.example("Color", {
      title: "Color",
      description: "Sets color of breadcrumbs content"
    }),
    block.example("ActiveColor", {
      title: "Active color",
      description: "Color of active `va-breadcrumb-item` elements."
    }),
    block.example("Item", {
        title: "Item",
        description: "Some `va-breadcrumbs-item` props examples."
      }
    ),

    block.subtitle("API"),
    block.api("VaBreadcrumbs",{
      props: {
        activeColor: "Color of active links (theme string or HEX string).",
        separator: "Element to separate breadcrumbs items.",
        separatorColor: "Color of the separator icon (theme string or HEX string).",
        ariaLabel: "The aria-label of the component",
        vertical: "Displays vertically"
      },
      slots: {
        default: "One or more `va-breadcrumbs-item` elements.",
        separator: "Separator element. Can be string or vue component."
      }
    }, vaBreadcrumbsApiOptions),

    block.subtitle("Item API"),
    block.paragraph("API for `va-breadcrumb-item` component."),
    block.api("VaBreadcrumbsItem", {
      props: { label: "Component content (string)." },
      slots: { default: "Component content." }
    }, vaBreadcrumbsItemApiOptions),

    block.subtitle("FAQ"),
    block.headline("Can `separator` prop work with `separator` slot?"),
    block.paragraph("No, slot has higher priority, prop is ignored when slot is used. Same is legit for `label` of `va-breadcrumbs-item`, it is ignored when you use `default` slot."),
  ],
});
