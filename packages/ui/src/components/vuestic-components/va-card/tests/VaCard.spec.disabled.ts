import { shallowMount } from "@vue/test-utils";
import VaCard from "../VaCard.vue";

describe("VaCard", () => {
  let wrapper;

  const createComponent = () => {
    wrapper = shallowMount(VaCard);
  };

  it("sanity", () => {
    createComponent();

    expect(wrapper.exists()).toBe(true);
  });
});
