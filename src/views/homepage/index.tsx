// components/HomepageViews.tsx
import React from 'react';
import { Box } from '@mui/material';
import ToursSection from '@/views/tour-scetion';
import Navbar from './navbar';
import HeroSection from './hero-section';
import WhyChooseSection from './reason-section';
import PopularDestinationsSection from './popular-destionation-section';

const HomepageViews: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <HeroSection />
            <ToursSection />
            <WhyChooseSection />
            <PopularDestinationsSection />
        </Box>
    );
};

export default HomepageViews;