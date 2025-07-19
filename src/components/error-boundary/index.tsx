'use client'

import { goBackAndRefresh } from '@/utils'
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    private handleRefresh = () => {
        window.location.reload()
    }

    private handleGoBack = () => {
        goBackAndRefresh()
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className='flex items-center min-h-screen bg-gray-50'>
                    <div className='container mx-auto py-10 flex items-center justify-center flex-col'>
                        <h1 className='text-primary font-bold text-center text-[calc(1.25rem+2.7vw)] xl:text-[42px] mb-3'>
                            Internal Server Error
                        </h1>
                        <p className='mb-6 text-lg text-gray-700'>Terjadi kesalahan pada sistem.</p>
                        {this.state.error && (
                            <pre className='text-sm text-red-500 max-w-xl text-center mb-6 whitespace-pre-wrap break-words'>
                                {this.state.error.message}
                            </pre>
                        )}
                        <div className='flex gap-3'>
                            <button
                                className='btn btn-outline hover:bg-transparent hover:text-primary hover:bg-blue-50 hover:border-primary border-primary btn-sm text-primary h-auto py-2 text-base'
                                onClick={this.handleRefresh}
                            >
                                Refresh
                            </button>
                            <button
                                className='btn btn-primary bg-primary border-primary btn-sm text-white h-auto py-2 text-base'
                                onClick={this.handleGoBack}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export { ErrorBoundary }
