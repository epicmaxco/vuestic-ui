## Defaults fallthrough
Using context indicates that for each `c_prop` you have a variety of values to fallback to.

1) Prop value. The only exception is when it is `undefined`.
2) Local context config (`va-context` component). If there are several local contexts priority is given to closes one.
3) Global context config.
4) Prop default.
