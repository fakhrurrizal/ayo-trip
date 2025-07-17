import { ReactElement } from 'react'
import { PrivateRoute } from '../private-route'
import { DefaultLayout } from '../layout'
import NavbarHome from '../layout/navbar-home'

export const getNavbarLayout = (page: ReactElement) => {
    return (
        <PrivateRoute>
            <DefaultLayout>{page}</DefaultLayout>
        </PrivateRoute>
    )
}

export const getHomeNavbarLayout = (page: ReactElement) => {
    return <NavbarHome>{page}</NavbarHome>
}
