// components/HomepageViews.tsx
import React from 'react';
import { Box } from '@mui/material';
import ToursSection from '@/views/tour-scetion';
import Navbar from './navbar';
import HeroSection from './hero-section';
import WhyChooseSection from './reason-section';
import PopularDestinationsSection from './popular-destionation-section';
import FAQSection from './faq-section';
import FooterSection from './footer';

const HomepageViews: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <HeroSection />
            <ToursSection />
            <WhyChooseSection />
            <PopularDestinationsSection />
            <FAQSection />
            <FooterSection />
        </Box>
    );
};

export default HomepageViews;