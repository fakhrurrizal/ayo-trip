// pages/index.tsx
import React from 'react';
import { NextPageWithLayout } from '@/utils';
import HomepageViews from '@/views/homepage';

const HomePage: NextPageWithLayout = () => {
    return <HomepageViews />;
};

export default HomePage;