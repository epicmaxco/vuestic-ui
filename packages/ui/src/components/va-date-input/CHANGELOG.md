# 1.9.0

- now `model-value` can be ISO8601 string or standard JS Date string (RFC1123) in GTM or Local format
- fix: new `model-value` converts into format provided to `model-value` instead of Date object
- added `formatValue` prop in case you have `null` model-value and want to format `model-value` into specific format
- minor: expose `valueText`, `valueDate`, `validate` properties
- minor: change dropdown open trigger to `enter`, `click`, `space` and `right-click` by default

# 1.8.0

- Date input have outlined style by default
- `solid` and `bordered` props moved to `preset="solid"` and `preset="bordered"`