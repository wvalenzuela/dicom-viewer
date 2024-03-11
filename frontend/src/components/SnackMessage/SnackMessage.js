import React, { Component } from 'react';
import { Snackbar, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { amber, green, red } from '@mui/material/colors';
import clsx from 'clsx';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { withStyles } from '../../common';

const useStyles = (theme) => ({
  text: {
    padding: 0,
    maring: 0,
    paddingLeft: theme.spacing(1),
    fontWeight: 500,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};
class SnackMessage extends Component {
  getColor = () => {
    const { type } = this.props;
    if (type === 'success') return green[600];
    if (type === 'error') return red[900];
    if (type === 'info') return amber[600];
    if (type === 'warning') return amber[600];
    return '';
  };
  render() {
    const { classes, open, handleClose, message_text, type } = this.props;
    if (!open || message_text === '' || typeof message_text === 'undefined') {
      return null;
    }
    const { location, horizontal } = this.props;
    if (horizontal !== 'right') {
      location.horizontal = horizontal;
    }
    const Icon = variantIcon[type];
    return (
      <Snackbar
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            key='close'
            onClick={handleClose}
            size='large'
          >
            <CloseIcon />
          </IconButton>
        }
        anchorOrigin={location}
        ContentProps={{
          sx: {
            background: this.getColor(),
          },
        }}
        message={
          <span className={classes.message} id='client-snackbar'>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            <div className={classes.text}>{message_text}</div>
          </span>
        }
        onClose={handleClose}
        open={open}
        style={{
          height: 'auto',
          lineHeight: '28px',
          padding: 24,
          paddingTop: '60px',
          whiteSpace: 'pre-line',
        }}
      />
    );
  }
}

SnackMessage.defaultProps = {
  location: {
    vertical: 'top',
    horizontal: 'right',
  },
  type: 'success',
  horizontal: 'right',
  open: false,
};
SnackMessage.propTypes = {
  horizontal: PropTypes.string,
  location: PropTypes.object.isRequired,
  open: PropTypes.bool,
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(useStyles)(SnackMessage);
