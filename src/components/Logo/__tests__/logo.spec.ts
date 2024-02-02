import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import Logo from "..";

describe("Logo", () => {
  test("should mounted correctly", () => {
    const wrapper = mount(Logo);
    expect(wrapper.find(".logo-container")).toBeTruthy();
    console.log(wrapper.find("img").attributes("src"));
  });
  test("should img render correctly", () => {
    const wrapper = mount(Logo);
    expect(wrapper.find("img").attributes("src")).toBe(
      "/src/assets/imgs/logo.svg",
    );
  });
});
