import {
    AccountBoxRounded,
    CallRounded,
    EmailRounded,
    Facebook,
    Instagram,
    LinkedIn,
    WorkRounded,
} from '@mui/icons-material';
import { Avatar, ButtonGroup, Chip, Fade, Grid, Grow, IconButton, Link, Theme, Typography } from '@mui/material';
import * as colors from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { getYear } from 'date-fns';
import { motion } from 'framer-motion';
import sortBy from 'lodash/sortBy';
import { useContext } from 'react';
import { useLayoutStyles } from '../App';
import { Profile } from '../context';
import { getCloudinaryBuilder } from '../utils';
import { name as cName } from '@cloudinary/url-gen/actions/namedTransformation';
import { limitFit } from '@cloudinary/url-gen/actions/resize';

const SKILL_METER = {
    0: colors.red[500],
    1: colors.red[400],
    2: colors.red[300],
    3: colors.deepOrange[500],
    4: colors.deepOrange[300],
    5: colors.orange[500],
    6: colors.lime[300],
    7: colors.lime[500],
    8: colors.green[300],
    9: colors.green[400],
    10: colors.green[500],
};

const useStyles = makeStyles((theme: Theme) => ({
    linkBtn: {
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    },
    logo: {
        width: '1rem',
        height: '1rem',
    },
    skills: {
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1 / 2),
        background: theme.palette.grey[100],
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

const skillContainerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            when: 'beforeChildren',
        },
    },
};
const skillVariants = {
    initial: { x: '-100vw' },
    animate: { x: 0 },
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
                    <Avatar
                        alt={name.first}
                        src={getCloudinaryBuilder(avatarURL).resize(limitFit().width(400).height(400)).toURL()}
                        className={classes.avatar}
                    />
                </Grow>
            </Grid>
            <Grid item>
                <Typography color="primary" variant="h6" fontWeight={600}>
                    {fullName}
                </Typography>
                <Fade in={!!currCompany?.designation} unmountOnExit>
                    <Grid container justifyContent={'center'}>
                        <Grid container item justifyContent={'center'} alignItems={'center'} gap={0.5}>
                            <Grid item>
                                <Avatar
                                    variant="square"
                                    className={classes.logo}
                                    src={getCloudinaryBuilder(currCompany?.imageURL ?? '')
                                        .namedTransformation(cName('media_lib_thumb'))
                                        .toURL()}
                                    alt={currCompany?.name ?? ''}
                                />
                            </Grid>
                            <Grid item>
                                <Typography color="GrayText" variant="subtitle2">
                                    {currCompany?.name}
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
                <ButtonGroup color="primary" component={motion.div}>
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
            <Grid
                container
                item
                sx={{
                    overflow: 'auto',
                }}>
                <Grid
                    container
                    item
                    gap={1}
                    justifyContent="center"
                    className={classes.skills}
                    component={motion.div}
                    variants={skillContainerVariants}>
                    {sortBy(skills, 'level')
                        .reverse()
                        .map(({ name, level }, i) => (
                            <Grid item component={motion.div} variants={skillVariants} key={name}>
                                <Chip
                                    label={name}
                                    variant="filled"
                                    sx={{
                                        background: SKILL_METER[level],
                                    }}
                                    size="small"
                                />
                            </Grid>
                        ))}
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" color="textSecondary" align="justify">
                        {about.replace('{{exp}}', `${getYear(Date.now()) - getYear(startDate)}`)}
                    </Typography>
                </Grid>
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
