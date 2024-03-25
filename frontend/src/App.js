import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {
  SideBar,
  ToolBar,
  MetaInformationContainer,
  ImageViewerContainer,
} from "./components";

const defaultTheme = createTheme();

export default function App() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <ToolBar open={open} toggleDrawer={toggleDrawer} />
        <SideBar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Sets up routing for the application */}
            <Routes>
              {/* Renders the MetaInformationContainer at the root path.
                  This component displays DICOM file metadata, acting as the landing page of the app. */}
              <Route path="/" element={<MetaInformationContainer />} />
              {/* Directs to ImageViewerContainer for viewing DICOM images. */}
              <Route path="/image-viewer" element={<ImageViewerContainer />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
