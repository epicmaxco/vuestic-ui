# Here we put SCSS resources that can be reused in components.

Don't put CSS code here. Resources (and its code) will be imported in each component in ESM build. 
That will cause an issue when the same CSS code is repeatedly imported multiple times on page.
See [#1163](https://github.com/epicmaxco/vuestic-ui/issues/1163)