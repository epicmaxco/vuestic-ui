// @ts-nocheck
import jsdom from 'jsdom'
const { JSDOM } = jsdom
const { window } = new JSDOM('')
const { document, Option } = window
Object.assign(global, {window, document, Option})
