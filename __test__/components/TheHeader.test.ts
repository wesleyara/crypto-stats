import { mount } from "@vue/test-utils";
import component from "../../components/TheHeader.vue";

describe("TheHeader", () => {
  test("import TheHeader", async () => {
    const TheHeader = await import("../../components/TheHeader.vue");

    expect(TheHeader).toBeDefined();
  });

  test("TheHeader is a Vue component", () => {
    const wrapper = mount(component);
    expect(wrapper.vm).toBeTruthy();
  });

  test("component mount", () => {
    const wrapper = mount(component);
    expect(wrapper).toBeTruthy();
  });

  test("handleScrollToId", () => {
    const element = document.createElement("div");
    element.id = "test";
    document.body.appendChild(element);

    const scrollIntoViewMock = vi.fn();
    element.scrollIntoView = scrollIntoViewMock;
    const wrapper = mount(component);
    const vm = wrapper.vm as any;
    vm.handleScrollToId("test");

    expect(element.scrollIntoView).toHaveBeenCalled();
  });
});
