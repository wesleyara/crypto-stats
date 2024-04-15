import { mount } from "@vue/test-utils";
import component from "../../components/HomeFrame.vue";

describe("HomeFrame", () => {
  test("import HomeFrame", async () => {
    const homeFrame = await import("../../components/HomeFrame.vue");

    expect(homeFrame).toBeDefined();
  });

  test("HomeFrame is a Vue component", () => {
    const wrapper = mount(component);
    expect(wrapper.vm).toBeTruthy();
  });

  test("component mount", () => {
    const wrapper = mount(component);
    expect(wrapper).toBeTruthy();
  });
});
