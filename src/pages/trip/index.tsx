import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils'
import DestinationListPageViews from '@/views/trip'
// import ContactList from '@/views/master-data/contact-data'

const DestinationList: NextPageWithLayout = () => {
    return (
        <>
            <DestinationListPageViews />
        </>
    )
}

DestinationList.getLayout = getNavbarLayout
export default DestinationList
