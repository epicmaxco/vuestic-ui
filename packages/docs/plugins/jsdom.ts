// @ts-nocheck
// We should use this because of css color validation in ColorThemePlugin of vuestic-ui
// see https://stackoverflow.com/a/56266358/5783475

import jsdom from 'jsdom'
const { JSDOM } = jsdom
const { window } = new JSDOM('')
const { document, Option, HTMLElement, Window, Object, navigator, Image, Element } = window
Object.assign(global, { window, document, Option, HTMLElement, Window, Object, navigator, Image, Element })
