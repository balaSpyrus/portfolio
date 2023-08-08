import {
    AccountBoxRounded,
    CallRounded,
    EmailRounded,
    Facebook,
    Instagram,
    LinkedIn,
    WorkRounded,
} from '@mui/icons-material';
import { Avatar, ButtonGroup, Chip, Fade, Grid, Grow, IconButton, Link, Slide, Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { useContext } from 'react';
import { useLayoutStyles } from '../App';
import { Profile } from '../context';
import { sortBy } from 'lodash';
import { motion } from 'framer-motion';
import { getYear } from 'date-fns';

const useStyles = makeStyles((theme: Theme) => ({
    linkBtn: {
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    },
    logo: {
        width: '1.5rem',
        height: '1.5rem',
    },
    contact: {
        marginTop: 'auto',
        gap: theme.spacing(1),
        '& a': {
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1),
            '& svg': {
                color: theme.palette.primary.main,
            },
        },
    },
    avatar: {
        boxShadow: `0px 0px 10px ${theme.palette.grey['300']}`,
        width: theme.spacing(20),
        height: theme.spacing(20),
        margin: '0 auto',
    },
}));

const getIcon = (key: string) => {
    switch (key) {
        case 'work':
            return <WorkRounded />;
        case 'linkedIn':
            return <LinkedIn />;
        case 'facebook':
            return <Facebook />;
        case 'instagram':
            return <Instagram />;
        default:
            return <AccountBoxRounded />;
    }
};

const SideSection = () => {
    const classes = useStyles();
    const layoutClasses = useLayoutStyles();

    const {
        profileData: {
            name,
            startDate,
            main: { work },
            avatarURL,
            social,
            about,
            contact: { email, phone },
            skills,
        },
    } = useContext(Profile);

    const currCompany = work.find(({ to }) => !to);
    const fullName = Object.values(name).join(' ').trim();

    return (
        <Grid container item className={clsx(layoutClasses.layout, layoutClasses.infoSection)} direction={'column'}>
            <Grid item>
                <Grow in={true} timeout={1000}>
                    <Avatar alt={name.first} src={process.env.PUBLIC_URL + avatarURL} className={classes.avatar} />
                </Grow>
            </Grid>
            <Grid item>
                <Typography color="primary" variant="h6" fontWeight={600}>
                    {fullName}
                </Typography>
                <Fade in={!!currCompany?.designation} unmountOnExit>
                    <Grid container justifyContent={'center'}>
                        <Grid container item justifyContent={'center'} gap={0.5}>
                            <Grid item>
                                <Avatar
                                    variant="square"
                                    className={classes.logo}
                                    src={process.env.PUBLIC_URL + (currCompany?.logoURL ?? '')}
                                    alt={currCompany?.company ?? ''}
                                />
                            </Grid>
                            <Grid item>
                                <Typography color="GrayText" variant="subtitle2">
                                    {currCompany?.company}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography color="GrayText" variant="subtitle2">
                                {currCompany?.designation}
                            </Typography>
                        </Grid>
                    </Grid>
                </Fade>
            </Grid>
            <Grid item>
                <ButtonGroup color="primary">
                    {Object.entries(social).map(([platform, url]) =>
                        url ? (
                            <IconButton
                                href={url}
                                target="_blank"
                                className={classes.linkBtn}
                                size="large"
                                component={motion.a}
                                key={platform}>
                                {getIcon(platform)}
                            </IconButton>
                        ) : (
                            <></>
                        ),
                    )}
                </ButtonGroup>
            </Grid>
            <Slide direction="right" in={!!skills.length} timeout={500}>
                <Grid container item spacing={1} justifyContent="center">
                    {sortBy(skills, 'level')
                        .reverse()
                        .map(({ name }, i) => (
                            <Grid
                                item
                                component={motion.div}
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                key={name}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 1.1 }}
                                transition={{
                                    duration: 0.1 + i * 0.05,
                                }}>
                                <Chip label={name} variant="filled" color="success" size="small" />
                            </Grid>
                        ))}
                </Grid>
            </Slide>
            <Grid item>
                <Typography variant="subtitle2" color="textSecondary" align="justify">
                    {about.replace('{{exp}}', `${getYear(Date.now()) - getYear(startDate)}`)}
                </Typography>
            </Grid>
            <Grid container item justifyContent="space-between" className={classes.contact}>
                <Link color="textSecondary" variant="subtitle2" underline="hover">
                    <EmailRounded />
                    {email}
                </Link>
                <Link color="textSecondary" variant="subtitle2" underline="hover">
                    <CallRounded />
                    +91 {phone}
                </Link>
            </Grid>
        </Grid>
    );
};

export default SideSection;
