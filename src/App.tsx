import { CircularProgress, Grid, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Transition, Variants, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import ContentSection from './components/contentSection';
import SideSection from './components/sideSection';
import { Profile } from './context';
import { ProfileContext } from './types';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { Firestore, addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './firebaseConfig';

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
    const [fireBaseConfig, setFireBaseConfig] = useState<ProfileContext['fireBaseConfig']>();

    const saveProfileData = useCallback(async (profileData: ProfileContext['profileData'], db: Firestore) => {
        const ref = collection(db, 'portfolio_data'); // Firebase creates this automatically

        let data = {
            portfolioData: profileData,
        };

        try {
            const savedData = await addDoc(ref, data);
            console.log('Document written with ID: ', savedData.id);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const getProfile = async () =>
        fetch('profile.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((data) => data.json() as unknown as ProfileContext['profileData']);

    const getSavedData = useCallback(
        async (db: Firestore) => {
            await getDocs(collection(db, 'portfolio_data')).then(async (querySnapshot) => {
                const portfolioData: ProfileContext['profileData'][] = querySnapshot.docs.map((doc) => ({
                    ...doc.data().portfolioData,
                    id: doc.id,
                }));
                if (portfolioData.length) {
                    setProfileData(portfolioData[0]);
                } else {
                    const profileData = await getProfile();
                    await saveProfileData(profileData, db);
                    setProfileData(profileData);
                }
            });
        },
        [saveProfileData],
    );

    const initializeFireBase = () => {
        const app = initializeApp(FIREBASE_CONFIG);
        const analytics = getAnalytics(app);
        const fireStore = getFirestore(app);
        setFireBaseConfig({ analytics, fireStore });
    };

    useEffect(() => {
        initializeFireBase();
    }, []);

    useEffect(() => {
        if (fireBaseConfig?.fireStore && !profileData) {
            getSavedData(fireBaseConfig.fireStore);
        }
    }, [fireBaseConfig?.fireStore, getSavedData, profileData]);

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
        <Profile.Provider value={{ profileData, fireBaseConfig }}>
            <Grid container className={classes.container}>
                <Grid
                    container
                    item
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
