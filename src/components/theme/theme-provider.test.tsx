import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import { teamsDarkTheme } from "@fluentui/react-northstar";
import { ThemeProvider } from "./theme-provider";

describe("Testing ThemeProvider", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should switch the theme when the right keys are pressed", () => {
    const wrapper = mount(
      <ThemeProvider>
        <div>Something</div>
      </ThemeProvider>
    );

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "t", altKey: true });
      document.dispatchEvent(event);
    });

    wrapper.setProps({});

    const provider = wrapper.find("Provider").first();
    expect(provider.props()).toMatchObject({
      theme: teamsDarkTheme,
      id: "elder-cards-app",
    });
  });
});
