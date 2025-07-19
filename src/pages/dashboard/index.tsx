import { getNavbarLayout } from '@/components'
import IconifyIcon from '@/components/icon'
import { NextPageWithLayout } from '@/utils'

const DashboardPage: NextPageWithLayout = () => {
    const stats = [
        {
            title: 'Total Trips',
            value: '1,234',
            change: '+12%',
            iconName: 'lucide:map-pin',
            color: 'bg-gradient-to-r from-blue-500 to-blue-600',
        },
        {
            title: 'Active Travelers',
            value: '8,567',
            change: '+8%',
            iconName: 'lucide:users',
            color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
        },
        {
            title: 'Revenue',
            value: 'Rp 2.4M',
            change: '+15%',
            iconName: 'lucide:dollar-sign',
            color: 'bg-gradient-to-r from-purple-500 to-purple-600',
        },
        {
            title: 'Bookings Today',
            value: '89',
            change: '+5%',
            iconName: 'lucide:calendar',
            color: 'bg-gradient-to-r from-orange-500 to-orange-600',
        },
    ]

    const popularDestinations = [
        { name: 'Bali', bookings: 245, rating: 4.8, image: '🏝️' },
        { name: 'Yogyakarta', bookings: 189, rating: 4.7, image: '🏛️' },
        { name: 'Raja Ampat', bookings: 156, rating: 4.9, image: '🐠' },
        { name: 'Bromo', bookings: 134, rating: 4.6, image: '🌋' },
        { name: 'Komodo', bookings: 123, rating: 4.8, image: '🦎' },
    ]

    const recentBookings = [
        {
            id: 1,
            traveler: 'Sarah Johnson',
            destination: 'Bali Paradise Tour',
            amount: 'Rp 2,500,000',
            status: 'confirmed',
            date: '2 hours ago',
        },
        {
            id: 2,
            traveler: 'Michael Chen',
            destination: 'Yogyakarta Cultural Trip',
            amount: 'Rp 1,800,000',
            status: 'pending',
            date: '4 hours ago',
        },
        {
            id: 3,
            traveler: 'Emma Wilson',
            destination: 'Raja Ampat Diving',
            amount: 'Rp 4,200,000',
            status: 'confirmed',
            date: '6 hours ago',
        },
        {
            id: 4,
            traveler: 'David Kumar',
            destination: 'Bromo Sunrise Trek',
            amount: 'Rp 1,200,000',
            status: 'confirmed',
            date: '8 hours ago',
        },
    ]

    const StatCard = ({ stat }: any) => (
        <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-gray-500 text-sm font-medium uppercase tracking-wide'>{stat.title}</p>
                    <p className='text-3xl font-bold text-gray-900 mt-2'>{stat.value}</p>
                    <p className='text-emerald-500 text-sm font-semibold mt-1 flex items-center'>
                        <IconifyIcon icon='lucide:trending-up' className='w-4 h-4 mr-1' />
                        {stat.change}
                    </p>
                </div>
                <div className={`${stat.color} p-4 rounded-2xl shadow-lg`}>
                    <IconifyIcon icon={stat.iconName} className='w-8 h-8 text-white' />
                </div>
            </div>
        </div>
    )

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                                Dashboard
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#116487] to-blue-600 ml-2'>
                                    Ayo Trip
                                </span>
                            </h1>
                            <p className='text-gray-600 text-lg'>
                                Selamat datang kembali! Berikut ringkasan aktivitas trip hari ini.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
                    {/* Popular Destinations */}
                    <div className='lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-2xl font-bold text-gray-900 flex items-center'>
                                <IconifyIcon icon='lucide:star' className='w-6 h-6 text-yellow-500 mr-2' />
                                Destinasi Populer
                            </h2>
                        </div>
                        <div className='space-y-4'>
                            {popularDestinations.map((dest, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer'
                                >
                                    <div className='flex items-center space-x-4'>
                                        <div className='text-3xl'>{dest.image}</div>
                                        <div>
                                            <h3 className='font-semibold text-gray-900'>{dest.name}</h3>
                                            <p className='text-gray-500 text-sm'>{dest.bookings} bookings bulan ini</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <IconifyIcon icon='lucide:star' className='w-4 h-4 text-yellow-400' />
                                        <span className='font-semibold text-gray-700'>{dest.rating}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center'>
                            <IconifyIcon icon='lucide:award' className='w-6 h-6 text-[#116487] mr-2' />
                            Quick Actions
                        </h2>
                        <div className='space-y-4'>
                            <button className='w-full bg-gradient-to-r from-[#116487] to-blue-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center'>
                                <IconifyIcon icon='lucide:plane' className='w-5 h-5 mr-2' />
                                Tambah Trip Baru
                            </button>
                            <button className='w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center'>
                                <IconifyIcon icon='lucide:users' className='w-5 h-5 mr-2' />
                                Kelola Traveler
                            </button>
                            <button className='w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center'>
                                <IconifyIcon icon='lucide:camera' className='w-5 h-5 mr-2' />
                                Upload Galeri
                            </button>
                            <button className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center'>
                                <IconifyIcon icon='lucide:heart' className='w-5 h-5 mr-2' />
                                Review & Rating
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-900 flex items-center'>
                            <IconifyIcon icon='lucide:clock' className='w-6 h-6 text-[#116487] mr-2' />
                            Booking Terbaru
                        </h2>
                    </div>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-gray-200'>
                                    <th className='text-left py-4 px-2 font-semibold text-gray-700'>Traveler</th>
                                    <th className='text-left py-4 px-2 font-semibold text-gray-700'>Destinasi</th>
                                    <th className='text-left py-4 px-2 font-semibold text-gray-700'>Amount</th>
                                    <th className='text-left py-4 px-2 font-semibold text-gray-700'>Status</th>
                                    <th className='text-left py-4 px-2 font-semibold text-gray-700'>Waktu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map(booking => (
                                    <tr
                                        key={booking.id}
                                        className='border-b border-gray-100 hover:bg-gray-50 transition-colors'
                                    >
                                        <td className='py-4 px-2'>
                                            <div className='font-semibold text-gray-900'>{booking.traveler}</div>
                                        </td>
                                        <td className='py-4 px-2'>
                                            <div className='text-gray-700'>{booking.destination}</div>
                                        </td>
                                        <td className='py-4 px-2'>
                                            <div className='font-semibold text-gray-900'>{booking.amount}</div>
                                        </td>
                                        <td className='py-4 px-2'>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    booking.status === 'confirmed'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                            >
                                                {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className='py-4 px-2'>
                                            <div className='text-gray-500 text-sm'>{booking.date}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

DashboardPage.getLayout = getNavbarLayout
export default DashboardPage
