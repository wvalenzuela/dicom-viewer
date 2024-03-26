import React from "react";
import { Toolbar as MuiToolbar, Button } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import StraightenIcon from '@mui/icons-material/Straighten';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';

const iconStyle = {
  marginRight: '0px', // Centers the icon, as it takes away the space for the text expected by the mui-toolbar
};

const ToolBar = ({ onPaintClick, onMeasureClick, onScrollClick }) => {
  return (
    <MuiToolbar>
      <Button variant="contained" color='inherit' onClick={onPaintClick}>
        <BrushIcon style={iconStyle} />
      </Button>
      <Button variant="contained" color='inherit' onClick={onMeasureClick}>
        <StraightenIcon style={iconStyle} />
      </Button>
      <Button variant="contained" color="inherit" onClick={onScrollClick}> 
        <VerticalSplitIcon style={iconStyle} /> 
      </Button>
    </MuiToolbar>
  );
};

export default ToolBar;