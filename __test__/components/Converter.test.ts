import { mount } from "@vue/test-utils";
import component from "../../components/Converter.vue";

describe("Converter", () => {
  test("import Converter", async () => {
    const converter = await import("../../components/Converter.vue");

    expect(converter).toBeDefined();
  });

  test("Converter is a Vue component", () => {
    const wrapper = mount(component);
    expect(wrapper.vm).toBeTruthy();
  });

  test("component mount", () => {
    const wrapper = mount(component);
    expect(wrapper).toBeTruthy();
  });
});
