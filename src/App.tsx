import { Grid, Slide, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import './App.scss';
import SideSection from './components/sideSection';
import { Profile } from './context';
import profileData from './profile.json';

export const useLayoutStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#e2e2e2',
    padding: theme.spacing(3),
    height: '100%',
    overflow: 'hidden'
  },
  infoSection: {
    textAlign: 'center',
    height: '100%',
    padding: theme.spacing(2),
    alignContent: 'flex-start',
    justifyContent: 'center'
  },
  contentSection: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 0, 2)
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0, 0, 0)
    }
  },
  layout: {
    borderRadius: theme.spacing(1 / 2),
    background: theme.palette.common.white,
    gap: theme.spacing(2)
  }
}))

function App() {
  const [selectedContent, setContent] = useState('');
  const classes = useLayoutStyles();

  const contextValue = useMemo(() => ({ profileData, setContent }), [])

  return (
    <Profile.Provider value={contextValue}>
      <Grid container className={classes.container}>
        <Slide direction='right' in={true} timeout={800} mountOnEnter unmountOnExit>
          <Grid item sm={3}>
            <SideSection />
          </Grid>
        </Slide>
        <Slide direction='up' in={true} timeout={1000} mountOnEnter unmountOnExit>
          <Grid container item sm={9} >
            <Grid container item className={clsx(classes.layout, classes.contentSection)}>

            </Grid>
          </Grid>
        </Slide>
      </Grid>
    </Profile.Provider>
  );
}

export default App;
