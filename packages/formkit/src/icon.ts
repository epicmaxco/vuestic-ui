import { createSection, type FormKitSchemaExtendableSection } from "@formkit/inputs";

/**
 * Icon section used by all icons
 *
 * @public
 */
export const icon = (
  sectionKey: string,
): FormKitSchemaExtendableSection => {
  return createSection(`${sectionKey}Icon`, () => {
    return {
      if: `$${sectionKey}Icon`,
      $cmp: 'VaIcon',
      props: {
        class: 'material-icons',
        onClick: `$handlers.iconClick(${sectionKey})`,
        role: `$fns.iconRole(${sectionKey})`,
        tabindex: `$fns.iconRole(${sectionKey}) === "button" && "0" || undefined`,
      },
      children: '$prefixIcon'
    }
  })()
}
