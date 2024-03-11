import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import * as React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { getDisplayName } from '@mui/utils';
// import makeStyles from '../makeStyles';
// import getThemeProps from '../getThemeProps';
// import useTheme from '../useTheme';

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.
import { jsx as _jsx } from 'react/jsx-runtime';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

const getThemeProps = (params) => {
  const { theme, name, props } = params;
  if (
    !theme ||
    !theme.components ||
    !theme.components[name] ||
    !theme.components[name].defaultProps
  ) {
    return props;
  }
  const output = _extends({}, props);

  // Resolve default props, code borrow from React source.
  // https://github.com/facebook/react/blob/15a8f031838a553e41c0b66eb1bcf1da8448104d/packages/react/src/ReactElement.js#L221
  const defaultProps = theme.components[name].defaultProps;
  let propName;
  for (propName in defaultProps) {
    if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  }
  return output;
};

const _excluded = ['defaultTheme', 'withTheme', 'name'],
  _excluded2 = ['classes'];
const withStyles =
  (stylesOrCreator, options = {}) =>
  (Component) => {
    const { defaultTheme, withTheme = false, name } = options,
      stylesOptions = _objectWithoutPropertiesLoose(options, _excluded);
    if (process.env.NODE_ENV !== 'production') {
      if (Component === undefined) {
        throw new Error(
          [
            'You are calling withStyles(styles)(Component) with an undefined component.',
            'You may have forgotten to import it.',
          ].join('\n')
        );
      }
    }
    let classNamePrefix = name;
    if (process.env.NODE_ENV !== 'production') {
      if (!name) {
        // Provide a better DX outside production.
        const displayName = getDisplayName(Component);
        if (displayName !== undefined) {
          classNamePrefix = displayName;
        }
      }
    }
    const useStyles = styled(
      stylesOrCreator,
      _extends(
        {
          defaultTheme,
          Component,
          name: name || Component.displayName,
          classNamePrefix,
        },
        stylesOptions
      )
    );
    const WithStyles = /*#__PURE__*/ React.forwardRef(function WithStyles(
      props,
      ref
    ) {
      const other = _objectWithoutPropertiesLoose(props, _excluded2);
      // The wrapper receives only user supplied props, which could be a subset of
      // the actual props Component might receive due to merging with defaultProps.
      // So copying it here would give us the same result in the wrapper as well.
      const classes = useStyles(_extends({}, Component.defaultProps, props));
      let theme;
      let more = other;
      if (typeof name === 'string' || withTheme) {
        // name and withTheme are invariant in the outer scope
        // eslint-disable-next-line react-hooks/rules-of-hooks
        theme = useTheme() || defaultTheme;
        if (name) {
          more = getThemeProps({
            theme,
            name,
            props: other,
          });
        }

        // Provide the theme to the wrapped component.
        // So we don't have to use the `withTheme()` Higher-order Component.
        if (withTheme && !more.theme) {
          more.theme = theme;
        }
      }
      return /*#__PURE__*/ _jsx(
        Component,
        _extends(
          {
            ref: ref,
            classes: classes,
          },
          more
        )
      );
    });
    process.env.NODE_ENV !== 'production'
      ? (WithStyles.propTypes = {
          /**
           * Override or extend the styles applied to the component.
           */
          classes: PropTypes.object,
        })
      : void 0;
    if (process.env.NODE_ENV !== 'production') {
      WithStyles.displayName = `WithStyles(${getDisplayName(Component)})`;
    }
    hoistNonReactStatics(WithStyles, Component);
    if (process.env.NODE_ENV !== 'production') {
      // Exposed for test purposes.
      WithStyles.Naked = Component;
      WithStyles.options = options;
      WithStyles.useStyles = useStyles;
    }
    return WithStyles;
  };
export default withStyles;
