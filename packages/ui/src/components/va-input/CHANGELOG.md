# 1.10.0
- Remove cleave.js and reduced bundle size
- Remove `mask` prop. Prefer useInputMask composable

# 1.9.0
- Fix style issues without vuestic/css or in web-components build
- Fix empty value when model value initially set
- Fix issue when user unable to remove spec symbols when mask is used

# 1.8.0
- Inputs have outlined style by default
- `solid` and `bordered` props moved to `preset="solid"` and `preset="bordered"`
- All `--va-input-*` css variables renamed to `--va-input-wrapper-*`
- For outlined style `currentColor` is used for text color, without background color detection
- `type="textarea"` is removed, use VaTextarea component instead