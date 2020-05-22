import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsMenu from '../SettingsMenu/index';
import { ThemeContext } from '../../context/ThemeContext';

const useStyles = makeStyles((theme) => ({
  appBar: (props) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: props.backgroundColor,
    color: props.color,
  }),
  grow: {
    flexGrow: 1,
  },
  menuButton: (props) => ({
    marginRight: theme.spacing(2),
    color: props.color,
  }),
}));

const Header = () => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const currentTheme = useContext(ThemeContext);

  let themeProps;
  if (currentTheme.palette.type === 'dark') {
    themeProps = {
      backgroundColor: currentTheme.palette.background.default,
      color: currentTheme.palette.primary,
    };
  } else {
    themeProps = { backgroundColor: currentTheme.palette.primary, color: 'white' };
  }
  const classes = useStyles(themeProps);

  const handleSettingsClick = (e) => {
    setPopoverAnchorEl(e.currentTarget);
  };

  const handleSettingsClose = () => {
    setPopoverAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Browser Time
        </Typography>
        <div className={classes.grow} />
        <div>
          <Tooltip title="Settings" placement="bottom" arrow aria-label="settings">
            <IconButton onClick={handleSettingsClick} className={classes.menuButton}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <SettingsMenu
            open={Boolean(popoverAnchorEl)}
            anchorEl={popoverAnchorEl}
            handleClose={handleSettingsClose}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
