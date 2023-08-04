import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Grid, Theme, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { useLayoutStyles } from '../App';
import { Profile } from '../context';
import WorkHistorySection from './workHistorySection';
import WorkIcon from '@mui/icons-material/Work';
import { ProfileContext } from '../types';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BuildIcon from '@mui/icons-material/Build';

type TabSectionType = keyof ProfileContext['profileData']['main'];

const getLabel = (value: TabSectionType) => {
    switch (value) {
        case 'work':
            return { label: 'Work History', icon: <WorkIcon /> };
        case 'education':
            return { label: 'Education', icon: <SchoolIcon /> };
        case 'accomplishments':
            return { label: 'Accomplishments', icon: <EmojiEventsIcon /> };
        case 'certificates':
            return { label: 'Certificates', icon: <WorkspacePremiumIcon /> };
        case 'hobbies':
            return { label: 'Hobbies', icon: <SportsEsportsIcon /> };
        case 'someOfMyWorks':
            return { label: 'Some of My Works', icon: <BuildIcon /> };
        default:
            return { label: value, icon: <></> };
    }
};
const getComponent = (value: TabSectionType) => {
    switch (value) {
        case 'work':
            return <WorkHistorySection />;
        default:
            return <span>{value}</span>;
    }
};

const useStyles = makeStyles((theme: Theme) => ({
    tabPanel: {
        height: `calc(100% - 100px)`,
        '&>div': {
            padding: theme.spacing(2),
            height: '100%',
            overflow: 'auto',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        },
    },
    tab: {
        minHeight: 50,
        maxHeight: 50,
    },
}));

const ContentSection: React.FC = () => {
    const classes = useStyles();
    const layoutClasses = useLayoutStyles();
    const {
        profileData: { main },
    } = useContext(Profile);
    const theme = useTheme<Theme>();
    const isMobileScreen = theme.breakpoints.down('sm');

    const [value, setValue] = React.useState('work');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Grid container item className={clsx(layoutClasses.layout, layoutClasses.contentSection)}>
            <Grid item width={'100%'}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            variant={isMobileScreen ? 'scrollable' : 'fullWidth'}
                            scrollButtons
                            allowScrollButtonsMobile>
                            {Object.keys(main).map((each) => (
                                <Tab
                                    key={each}
                                    iconPosition="start"
                                    {...getLabel(each as TabSectionType)}
                                    value={each}
                                    className={classes.tab}
                                />
                            ))}
                        </TabList>
                    </Box>
                    {Object.keys(main).map((each) => (
                        <TabPanel value={each} key={each} className={classes.tabPanel}>
                            {getComponent(each as TabSectionType)}
                        </TabPanel>
                    ))}
                </TabContext>
            </Grid>
        </Grid>
    );
};

export default ContentSection;
