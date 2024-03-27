import React from "react";
import { render, screen } from "@testing-library/react";
import ImageViewerContainer from "./ImageViewerContainer";

jest.mock("@kitware/vtk.js/Rendering/Profiles/Volume", () => ({}));
jest.mock(
  "@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper",
  () => ({})
);
jest.mock(
  "@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper",
  () => ({})
);
jest.mock(
  "@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper",
  () => ({})
);
jest.mock("@kitware/vtk.js/Rendering/Core/Volume", () => jest.fn());
jest.mock("@kitware/vtk.js/Rendering/Core/VolumeMapper", () => jest.fn());
jest.mock("@kitware/vtk.js/Common/Core/DataArray", () => ({
  newInstance: jest.fn().mockReturnValue({
    values: jest.fn(),
    numberOfComponents: jest.fn(),
  }),
}));
jest.mock("@kitware/vtk.js/Common/DataModel/ImageData", () => ({
  newInstance: jest.fn().mockReturnValue({
    setDimensions: jest.fn(),
    getPointData: jest.fn().mockReturnValue({
      setScalars: jest.fn(),
    }),
  }),
}));
jest.mock("@kitware/vtk.js/Rendering/Core/Renderer", () => jest.fn());
jest.mock("@kitware/vtk.js/Rendering/Core/RenderWindow", () => jest.fn());
jest.mock("@kitware/vtk.js/Rendering/Core/RenderWindowInteractor", () =>
  jest.fn()
);
jest.mock("@kitware/vtk.js/Rendering/OpenGL/RenderWindow", () => jest.fn());

jest.mock("../SnackMessage", () => () => <div>MockedSnackMessage</div>);
jest.mock("./ToolBar/ToolBar", () => () => <div>MockedToolBar</div>);

describe("ImageViewerContainer", () => {
  it("renders without crashing", () => {
    render(<ImageViewerContainer />);
    // Check for an element that indicates the component has rendered.
    // Since specific children are mocked, look for those mock indicators.
    expect(screen.getByText("MockedToolBar")).toBeInTheDocument();
    // If you have conditional rendering based on state, you might need to adjust this approach.
  });
}); 
