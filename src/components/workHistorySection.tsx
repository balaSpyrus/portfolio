import { Avatar, Grid, List, ListItem, ListItemText, Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { Profile } from '../context';
import { getDate } from '../utils';

const useStyles = makeStyles((theme: Theme) => ({
    experience: {
        [theme.breakpoints.down('xl')]: {
            maxWidth: 'calc(33.33% - 16px)',
            minWidth: 'calc(33.33% - 16px)',
        },
        [theme.breakpoints.down('lg')]: {
            maxWidth: 'calc(50% - 16px)',
            minWidth: 'calc(50% - 16px)',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
            minWidth: 'unset',
            height: '40%',
            marginBottom: theme.spacing(2),
        },
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        background: theme.palette.grey['300'],
        boxShadow: `2px 2px 1px ${theme.palette.grey['600']}`,
        overflow: 'hidden',
        height: '100%',
        '& h5': {
            fontWeight: 500,
        },
    },
    logo: {
        width: '15rem',
        height: `15rem`,
        position: 'absolute',
        opacity: 0.125,
    },
    workDesc: {
        margin: `0px -${theme.spacing(2)}`,
        overflow: 'auto',
        borderRadius: theme.spacing(0, 0, 1, 1),
        border: `1px solid ${theme.palette.primary.light}`,
        transform: `translateY(${theme.spacing(2)})`,
        '& ul': {
            background: theme.palette.primary.light,
            padding: theme.spacing(2),
            gap: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            height: `calc(100% - ${theme.spacing(4)})`,
            overflow: 'auto',
        },
    },
    listItem: {
        background: theme.palette.common.white,
        borderRadius: 10,
        transition: `200ms all ease-in-out`,
        '&>div': {
            textAlign: 'center',
            color: theme.palette.primary.dark,
        },
    },
}));

const WorkHistorySection = () => {
    const classes = useStyles();

    const {
        profileData: {
            main: { work },
        },
    } = useContext(Profile);

    return (
        <Grid container justifyContent={'space-between'} wrap="nowrap" gap={3}>
            {work.map(({ company, designation, from, to, workNotes, logoURL = '' }, i) => (
                <Grid
                    key={company}
                    component={motion.div}
                    initial={{ y: '200%' }}
                    animate={{ y: 0 }}
                    transition={{
                        duration: 0.5 + i * 0.25,
                    }}
                    container
                    direction={'column'}
                    alignItems={'flex-start'}
                    rowGap={1}
                    item
                    sm={12}
                    className={classes.experience}>
                    <Avatar
                        component={motion.div}
                        animate={{ x: [-50, 0, 0, -50], y: [0, 0, 50, 0], scale: [1.5, 2] }}
                        transition={{
                            duration: 60,
                            repeat: Infinity,
                        }}
                        className={classes.logo}
                        src={process.env.PUBLIC_URL + logoURL}
                        alt={company}
                    />
                    <Grid item flex={0}>
                        <Typography variant="h5" color={'primary'}>
                            {company}
                        </Typography>
                    </Grid>
                    <Grid item flex={0}>
                        <Typography color={'GrayText'} variant="subtitle2">
                            {designation}
                        </Typography>
                        <Typography variant="subtitle2" color={'GrayText'}>
                            {`${getDate(from)} - ${to ? getDate(to) : 'Present'}`}
                        </Typography>
                    </Grid>
                    {workNotes.length ? (
                        <Grid
                            item
                            flex={1}
                            className={classes.workDesc}
                            animate={{ opacity: 1 }}
                            component={motion.div}>
                            <List>
                                {workNotes.map((each, i) => (
                                    <ListItem
                                        key={each}
                                        className={classes.listItem}
                                        component={motion.li}
                                        whileHover={{
                                            scale: 0.95,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            opacity: {
                                                duration: 0.5 + i * 0.5,
                                            },
                                            scale: { duration: 0.05 },
                                        }}>
                                        <ListItemText
                                            primary={each}
                                            primaryTypographyProps={{
                                                fontSize: '0.875rem',
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    ) : (
                        <></>
                    )}
                </Grid>
            ))}
        </Grid>
    );
};

export default WorkHistorySection;
