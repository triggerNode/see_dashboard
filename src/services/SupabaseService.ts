import { supabase } from '../lib/supabaseClient'

interface UserData {
    full_name?: string
    avatar_url?: string
    role?: string
    company?: string
    [key: string]: string | number | boolean | Date | null | undefined
}

interface ProjectData {
    name: string
    description?: string
    game_id?: string
    owner_id: string
    status?: string
    icon_url?: string
    [key: string]: string | number | boolean | Date | null | undefined
}

interface FinancialMetricData {
    project_id: string
    metric_name: string
    metric_value: number
    date_recorded?: Date
    created_by?: string
    category?: string
    [key: string]: string | number | boolean | Date | null | undefined
}

/**
 * SupabaseService - Service for Supabase API operations
 *
 * This service provides methods to interact with the Supabase backend.
 * It works alongside the existing mock data system, with APIs that mirror
 * the mock service interfaces for seamless integration.
 */
class SupabaseService {
    /**
     * Get financial metrics for a project
     * @param projectId The ID of the project to fetch metrics for
     * @returns Financial metrics data
     */
    async getFinancialMetrics(projectId: string) {
        try {
            const { data, error } = await supabase
                .from('financial_metrics')
                .select('*')
                .eq('project_id', projectId)

            if (error) throw error
            return { data, success: true }
        } catch (error: unknown) {
            console.error('Error fetching financial metrics:', error)
            return {
                data: null,
                success: false,
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    /**
     * Get user profile data
     * @param userId The user ID to fetch profile data for
     * @returns User profile data
     */
    async getUserProfile(userId: string) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) throw error
            return { data, success: true }
        } catch (error: unknown) {
            console.error('Error fetching user profile:', error)
            return {
                data: null,
                success: false,
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    /**
     * Authentication with Supabase
     * @param email User email
     * @param password User password
     * @returns Authentication result with session data
     */
    async signIn(email: string, password: string) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error
            return { data, success: true }
        } catch (error: unknown) {
            console.error('Error during sign in:', error)
            return {
                data: null,
                success: false,
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    /**
     * Register a new user
     * @param email User email
     * @param password User password
     * @param userData Additional user data
     * @returns Registration result
     */
    async signUp(email: string, password: string, userData: UserData) {
        try {
            // Register the user with Supabase Auth
            const { data: authData, error: authError } =
                await supabase.auth.signUp({
                    email,
                    password,
                })

            if (authError) throw authError

            // If successful and we have a user, create a profile record
            if (authData?.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: authData.user.id,
                            ...userData,
                            updated_at: new Date(),
                        },
                    ])

                if (profileError) throw profileError
            }

            return { data: authData, success: true }
        } catch (error: unknown) {
            console.error('Error during sign up:', error)
            return {
                data: null,
                success: false,
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    /**
     * Get project data
     * @param limit Number of projects to fetch
     * @returns List of projects
     */
    async getProjects(limit = 10) {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .limit(limit)

            if (error) throw error
            return { data, success: true }
        } catch (error: unknown) {
            console.error('Error fetching projects:', error)
            return {
                data: null,
                success: false,
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    /**
     * Create a new project
     * @param projectData Project data to insert
     * @returns Created project data
     */
    async createProject(projectData: ProjectData) {
        try {
            const { data, error } = await supabase
                .from('projects')
                .insert([projectData])
                .select()

            if (error) throw error
            return { data, success: true }
        } catch (error: unknown) {
            console.error('Error creating project:', error)
            return {
                data: null,
                success: false,
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    /**
     * Update project data
     * @param projectId Project ID to update
     * @param projectData Project data to update
     * @returns Updated project data
     */
    async updateProject(projectId: string, projectData: Partial<ProjectData>) {
        try {
            const { data, error } = await supabase
                .from('projects')
                .update(projectData)
                .eq('id', projectId)
                .select()

            if (error) throw error
            return { data, success: true }
        } catch (error: unknown) {
            console.error('Error updating project:', error)
            return {
                data: null,
                success: false,
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    /**
     * Save financial metrics
     * @param metricsData Metrics data to save
     * @returns Result of the operation
     */
    async saveFinancialMetrics(metricsData: FinancialMetricData) {
        try {
            const { data, error } = await supabase
                .from('financial_metrics')
                .insert([metricsData])
                .select()

            if (error) throw error
            return { data, success: true }
        } catch (error: unknown) {
            console.error('Error saving financial metrics:', error)
            return {
                data: null,
                success: false,
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }
}

export default new SupabaseService()
