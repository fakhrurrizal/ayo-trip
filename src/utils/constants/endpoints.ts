export const endpoints = {
    // auth
    get_me: 'auth/user',
    logout: 'auth/logout',
    login: 'auth/signin',
    register: 'auth/signup',
    trip: 'trip',
    file: 'file',
    email_verification: 'auth/email-verification',
    // blog
    destination: 'destination',
    destination_type: 'destination-type',

    // files
    category: 'category',
} as const
