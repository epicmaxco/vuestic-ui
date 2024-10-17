# 1.10.3
- Add searchFn for custom option filtering in autocomplete or with search filed

# 1.9.0
- Now in `content` slot `value` is not array in single mode, but array in multiple mode. Use `valueArray` if you need array value in single/multiple modes
- Added `option-content` slot which is used to show option in dropdown and input
- Allow overriding `keepAnchorWidth`, `cloneOnContentClick`, `triggers`, `offset` props
- Fix incorrect search value if `model-value` is null or undefined
- Add slot types
- Fix ignored space in autocomplete
- Allow `null`, `undefined` and `''` value to be valid option
- Speed up virtual scroll
- Autocomplete now uses correct $props.separator instead of `', '`

# 1.8.0

- Select have outlined style by default
- `solid` and `bordered` props moved to `preset="solid"` and `preset="bordered"`