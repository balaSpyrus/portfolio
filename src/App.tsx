import { CircularProgress, Grid, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Transition, Variants, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './App.scss';
import ContentSection from './components/contentSection';
import SideSection from './components/sideSection';
import { Profile } from './context';
import { ProfileContext } from './types';

const transition: Transition = {
    type: 'spring',
    stiffness: 120,
    duration: 0.5,
};

const layoutXVariants: Variants = {
    initial: { x: '-100vw' },
    animate: { x: 0, transition },
};

const layoutYVariants: Variants = {
    initial: { y: '100vh' },
    animate: { y: 0, transition },
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
        position: 'relative',
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
                    variants={layoutXVariants}
                    initial="initial"
                    animate="animate">
                    <SideSection />
                </Grid>
                <Grid
                    container
                    item
                    sm={9}
                    component={motion.div}
                    variants={layoutYVariants}
                    initial="initial"
                    animate="animate">
                    <ContentSection />
                </Grid>
            </Grid>
        </Profile.Provider>
    );
}

export default App;
