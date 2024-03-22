import '@kitware/vtk.js/favicon';
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData';
import React from "react";
import vtkRenderer from "@kitware/vtk.js/Rendering/Core/Renderer";
import vtkRenderWindow from "@kitware/vtk.js/Rendering/Core/RenderWindow";
import vtkRenderWindowInteractor from "@kitware/vtk.js/Rendering/Core/RenderWindowInteractor";
import vtkOpenGLRenderWindow from "@kitware/vtk.js/Rendering/OpenGL/RenderWindow";
import SnackMessage from "../SnackMessage";
import { Box, CircularProgress, Grid } from "@mui/material";



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
  }
  // Cleanup the VTK setup before the component is unmounted and destroyed.
  componentWillUnmount() {
    this.destroyVTK();
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
    // Load the example response data from a JSON file
    // TODO in future fetch()
    const example = require("./exampleResponse.json");

    // Calculate the total number of pixels in the image
    const numpixel = example.width * example.height;

    // Create a new Float32Array to store pixel values
    const pixarray = new Float32Array(numpixel);

    // Initialize an index variable for populating the pixarray
    let i = 0;

    // Iterate through each row of pixel data
    example.pixelData.forEach((row) => {
      // For each pixel in the row, assign its value to the corresponding position in pixarray
      row.forEach((pixel) => {
        pixarray[i] = pixel;
        i++;
      });
    });

    // Create a new instance of vtkImageData
    const imageData = vtkImageData.newInstance({
      origin: [0, 0, 0], // Set the origin (usually [0, 0, 0])
      spacing: [1, 1, 1], // Set the spacing between pixels (usually [1, 1, 1])
      direction: [1, 0, 0, 0, 1, 0, 0, 0, 1], // Set the direction (identity matrix)
    });

    // Create a new vtkDataArray to hold the pixel values
    const dataArray = vtkDataArray.newInstance({
      values: pixarray, // Assign the pixel values to the data array
      numberOfComponents: 1, // Specify the number of components per datum (1 for grayscale)
    });

    // Set the data array as the scalars for the vtkImageData
    imageData.getPointData().setScalars(dataArray);

    // Set the dimensions of the image (512 x 448 x 1)
    imageData.setDimensions([512, 448, 1]);


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

      const actor = vtkVolume.newInstance();
      const mapper = vtkVolumeMapper.newInstance();
      mapper.setInputData(imageData);
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
