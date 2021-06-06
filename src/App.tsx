import { Avatar, ButtonGroup, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import './App.scss';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#e2e2e2',
    padding: theme.spacing(2),
    height: '100%',
    gap: theme.spacing(2),
  },
  mainSection: {
    borderRadius: '5px',
    background: 'white',
    flexDirection: 'column'
  },
  avatar: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    transition: '250ms all ease-in',

    "&:hover": {
      boxShadow: `0px 0px 20px 0px #00000021`,
    }

  }
}))

function App() {

  const classes = useStyles();
  return (
    <div className='app'>
      <Grid container className={classes.container}>
        <Grid container item xs={3} alignItems='center' className={classes.mainSection}>
          <Avatar alt="Balasubramanian Nagarajan" src="/asserts/images/profile.png"
            className={classes.avatar} />
          <Typography variant='h3'>Balasubramanian Nagarajan</Typography>
        </Grid>
        <Grid container item style={{ flex: 1 }} className={classes.mainSection}>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
