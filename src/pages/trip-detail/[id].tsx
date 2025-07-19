'use client'

import { getHomeNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import TourDetailPage from '@/views/tour-detail'
// import ContactList from '@/views/master-data/contact-data'

const TourDetailList: NextPageWithLayout = () => {
    return (
        <>
            <TourDetailPage />
        </>
    )
}

TourDetailList.getLayout = getHomeNavbarLayout
export default TourDetailList
