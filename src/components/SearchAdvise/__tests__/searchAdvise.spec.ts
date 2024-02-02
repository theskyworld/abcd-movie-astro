import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import SearchAdvise from "..";

describe("SearchAdvise", () => {
  test("should mounted correctly", () => {
    const wrapper = mount(SearchAdvise);

    expect(wrapper.find(".search-advise-container")).toBeTruthy();
  });
});
