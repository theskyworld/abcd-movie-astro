import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import Profile from "..";

describe("Profile", () => {
  test("should mounted correctly", () => {
    const wrapper = mount(Profile, {
      props: {
        imgURL: "https://some-test.com",
      },
    });

    expect(wrapper.find(".profile-container")).toBeTruthy();
  });
  test("should props passed correctly", () => {
    const wrapper = mount(Profile, {
      props: {
        imgURL: "https://some-test.com",
      },
    });
    expect(wrapper.find("img").attributes("src")).toBe("https://some-test.com");
  });
});
