import { mock } from '../mock/MockAdapter'
import SupabaseService from './SupabaseService'
import { ProjectData, MockAdapterType, SupabaseServiceType } from '../types/api'

// Type assertion for mock adapter
const mockAdapter = mock as unknown as MockAdapterType

// Environment configuration
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true'

/**
 * ApiProvider
 *
 * This service provides a unified interface for data fetching,
 * allowing seamless switching between mock data and real API data.
 */
class ApiProvider {
    /**
     * Get the appropriate data provider based on configuration
     * @returns Either the mock adapter or the real Supabase service
     */
    private getProvider() {
        return USE_REAL_API
            ? (SupabaseService as SupabaseServiceType)
            : mockAdapter
    }

    /**
     * Sign in a user
     * @param email User email
     * @param password User password
     * @returns Authentication result
     */
    async signIn(email: string, password: string) {
        const provider = this.getProvider()
        return provider.signIn(email, password)
    }

    /**
     * Sign up a new user
     * @param data User registration data
     * @returns Registration result
     */
    async signUp(data: {
        email: string
        password: string
        fullName?: string
        role?: string
        company?: string
        [key: string]: unknown
    }) {
        const provider = this.getProvider()
        if (USE_REAL_API) {
            return (provider as SupabaseServiceType).signUp(
                data.email,
                data.password,
                {
                    full_name: data.fullName,
                    role: data.role,
                    company: data.company,
                },
            )
        }
        return (provider as MockAdapterType).signUp(data)
    }

    /**
     * Get financial metrics
     * @param projectId Project ID to get metrics for
     * @returns Financial metrics data
     */
    async getFinancialMetrics(projectId: string) {
        const provider = this.getProvider()
        if (USE_REAL_API) {
            return (provider as SupabaseServiceType).getFinancialMetrics(
                projectId,
            )
        }
        // The mock adapter has a different API
        return (provider as MockAdapterType).getFinancialData(projectId)
    }

    /**
     * Get projects
     * @param limit Maximum number of projects to fetch
     * @returns Projects data
     */
    async getProjects(limit = 10) {
        const provider = this.getProvider()
        if (USE_REAL_API) {
            return (provider as SupabaseServiceType).getProjects(limit)
        }
        // The mock adapter has a different API
        return (provider as MockAdapterType).getProjects()
    }

    /**
     * Get user profile
     * @param userId User ID
     * @returns User profile data
     */
    async getUserProfile(userId: string) {
        const provider = this.getProvider()
        return provider.getUserProfile(userId)
    }

    /**
     * Create a project
     * @param projectData Project data
     * @returns Created project
     */
    async createProject(projectData: ProjectData) {
        const provider = this.getProvider()
        return provider.createProject(projectData)
    }

    /**
     * Update a project
     * @param projectId Project ID
     * @param projectData Project data
     * @returns Updated project
     */
    async updateProject(projectId: string, projectData: Partial<ProjectData>) {
        const provider = this.getProvider()
        if (USE_REAL_API) {
            return (provider as SupabaseServiceType).updateProject(
                projectId,
                projectData,
            )
        }
        // The mock adapter has a different API
        return (provider as MockAdapterType).updateProject({
            ...projectData,
            id: projectId,
        })
    }
}

export default new ApiProvider()
