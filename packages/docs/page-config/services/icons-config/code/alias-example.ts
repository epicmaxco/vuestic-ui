import VuesticLogoSVGComponent from "some-component.vue";

const aliases = [
  {
    name: "close",
    to: "fa4-times",
  },
  {
    name: "twitter",
    to: "fa4-twitter",
    color: "#1da1f2", // {{ $t('all.code.aliasAndFontExample.twitterColor') }}
  },
  {
    name: "vuestic-logo",
    component: VuesticLogoSVGComponent,
    color: "primary",
  },
  {
    name: "english",
    to: "flag-gb-small",
  },
];
