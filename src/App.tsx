import { CircularProgress, Grid, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from 'react';
import './App.scss';
import ContentSection from './components/contentSection';
import SideSection from './components/sideSection';
import { Profile } from './context';
import { ProfileContext } from './types';
import { motion } from 'framer-motion';

const transition = {
    type: 'spring',
    bounce: 0.5,
    duration: 1.3,
};

export const useLayoutStyles = makeStyles((theme: Theme) => ({
    container: {
        background: '#e2e2e2',
        padding: theme.spacing(3),
        height: '100%',
        overflow: 'auto',
        '& > *': {
            height: '100%',
        },
    },
    infoSection: {
        textAlign: 'center',
        height: '100%',
        padding: theme.spacing(2),
        alignContent: 'flex-start',
    },
    contentSection: {
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(0, 0, 0, 2),
        },
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(2, 0, 0, 0),
        },
    },
    layout: {
        borderRadius: theme.spacing(1 / 2),
        background: theme.palette.common.white,
        gap: theme.spacing(2),
        overflow: 'auto',
        height: '100%',
        flexWrap: 'nowrap',
    },
}));

function App() {
    const classes = useLayoutStyles();

    const [profileData, setProfileData] = useState<ProfileContext['profileData']>();

    const getProfile = async () => {
        fetch('profile.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((data) => data.json())
            .then((data) => setProfileData(data as ProfileContext['profileData']));
    };

    useEffect(() => {
        getProfile();
    }, []);

    if (!profileData) {
        return (
            <Grid container height={'100%'} alignItems={'center'} justifyContent={'center'}>
                <Grid item>
                    <CircularProgress size={'5rem'} />
                </Grid>
            </Grid>
        );
    }

    return (
        <Profile.Provider value={{ profileData }}>
            <Grid container className={classes.container}>
                <Grid
                    container
                    sm={3}
                    component={motion.div}
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    transition={transition}>
                    <SideSection />
                </Grid>
                <Grid
                    container
                    item
                    sm={9}
                    component={motion.div}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={transition}>
                    <ContentSection />
                </Grid>
            </Grid>
        </Profile.Provider>
    );
}

export default App;
