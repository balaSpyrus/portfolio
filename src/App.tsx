import { Avatar, ButtonGroup, Fade, Grid, IconButton, Link, makeStyles, Theme, Tooltip, Typography, withStyles } from '@material-ui/core';
import { LinkedIn, EmailRounded, CallRounded, Facebook, Instagram } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import './App.scss';

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2)
  },
}))(Tooltip);

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
  summary: {
  },
  contact: {
    marginTop: 'auto',

    "&>*": {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      "& svg": {
        color: theme.palette.primary.main
      },
      "&:last-child": {
        paddingBottom: 0
      }
    }
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
        <Grid item container spacing={3} style={{ gap: 32, padding: 24 }}>
          <Grid container item sm={3} spacing={2} alignItems='center' direction='column' className={clsx(classes.mainSection, classes.infoSection)}>
            <Grid item>
              <Avatar alt="Balasubramanian Nagarajan" src="/asserts/images/profile.png"
                className={classes.avatar} />
            </Grid>
            <Grid item>
              <Typography color='primary' variant='h6'>Balasubramanian Nagarajan</Typography>
              <Typography color='textPrimary' variant='subtitle1'>Software Engineer III</Typography></Grid>
            <Grid item>
              <ButtonGroup color='primary'>
                <IconButton href='https://www.linkedin.com/in/balasubramanian-nagarajan-9554438a/'> <LinkedIn /></IconButton>
                <IconButton> <Facebook /></IconButton>
                <IconButton> <Instagram /></IconButton>
              </ButtonGroup>
            </Grid>
            <Grid item className={classes.summary}>
              <LightTooltip arrow interactive placement='right'
                leaveDelay={400}
                TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}
                title={
                  <Typography variant='subtitle2' color='textSecondary' align='justify'>
                    Creative Engineer offering 5 years of experience.
                    Enthusiastic about developing forward thinking solutions to tomorrow's
                    productivity problems. Resourceful and adaptable approach to challenges.
                    Highly effective at developing new programs and fixing problems
                    with existing systems.
                </Typography>
                }>
                <Typography variant='subtitle2' color='primary' >
                  Few words about me
              </Typography>
              </LightTooltip>
            </Grid>
            <Grid container item justify='space-between' className={classes.contact}>
              <Link color='textSecondary' variant='subtitle2'><EmailRounded />bbalax.bbalax@gmail.com</Link>
              <Link color='textSecondary' variant='subtitle2'><CallRounded />+91 9487680919</Link>
            </Grid>
          </Grid>
          <Grid container item sm={9} spacing={2} direction='column' className={classes.mainSection}>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
