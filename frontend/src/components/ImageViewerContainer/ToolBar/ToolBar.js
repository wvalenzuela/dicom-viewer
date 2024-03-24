import React from "react";
import { Toolbar as MuiToolbar, Button } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import StraightenIcon from '@mui/icons-material/Straighten';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';


const ToolBar = ({ onPaintClick, onMeasureClick, onScrollClick }) => {
    return (
      <MuiToolbar>
        <Button variant="contained" color='inherit' startIcon={<BrushIcon />} onClick={onPaintClick}>
        </Button>
        <Button variant="contained" color='inherit' startIcon={<StraightenIcon />} onClick={onMeasureClick}>
        </Button>
        <Button variant="contained" color="inherit" startIcon={<VerticalSplitIcon />} onClick={onScrollClick}>
        </Button>
      </MuiToolbar>
    );
  };

export default ToolBar;