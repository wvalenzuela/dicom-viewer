'use client';
import { useState, useRef, useEffect } from 'react';


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
import { JsonDcm, QueryDicomImage, ServerErrorsString } from "../../common";

function ImageViewerContainer() {

  // Reference to the VTK container element
  const vtkContainerRef = useRef(null);
  const context = useRef(null);

  const [slice, setSlice] = useState(14);

  useEffect(() => {
    if (!context.current) {
      const vtkContainer = vtkContainerRef.current;
      console.log("test\n---------------------------\n" + vtkContainer);
      const vtkContext = { initialized: false };
      // Load the example response data from a JSON file
      // TODO in future fetch()
      const example = require("./exampleResponse.json");
      const numpixel = example.width * example.height;
      const pixarray = new Float32Array(numpixel);
      let i = 0;
      example.pixelData.forEach((row) => {
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
      imageData.getPointData().setScalars(dataArray);
      imageData.setDimensions([512, 448, 1]);
      console.log("Got here")
      if (vtkContainer && !vtkContext.initialized) {
        // Setup the main VTK render window, renderer, and OpenGL render window
        const renderWindow = vtkRenderWindow.newInstance();
        const renderer = vtkRenderer.newInstance();
        renderWindow.addRenderer(renderer);

        const openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
        renderWindow.addView(openGLRenderWindow);
        openGLRenderWindow.setContainer(vtkContainer);

        // Adjust the size of the OpenGL render window based on the container's dimensions.
        const { width, height } =
          vtkContainer.getBoundingClientRect();
        openGLRenderWindow.setSize(width, height);

        // Initialize the render window interactor and bind it to the container.
        const interactor = vtkRenderWindowInteractor.newInstance();
        interactor.setView(openGLRenderWindow);
        interactor.initialize();
        interactor.setContainer(vtkContainer);

        const actor = vtkVolume.newInstance();
        const mapper = vtkVolumeMapper.newInstance();
        mapper.setInputData(imageData);
        actor.setMapper(mapper);

        // Adding the actor to the renderer and initiating the render process
        renderer.addActor(actor);
        renderer.resetCamera();
        renderWindow.render();

        // Storing references to VTK objects in the context for later use
        context.current = {
          vtkContainer,
          vtkContext: { initialized: true },
          renderWindow,
          renderer,
          imageData,
          mapper,
          actor,
        };
      }
    }
    // Cleanup function: executed when the component unmounts
    return () => {
      if (context.current) {
        const { renderWindow, renderer, imageData, mapper, actor, vtkContainerRef, vtkContext } = context.current;

        // Delete VTK objects to free up memory
        renderWindow.delete();
        renderer.delete();
        imageData.delete();
        mapper.delete();
        actor.delete();
        vtkContainerRef.delete();
        // Clear the context
        context.current = { vtkContext: { initialized: false } };
      }
    };
  }, []); // Empty dependency array means this effect runs only once
  useEffect(() => {
    if (context.current) {
      // Retrieve the actor and render window from the context
      const { mapper, renderWindow } = context.current;
      console.log(slice);
      (async () => {
        QueryDicomImage(1, slice)
          .then((res) => {
            const slice = new JsonDcm(JSON.parse(res.data));
            const numpixel = slice.width * slice.height;
            const pixarray = new Float32Array(numpixel);
            let i = 0;
            slice.pixelData.forEach((row) => {
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
            imageData.getPointData().setScalars(dataArray);
            imageData.setDimensions([512, 448, 1]);
            mapper.setInputData()
            console.log(slice.pixelData);
            mapper.setInputData(imageData);
            renderWindow.render();
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    }
  }, [slice]);
  return (
    <>
      <Grid container spacing={1}>
        <div>
          resolution: {slice} <br />
          <input
            type="range"
            min="0"
            max="29"
            value={slice}
            onChange={(ev) => setSlice(Number(ev.target.value))}
          />
        </div>
        <div
          ref={vtkContainerRef}
          style={{
            width: "100%",
            height: "80vh",
            border: "5px solid sandybrown", // add border for debugging
          }}
        />
      </Grid>
    </>
  );
}

export default ImageViewerContainer;
