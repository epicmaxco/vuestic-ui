# 1. Accessibility guide

We want to provide following accessibility features:
- roles & aria attributes,
- keyboard accessibility,
- proper typography, colors and contrast ratio.

**Source of truth:** https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles and https://www.w3.org/WAI/standards-guidelines/aria/

## 1.1. Roles & aria attributes

Every tag has its role and list of attributes related to it. For example, `<button />` tag has
`button` role. If you are forced to use an unsuitable tag (`div` as `button`) you can append the proper role, so it will be equal to the tag `button`:

`<div role="button" />`

> For example, `VaDropdown` anchor is not actually button, but behave like button.

**Role doesn't influence visual state of the tag. It's used only by screen-readers and has no effect for regular browsers.**

As mentioned, every role has a list of attributes related to it. Some of them specific to the role, others - common for all (or almost for all).

For example, `button` role has specific attributes:
- `aria-pressed`,
- `aria-expanded` etc.

And some common:
- `aria-label`,
- `aria-labeledby`,
- `aria-disabled` etc.

See more: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role

> **Note**
> 
> Try to append as much aria-attributes as possible, because it will give the additional information for screen-readers.

> **Important note**
> 
>In some cases aria-attributes aren't getting transformed into the proper snake-case from the camelCase:
> `ariaValuemin="0"` -> `ariavaluemin="0"` instead of expected `aria-valuemin="0"`
> So you need to check if aria-attributes are transformed in the proper way or to use snake-case instead of camelCase for their keys.

**How can you understand, which roles & aria-attributes belong to the one or another block?**

Human logic, source of truth and [Google](https://letmegooglethat.com/?q=tab+accessibility).

Some other ground rules:
- pure graphics (like icons) which aren't used as button or link may be hidden via `aria-hidden` attribute;
- all images should have `alt` attribute, even it's empty, **very important**;
- all links must contain text, which describes where user will be taken by them (home page, cart etc.). In case of images-links use `aria-label` attribute.

## 1.2. Keyboard accessibility

Every interactive item should be accessible via `Tab` button (should have `tabindex="0"` attribute).

Some other ground rules:
- `focused` state should be highlighted via `useKeyboardFocusClass` composable;
- `tabindex` attribute can be `-1` (excluded from tab navigation) or `0`, no other values;
- elements with `tabindex="0"` shouldn't be hidden via `aria-hidden="true"` attribute;
- interaction with an element should be reachable via the `enter`, `space` or other keys (list of them is specified in the source of truth for each role).

## 1.3. Typography and colors

Built-in font sizes, colors & contrast ratio should be fully accessible (awaiting for 1.5.0 version). Anyway, feel free to create an issue if you've mentioned some problems.

# 2. Checking accessibility

We use Lighthouse from ChromeDevTools & manual testing.

# 2.1. Lighthouse

After a few moments you'll gain a report:

![](https://wd.imgix.net/image/admin/2O9SByfzzLWTPQAcPlgN.png?auto=format)

Check it and try to fix listed problems:

![](https://wd.imgix.net/image/admin/62KIEtieXbeJl36cN0kQ.png?auto=format)

Also, you are able to investigate how screen-reader will parse the element via `Accessibility` tab:

![](https://wd.imgix.net/image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w3l7Zbtti7m5NuxuOalR.png?auto=format)

# 2.2. Manual testing

Just make sure that all interactive elements:
- are accessible via `Tab`, 
- have focus style,
- are usable via keyboard buttons listed in the role documentation (source of truth).