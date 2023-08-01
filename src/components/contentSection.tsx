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

const getLabel = (value: string) => {
    switch (value) {
        case 'work':
            return 'Work History';
        default:
            return value;
    }
};
const getComponent = (value: string) => {
    switch (value) {
        case 'work':
            return <WorkHistorySection />;
        default:
            return <></>;
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
                            aria-label="profile tab"
                            variant={isMobileScreen ? 'scrollable' : 'fullWidth'}
                            scrollButtons
                            allowScrollButtonsMobile>
                            {Object.keys(main).map((each) => (
                                <Tab key={each} label={getLabel(each)} value={each} />
                            ))}
                        </TabList>
                    </Box>
                    {Object.keys(main).map((each) => (
                        <TabPanel value={each} key={each} className={classes.tabPanel}>
                            {getComponent(each)}
                        </TabPanel>
                    ))}
                </TabContext>
            </Grid>
        </Grid>
    );
};

export default ContentSection;
