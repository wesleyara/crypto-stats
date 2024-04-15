import { mount } from "@vue/test-utils";
import component from "../../pages/index.vue";
import TheHeader from "../../components/TheHeader.vue";
import HomeFrame from "../../components/HomeFrame.vue";
import Converter from "../../components/Converter.vue";

describe("index page", () => {
  it("index page is a component", () => {
    const wrapper = mount(component, {
      global: {
        stubs: {
          TheHeader: true,
          HomeFrame: true,
          Converter: true,
        },
      },
    });

    expect(wrapper.vm).toBeTruthy();
  });
});
