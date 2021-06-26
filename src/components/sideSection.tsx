import { Avatar, ButtonGroup, Fade, Grid, GridSize, Grow, IconButton, Link, makeStyles, Theme, Typography } from '@material-ui/core';
import { AccountBoxRounded, CallRounded, EmailRounded, Facebook, Instagram, LinkedIn, WorkRounded } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { Profile } from '../context';

const useStyles = makeStyles((theme: Theme) => ({
    mainGrid: {
        height: 'calc(100% - 440px)',
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

        "&:hover": {
            boxShadow: `0px 0px 20px 0px #00000021`,
        }

    }
}))

const getIcon = (key: string) => {

    switch (key) {
        case 'work':
            return <WorkRounded />
        default:
            return <AccountBoxRounded />
    }
}

const SideSection = () => {

    const classes = useStyles();
    const {profileData,setContent} = useContext(Profile)
    const currCompany = profileData.main.work.find(each => each.current);
    const name = Object.keys(profileData.name).reduce((acc, curr) => `${acc} ${(profileData.name as any)[curr] ?? ''}`, "").trim()
    const [showDesc, setShowDesc] = useState(false);

    const Content = Object.keys(profileData.main).map((each, i, arr) => {

        const grid = Math.ceil(12 / arr.length) as GridSize

        return <Grid key={i} item xs={grid >= 4 ? grid : 4}
            onClick={() => setContent(each)}>{getIcon(each)}</Grid>
    })

    const InfoSection = () => <>
        <Grid item>
            <Avatar alt="Balasubramanian Nagarajan" src={profileData.avatarURL}
                className={classes.avatar} />
        </Grid>
        <Grid item>
            <Typography color='primary' variant='h6'>{name}</Typography>
            <Fade in={!!currCompany?.designation} unmountOnExit>
                <Typography color='textPrimary' variant='subtitle1'>{currCompany?.designation}</Typography>
            </Fade>
        </Grid>
        <Grid item>
            <ButtonGroup color='primary'>
                <IconButton href={profileData.social.linkedInURL}> <LinkedIn /></IconButton>
                <Fade in={!!profileData.social.facebookURL} unmountOnExit>
                    <IconButton href='https://www.linkedin.com/in/balasubramanian-nagarajan-9554438a/'> <Facebook /></IconButton>
                </Fade>
                <Fade in={!!profileData.social.instagramURL} unmountOnExit>
                    <IconButton href='https://www.linkedin.com/in/balasubramanian-nagarajan-9554438a/'> <Instagram /></IconButton>
                </Fade>
            </ButtonGroup>
        </Grid>
        <Grid item
            onMouseLeave={() => setShowDesc(false)}
            onMouseEnter={() => setShowDesc(true)}>
            <Typography variant='subtitle2' color='primary' >
                Few words about me
            </Typography>
        </Grid>
        <Grow in={showDesc} mountOnEnter unmountOnExit timeout={{
            enter: 500,
            exit: 0
        }}>
            <Grid item>
                <Typography variant='subtitle2' color='textSecondary' align='justify'>
                    {profileData.about}
                </Typography>
            </Grid>
        </Grow>
    </>
    const NavSection = () => <Grow in={!showDesc} mountOnEnter unmountOnExit timeout={{
        enter: 500,
        exit: 0
    }}>
        <Grid container item spacing={2} className={classes.mainGrid} justify='space-evenly' >
            {Content}
        </Grid>
    </Grow>

    const ContactSection = () => <Grid container item justify='space-between' className={classes.contact}>
        <Link color='textSecondary' variant='subtitle2'><EmailRounded />{profileData.contact.email}</Link>
        <Link color='textSecondary' variant='subtitle2'><CallRounded />{profileData.contact.phone}</Link>
    </Grid>

    return (
        <>
            <InfoSection />
            <NavSection />
            <ContactSection />
        </>

    )
}

export default SideSection
