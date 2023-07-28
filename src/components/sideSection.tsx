import {
    Avatar,
    ButtonGroup,
    Fade,
    Grid,
    IconButton,
    Link,
    Theme,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AccountBoxRounded, CallRounded, EmailRounded, Facebook, Instagram, LinkedIn, WorkRounded } from '@mui/icons-material';
import React, { useContext, } from 'react';
import { Profile } from '../context';
import { useLayoutStyles } from '../App';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        "&>*": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.secondary.light,
            borderRadius: 5,
            border: '2px solid white',
            transition: '200ms all ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
                transition: '200ms all ease-in-out',
            }
        }
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
        margin: '0 auto',
    }
}))

const getIcon = (key: string) => {

    switch (key) {
        case 'work':
            return <WorkRounded />
        case 'linkedIn':
            return <LinkedIn />
        case 'facebook':
            return <Facebook />
        case 'instagram':
            return <Instagram />
        default:
            return <AccountBoxRounded />
    }
}

const SideSection = () => {

    const classes = useStyles();
    const layoutClasses = useLayoutStyles();

    const theme = useTheme();
    const { profileData: {
        name, main: { work }, avatarURL, social, about, contact: { email, phone }
    }, setContent } = useContext(Profile)

    const currCompany = work.find(({ current }) => current);
    const fullName = Object.values(name).join(' ').trim()

    return (
        <Grid container item className={clsx(layoutClasses.layout, layoutClasses.infoSection)} direction={'column'}>
            <Grid item >
                <Avatar alt={name.first} src={avatarURL}
                    className={classes.avatar} />
            </Grid>
            <Grid item >
                <Typography color='primary' variant='h6'>{fullName}</Typography>
                <Fade in={!!currCompany?.designation} unmountOnExit>
                    <Typography color='textPrimary' variant='subtitle1'>{currCompany?.designation}</Typography>
                </Fade>
            </Grid>
            <Grid item >
                <ButtonGroup color='primary'>
                    {
                        Object.entries(social).map(([platform, url]) => <Fade in={!!url} unmountOnExit>
                            <IconButton
                                href={url} target='_blank'
                                size="large">{getIcon(platform)}</IconButton>
                        </Fade>)
                    }
                </ButtonGroup>
            </Grid>
            <Grid item >
                <Typography variant='subtitle2' color='textSecondary' align='justify'>
                    {about}
                </Typography>
            </Grid>
            <Grid container item justifyContent='space-between' className={classes.contact} >
                <Link color='textSecondary' variant='subtitle2' underline="hover"><EmailRounded />{email}</Link>
                <Link color='textSecondary' variant='subtitle2' underline="hover"><CallRounded />+91 {phone}</Link>
            </Grid>
        </Grid>
    )
}

export default SideSection
