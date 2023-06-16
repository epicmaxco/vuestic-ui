import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    component: "Allows to use the `svg` component as an icon",
    rotation: "Rotates a component by a degree value",
    spin: "Starts rotation animation",
    flip: "Specifies mirror image relative to horizontal and vertical planes. `\"off\"`, `\"horizontal\"`, `\"vertical\"` and `\"both\"` values are available"
  }
});
