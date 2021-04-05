This document is intended as a collection of conventions on how to create documentation pages for vuestic-ui.

## Doc Demos
### Filler text
* Ideal option is to write filler text for every case, if you think you can do so effectively.
* Alternatively place some lorem ipsum text.
* If you need long blocks of text (to showcase how component works with large content, f.i.) - create a `lorem` function in file. You can copy said function from `vue-book`.
* Note that in demos we want to use `$vb.lorem` and nothing else, filler text is only for documentation.
* Filler text should not be translated. It's english in all cases.
