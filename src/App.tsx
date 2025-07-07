import { useEffect } from 'react'
import { BrowserRouter } from 'react-router'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import { supabase } from '@/lib/supabaseClient'
import './locales'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    // Add authentication effect to sign in anonymously on app startup
    useEffect(() => {
        const performSignIn = async () => {
            console.log('Attempting to sign in anonymously...')
            const { data, error } = await supabase.auth.signInAnonymously()

            if (error) {
                console.error('Anonymous sign-in error:', error)
            } else {
                console.log('Anonymous sign-in successful:', data)
            }
        }

        performSignIn()
    }, []) // Empty dependency array ensures this runs only once

    return (
        <Theme>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Views />
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </Theme>
    )
}

export default App
