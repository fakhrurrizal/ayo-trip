'use client'

import { getHomeNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import HomepageViews from '@/views/homepage'

const HomePage: NextPageWithLayout = () => {
    return <HomepageViews />
}

export default HomePage

HomePage.getLayout = getHomeNavbarLayout
