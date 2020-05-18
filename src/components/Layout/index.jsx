import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flexDirection: 'column',
    padding: theme.spacing(2),
    marginTop: '64px',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      {children}
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
