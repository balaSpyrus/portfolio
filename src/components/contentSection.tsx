import { Box, Fade, Grid, List, ListItem, ListItemText, Slide, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { useLayoutStyles } from '../App';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Profile } from '../context';
import { Height } from '@mui/icons-material';

const getLabel = (value: string) => {
    switch (value) {
        case 'work':
            return 'Work History';
        default:
            return value;
    }
};

const ContentSection = () => {
    const layoutClasses = useLayoutStyles();
    const [value, setValue] = React.useState('work');
    const {
        profileData: { main },
    } = useContext(Profile);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Grid container item className={clsx(layoutClasses.layout, layoutClasses.contentSection)}>
            <Grid item width={'100%'}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                            {Object.keys(main).map((each) => (
                                <Tab label={getLabel(each)} value={each} />
                            ))}
                        </TabList>
                    </Box>
                    <TabPanel value="work" style={{ height: `calc(100% - 100px)` }}>
                        <Grid container style={{ padding: 16, height: '100%', overflow: 'auto', flexDirection: 'column' }} columnGap={3} alignContent={'center'}>
                            {main.work.map(({ company, designation, from, to, workNotes }, i) => (
                                <Slide in={true} direction="up" timeout={700 + (i * 300)}>
                                    <Grid
                                        container
                                        direction={'column'}
                                        alignItems={'center'}
                                        rowGap={1}
                                        item
                                        sm={12}
                                        md={6}
                                        lg={3.5}
                                        style={{
                                            padding: 16,
                                            borderRadius: 10,
                                            background: 'lightgray',
                                            boxShadow: '2px 2px 1px #959494',
                                            height: '100%',
                                            textAlign: 'center'
                                        }}>
                                        <Grid item flex={0}>
                                            <Typography variant="subtitle1">{company}</Typography>
                                        </Grid>
                                        <Grid item flex={0}>
                                            <Typography color={'GrayText'} variant="subtitle2">
                                                {designation}
                                            </Typography>
                                            <Typography variant="subtitle2" color={'GrayText'}>
                                                {`${new Date(from).toLocaleDateString()} - ${to ? new Date(to).toLocaleDateString() : 'Present'
                                                    }`}
                                            </Typography>
                                        </Grid>
                                        <Fade in={!!workNotes.length} unmountOnExit>
                                            <Grid item flex={2} style={{
                                                margin: '0px -16px', overflow: 'auto',
                                                borderRadius: '0 0 10px 10px',
                                                transform: 'translateY(16px)'
                                            }}>
                                                <List
                                                    style={{
                                                        background: 'lightblue',
                                                        padding: 16,
                                                        gap: 8,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: 'calc(100% - 16px)',
                                                        overflow: 'auto',
                                                    }}>
                                                    {workNotes.map((each) => (
                                                        <ListItem style={{

                                                            background: 'yellow',
                                                            borderRadius: 10
                                                        }}>
                                                            <ListItemText
                                                                primary={each}
                                                                style={{ textAlign: 'center' }}
                                                                primaryTypographyProps={{
                                                                    fontSize: 14,
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
                </TabContext >
            </Grid >
        </Grid >
    );
};

export default ContentSection;
