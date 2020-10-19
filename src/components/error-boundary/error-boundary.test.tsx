import { shallow } from "enzyme";
import React from "react";
import { ErrorBoundary } from "./error-boundary";

describe("Testing ErrorBoundary", () => {
  test("should render a fallback component", () => {
    const wrapper = shallow(<ErrorBoundary />);
    const FallbackComponent = wrapper.prop("FallbackComponent");

    expect(shallow(<FallbackComponent />).html()).toMatchSnapshot();
  });
});
