import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard, History, Launch } from '@material-ui/icons';
import {
  Toolbar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  Button,
} from '@material-ui/core';
import rangeMappings from '../../lib/rangeMappings';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  dashboard: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const CustomDrawer = ({ range, handleUpdateRange, handleShowDashboard }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <ListItem button alignItems="center" key="Dashboard" onClick={handleShowDashboard} className={classes.dashboard}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
          <Button variant="contained" color="primary" size="small">Pro</Button>
        </ListItem>
        <Divider />
        <List>
          <ListSubheader>History</ListSubheader>
          {rangeMappings.map((item) => (
            <ListItem
              button
              onClick={() => handleUpdateRange(item.value)}
              key={item.value}
              selected={item.value === range}
            >
              {item.value === range && <ListItemIcon><History /></ListItemIcon>}
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem key="clear">
          <Button endIcon={<Launch />}>
            Clear browsing data
          </Button>
        </ListItem>
      </div>
    </Drawer>
  );
};

CustomDrawer.propTypes = {
  range: PropTypes.string.isRequired,
  handleUpdateRange: PropTypes.func.isRequired,
  handleShowDashboard: PropTypes.func.isRequired,
};

export default CustomDrawer;
