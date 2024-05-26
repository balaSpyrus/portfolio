import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, ImageList, ImageListItem, ImageListItemBar, Theme, Typography, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import { Variants, motion } from 'framer-motion';
import React from 'react';
import { WorksImgSetType } from '../types';

import { Accordion, AccordionDetails, AccordionSummary } from './common/accordian';

interface Props {
    details: WorksImgSetType[];
}

const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            when: 'beforeChildren',
        },
    },
};

const childrenVarients: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            when: 'beforeChildren',
        },
    },
};

const useStyles = makeStyles((theme: Theme) => ({
    img: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        display: 'block',
    },
    iframe: {
        width: '100%',
        minHeight: '650px',
        border: 'none',
        outline: 'none',
    },
    imgListItem: {
        cursor: 'pointer',
        '&:after': {
            content: `""`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(120deg, #000000, #000)',
            opacity: 0.5,
            transition: 'all 0.2s ease-in-out',
        },
        '&:hover:after': {
            opacity: 0,
            transition: 'all 0.2s ease-in-out',
        },
    },
}));

const WorksSection: React.FC<Props> = ({ details: imgSet }) => {
    const classes = useStyles();
    const theme = useTheme<Theme>();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid style={{ padding: 0 }}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="website-content" id="website-header">
                    <Typography>Personal website works</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="caption">
                        Link :{' '}
                        <a href="https://balaspyrus.github.io/mocktrello/"> https://balaspyrus.github.io/mocktrello/</a>
                    </Typography>

                    <iframe
                        className={classes.iframe}
                        src="https://balaspyrus.github.io/mocktrello/"
                        title="trello clone"
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="photshop-content" id="photshop-header">
                    <Typography>Photoshop Works</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ImageList
                        variant="masonry"
                        cols={isMobileScreen ? 1 : isSmallScreen ? 2 : 3}
                        gap={8}
                        sx={{ margin: 0 }}
                        component={motion.ul}
                        variants={containerVariants}>
                        {imgSet.map(({ name, imageURL, desc }) => (
                            <ImageListItem
                                key={imageURL}
                                className={classes.imgListItem}
                                component={motion.li}
                                variants={childrenVarients}
                                sx={{
                                    '& > *': {
                                        borderRadius: 1,
                                    },
                                }}>
                                <motion.img
                                    className={classes.img}
                                    src={`${process.env.PUBLIC_URL + imageURL}?w=248&h=248&fit=crop&auto=format`}
                                    srcSet={`${process.env.PUBLIC_URL + imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    position="bottom"
                                    sx={{
                                        background: 'rgb(0 0 0 / 70%)',
                                    }}
                                    title={`${name}${desc ? ` . ${desc}` : ''}`}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </AccordionDetails>
            </Accordion>
        </Grid>
    );
};

export default WorksSection;
