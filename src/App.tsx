import { Avatar, ButtonGroup, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { LinkedIn } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import './App.scss';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#e2e2e2',
    padding: theme.spacing(4),
    height: '100%',
  },
  infoSection: {
    textAlign: 'center'
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
        <Grid item container spacing={3} direction='column' style={{  gap: 32, padding: 24 }}>
          <Grid container item xs={3} spacing={2} alignItems='center' direction='column' className={clsx(classes.mainSection, classes.infoSection)}>
            <Grid item>
              <Avatar alt="Balasubramanian Nagarajan" src="/asserts/images/profile.png"
                className={classes.avatar} />
            </Grid>
            <Grid item>
              <Typography variant='h6'>Balasubramanian Nagarajan</Typography>
              <Typography variant='subtitle1'>Software Engineer III</Typography></Grid>
            <Grid item>
              <ButtonGroup>
                <IconButton> <LinkedIn /></IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid container item xs={9} spacing={2} direction='column' className={classes.mainSection}>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
