// components/HomepageViews.tsx
import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import ToursSection from '@/views/tour-scetion'
import { Box } from '@mui/material'
import FAQSection from './faq-section'
import FooterSection from './footer'
import HeroSection from './hero-section'
import PopularDestinationsSection from './popular-destionation-section'
import WhyChooseSection from './reason-section'

const HomepageViews: NextPageWithLayout = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <HeroSection />
            <ToursSection />
            <WhyChooseSection />
            <PopularDestinationsSection />
            <FAQSection />
            <FooterSection />
        </Box>
    )
}

HomepageViews.getLayout = getNavbarLayout
export default HomepageViews
