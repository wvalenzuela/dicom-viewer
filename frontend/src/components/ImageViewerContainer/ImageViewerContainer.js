import React from "react";
import vtkRenderer from "@kitware/vtk.js/Rendering/Core/Renderer";
import vtkRenderWindow from "@kitware/vtk.js/Rendering/Core/RenderWindow";
import vtkRenderWindowInteractor from "@kitware/vtk.js/Rendering/Core/RenderWindowInteractor";
import vtkOpenGLRenderWindow from "@kitware/vtk.js/Rendering/OpenGL/RenderWindow";
import vtkImageMapper from "@kitware/vtk.js/Rendering/Core/ImageMapper";
import vtkImageSlice from "@kitware/vtk.js/Rendering/Core/ImageSlice";
import vtkImageData from "@kitware/vtk.js/Common/DataModel/ImageData";
import vtkDataArray from "@kitware/vtk.js/Common/Core/DataArray";
import SnackMessage from "../SnackMessage";
import { Box, CircularProgress, Grid } from "@mui/material";

// imports for the cone example
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";

class ImageViewerContainer extends React.Component {
  constructor(props) {
    super(props);
    // Initializing states
    this.state = {
      loading: false,
      error: "",
      slice: true, // set to true only for testing
    };
    // Initializing reference for the container and a context object to manage VTK state.
    this.vtkContainerRef = React.createRef();
    this.vtkContext = { initialized: false };
  }
  // Initialize VTK rendering setup after the component is mounted.
  componentDidMount() {
    this.initializeVTK();
    window.addEventListener('resize', this.handleResize);
  }
  // Cleanup the VTK setup before the component is unmounted and destroyed.
  componentWillUnmount() {
    this.destroyVTK();
    window.removeEventListener('resize', this.handleResize);
  }

  fetchData = () => {
    const { loading, error } = this.state;
    if (loading) return;

    // TODO: add logic to handle backend API call
  };

  handleCloseSnak = () => {
    this.setState({ error: "" });
  };

  initializeVTK() {
    if (this.vtkContainerRef.current && !this.vtkContext.initialized) {
      // Setup the main VTK render window, renderer, and OpenGL render window
      const renderWindow = vtkRenderWindow.newInstance();
      const renderer = vtkRenderer.newInstance();
      renderWindow.addRenderer(renderer);

      const openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
      renderWindow.addView(openGLRenderWindow);
      openGLRenderWindow.setContainer(this.vtkContainerRef.current);

      // Adjust the size of the OpenGL render window based on the container's dimensions.
      const { width, height } =
        this.vtkContainerRef.current.getBoundingClientRect();
      openGLRenderWindow.setSize(width, height);

      // Initialize the render window interactor and bind it to the container.
      const interactor = vtkRenderWindowInteractor.newInstance();
      interactor.setView(openGLRenderWindow);
      interactor.initialize();
      interactor.setContainer(this.vtkContainerRef.current);

      // Example setup for rendering a cone instead of the image data
      const coneSource = vtkConeSource.newInstance({ height: 1.0 });
      const mapper = vtkMapper.newInstance();
      mapper.setInputConnection(coneSource.getOutputPort());

      const actor = vtkActor.newInstance();
      actor.setMapper(mapper);

      // Adding the actor to the renderer and initiating the render process
      renderer.addActor(actor);
      renderer.resetCamera();
      renderWindow.render();

      // Storing references to VTK objects in the context for later use
      this.vtkContext = {
        initialized: true,
        renderWindow,
        openGLRenderWindow,
        interactor,
      };
    }
  }

  handleResize = () => {
    this.updateRenderWindowSize();
    this.vtkContext.renderWindow.render();
  }

  updateRenderWindowSize(){
    const { openGLRenderWindow } = this.vtkContext;
    if (openGLRenderWindow) {
      const {width, height} = this.vtkContainerRef.current.getBoundingClientRect();
      openGLRenderWindow.setSize(width, height);
    }
  }

//from: https://kitware.github.io/vtk-js/examples/Scrolling2DMixedImages.html
/* function updateWindowLevel(slice) {
  const img = imageMapper.getImage(slice);
  const range = img.getPointData().getScalars().getRange();
  const maxWidth = range[1] - range[0];
  imageActor.getProperty().setColorWindow(maxWidth);
  const center = Math.round((range[0] + range[1]) / 2);
  imageActor.getProperty().setColorLevel(center);
} */

  // Method to clean up VTK objects and free memory
  destroyVTK() {
    if (this.vtkContext.initialized) {
      this.vtkContext.renderWindow.delete();
      this.vtkContext.openGLRenderWindow.delete();
      this.vtkContext.interactor.delete();
      this.vtkContext.initialized = false;
    }
  }

  render() {
    const { error, slice, loading } = this.state;
    // Loading bar
    let Component = (
      <Grid item>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </Grid>
    );
    // Show image after data has loaded
    if (slice && !loading) {
      Component = (
        <div
          ref={this.vtkContainerRef}
          style={{
            width: "100%",
            height: "80vh",
            border: "5px solid sandybrown", // add border for debugging
          }}
        />
      );
    }
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          {Component}
        </Grid>
        <SnackMessage
          handleClose={this.handleCloseSnak}
          message_text={error !== "" ? error : "Unknown warning"}
          open={error && error !== "" ? true : false}
          type="error"
        />
      </React.Fragment>
    );
  }
}

export default ImageViewerContainer;
