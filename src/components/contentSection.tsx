import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Fade, Grid, List, ListItem, ListItemText, Slide, Theme, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { format, getYear } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useContext } from 'react';
import { useLayoutStyles } from '../App';
import { Profile } from '../context';

const getLabel = (value: string) => {
    switch (value) {
        case 'work':
            return 'Work History';
        default:
            return value;
    }
};

const useStyles = makeStyles((theme: Theme) => ({
    tabPanel: {
        height: `calc(100% - 100px)`,
        '&>div': { padding: theme.spacing(2), height: '100%', overflow: 'auto' },
    },
    experience: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: 350,
            minWidth: 350,
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 390,
            minWidth: 390,
        },
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        background: theme.palette.grey['300'],
        boxShadow: `2px 2px 1px ${theme.palette.grey['600']}`,
        height: '100%',
        '& h5': {
            fontWeight: 500,
        },
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

const getDate = (time: number) => `${format(new Date(time), 'LLLL')}, ${getYear(time)}`;

const ContentSection: React.FC = () => {
    const classes = useStyles();
    const layoutClasses = useLayoutStyles();
    const {
        profileData: { main },
    } = useContext(Profile);

    const [value, setValue] = React.useState('work');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Grid container item className={clsx(layoutClasses.layout, layoutClasses.contentSection)}>
            <Grid item width={'100%'}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="profile tab" variant="fullWidth">
                            {Object.keys(main).map((each) => (
                                <Tab key={each} label={getLabel(each)} value={each} />
                            ))}
                        </TabList>
                    </Box>
                    <TabPanel value="work" className={classes.tabPanel}>
                        <Grid container justifyContent={'space-between'} wrap="nowrap" columnGap={3}>
                            {main.work.map(({ company, designation, from, to, workNotes }, i) => (
                                <Slide in={true} direction="up" timeout={700 + i * 300} key={company}>
                                    <Grid
                                        container
                                        direction={'column'}
                                        alignItems={'flex-start'}
                                        rowGap={1}
                                        item
                                        sm={12}
                                        className={classes.experience}>
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
                                        <Fade in={!!workNotes.length} unmountOnExit>
                                            <Grid item flex={1} className={classes.workDesc}>
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
                                        </Fade>
                                    </Grid>
                                </Slide>
                            ))}
                        </Grid>
                    </TabPanel>
                </TabContext>
            </Grid>
        </Grid>
    );
};

export default ContentSection;
