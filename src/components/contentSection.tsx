import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Grid, Theme, useMediaQuery, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { useLayoutStyles } from '../App';
import { Profile } from '../context';
import WorkHistorySection from './workHistorySection';
import WorkIcon from '@mui/icons-material/Work';
import { ProfileContext, WorkType, WorksImgSetType } from '../types';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BuildIcon from '@mui/icons-material/Build';
import * as colors from '@mui/material/colors';
import WorksSection from './worksSection';
import { sortBy } from 'lodash';

type TabSectionType = keyof ProfileContext['profileData']['main'];
type TabSectionValue = ProfileContext['profileData']['main'][TabSectionType];

const getLabel = (value: TabSectionType) => {
    switch (value) {
        case 'work':
            return { label: 'Work History', icon: <WorkIcon /> };
        case 'education':
            return { label: 'Education', icon: <SchoolIcon />, style: { color: colors.orange[500] } };
        case 'accomplishments':
            return { label: 'Accomplishments', icon: <EmojiEventsIcon />, style: { color: colors.red[500] } };
        case 'certificates':
            return { label: 'Certificates', icon: <WorkspacePremiumIcon />, style: { color: colors.green[500] } };
        case 'hobbies':
            return { label: 'Hobbies', icon: <SportsEsportsIcon />, style: { color: colors.purple[500] } };
        case 'someOfMyWorks':
            return { label: 'Some of My Works', icon: <BuildIcon />, style: { color: colors.teal[500] } };
        default:
            return { label: value, icon: <></> };
    }
};
const getComponent = (key: TabSectionType, value: TabSectionValue) => {
    switch (key) {
        case 'work':
            return <WorkHistorySection details={value as WorkType[]} />;
        case 'someOfMyWorks':
            return <WorksSection details={value as WorksImgSetType[]} />;
        default:
            return <pre>{JSON.stringify(value, null, 4)}</pre>;
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
                display: 'block',
            },
        },
    },
    tab: {
        minHeight: 50,
        maxHeight: 50,
    },
}));

const ContentSection: React.FC = () => {
    const layoutClasses = useLayoutStyles();
    const {
        profileData: { main },
    } = useContext(Profile);
    const theme = useTheme<Theme>();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [value, setValue] = React.useState<TabSectionType>('work');
    const classes = useStyles({ selected: value });

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue as TabSectionType);
    };

    const tabSections = sortBy(Object.keys(main).sort().reverse(), (key) => !main[key as TabSectionType].length);

    return (
        <Grid container item className={clsx(layoutClasses.layout, layoutClasses.contentSection)}>
            <Grid item width={'100%'}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            TabIndicatorProps={{
                                sx: {
                                    backgroundColor: getLabel(value).style?.color ?? theme.palette.primary.main,
                                },
                            }}
                            onChange={handleChange}
                            variant={'scrollable'}
                            scrollButtons={isMobileScreen}
                            allowScrollButtonsMobile>
                            {tabSections.map((each) => {
                                const { style, ...restOptions } = getLabel(each as TabSectionType);

                                return (
                                    <Tab
                                        {...restOptions}
                                        key={each}
                                        disabled={!main[each as TabSectionType].length}
                                        iconPosition="start"
                                        style={each === value ? style : undefined}
                                        value={each}
                                        className={classes.tab}
                                    />
                                );
                            })}
                        </TabList>
                    </Box>
                    {tabSections.map((each) => (
                        <TabPanel value={each} key={each} className={classes.tabPanel}>
                            {getComponent(each as TabSectionType, main[each as TabSectionType])}
                        </TabPanel>
                    ))}
                </TabContext>
            </Grid>
        </Grid>
    );
};

export default ContentSection;
