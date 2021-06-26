import { Grid, makeStyles, Slide, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import './App.scss';
import SideSection from './components/sideSection';
import { Profile } from './context';
import profileData from './profile.json';

// const LightTooltip = withStyles((theme: Theme) => ({
//   tooltip: {
//     backgroundColor: theme.palette.common.white,
//     boxShadow: theme.shadows[3],
//     padding: theme.spacing(2)
//   },
// }))(Tooltip);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#e2e2e2',
    padding: theme.spacing(4),
    height: '100%',
    overflow: 'hidden'
  },
  infoSection: {
    textAlign: 'center'
  },
  mainSection: {
    borderRadius: theme.spacing(1) - 3,
    background: theme.palette.common.white,
    flexDirection: 'column'
  }
}))

function App() {
  const [selectedContent, setContent] = useState('');
  const classes = useStyles();
  
  return (
    <Profile.Provider value={{ profileData,setContent  }}>
    <div className='app'>
      <Grid container className={classes.container}>
        <Grid item container spacing={3} style={{ gap: 32, padding: 24 }}>
          <Slide direction='right' in={true} timeout={800} mountOnEnter unmountOnExit>
            <Grid container item sm={3} spacing={2} alignItems='center' direction='column' className={clsx(classes.mainSection, classes.infoSection)}>
              <SideSection />
            </Grid>
          </Slide>
          <Slide direction='up' in={true} timeout={1000} mountOnEnter unmountOnExit>
            <Grid container item sm={9} spacing={2} direction='column' className={classes.mainSection}>
            </Grid>
          </Slide>
        </Grid>
      </Grid>
    </div>
    </Profile.Provider>
  );
}

export default App;
