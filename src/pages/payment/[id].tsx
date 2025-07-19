'use client'

import { getHomeNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import PaymentMethodPage from '@/views/payment'
// import ContactList from '@/views/master-data/contact-data'

const DestinationList: NextPageWithLayout = () => {
    return (
        <>
            <PaymentMethodPage />
        </>
    )
}

DestinationList.getLayout = getHomeNavbarLayout
export default DestinationList
