import React from "react";
import { Toolbar as MuiToolbar, Button } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import StraightenIcon from '@mui/icons-material/Straighten';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';


const ControlBar = ({ onPaintClick, onMeasureClick, onScrollClick }) => {
    return (
      <MuiToolbar>
        <Button variant="contained" color="primary" startIcon={<BrushIcon />} onClick={onPaintClick}>
        </Button>
        <Button variant="contained" color="primary" startIcon={<StraightenIcon />} onClick={onMeasureClick}>
        </Button>
        <Button variant="contained" color="primary" startIcon={<VerticalSplitIcon />} onClick={onScrollClick}>
        </Button>
      </MuiToolbar>
    );
  };

export default ControlBar;