import { useGlobalConfig } from "vuestic-ui";

export default {
  setup() {
    const { globalConfig } = useGlobalConfig();

    console.log(globalConfig.value);

    return { globalConfig };
  },
};
