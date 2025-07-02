/**
 * Common interface types for the API
 */

export interface UserData {
    full_name?: string
    avatar_url?: string
    role?: string
    company?: string
    [key: string]: string | number | boolean | Date | null | undefined
}

export interface ProjectData {
    name: string
    description?: string
    game_id?: string
    owner_id: string
    status?: string
    icon_url?: string
    [key: string]: string | number | boolean | Date | null | undefined
}

export interface FinancialMetricData {
    project_id: string
    metric_name: string
    metric_value: number
    date_recorded?: Date
    created_by?: string
    category?: string
    [key: string]: string | number | boolean | Date | null | undefined
}

// API response interfaces
export interface ApiResponse<T> {
    data: T | null
    success: boolean
    message?: string
}

// Mock adapter types
export interface MockAdapterType {
    signIn: (email: string, password: string) => Promise<ApiResponse<UserData>>
    signUp: (data: UserData) => Promise<ApiResponse<UserData>>
    getFinancialData: (
        projectId: string,
    ) => Promise<ApiResponse<FinancialMetricData[]>>
    getProjects: () => Promise<ApiResponse<ProjectData[]>>
    getUserProfile: (userId: string) => Promise<ApiResponse<UserData>>
    createProject: (data: ProjectData) => Promise<ApiResponse<ProjectData>>
    updateProject: (data: ProjectData) => Promise<ApiResponse<ProjectData>>
}

// Supabase service types
export interface SupabaseServiceType {
    signIn: (email: string, password: string) => Promise<ApiResponse<UserData>>
    signUp: (
        email: string,
        password: string,
        userData: UserData,
    ) => Promise<ApiResponse<UserData>>
    getFinancialMetrics: (
        projectId: string,
    ) => Promise<ApiResponse<FinancialMetricData[]>>
    getProjects: (limit?: number) => Promise<ApiResponse<ProjectData[]>>
    getUserProfile: (userId: string) => Promise<ApiResponse<UserData>>
    createProject: (data: ProjectData) => Promise<ApiResponse<ProjectData>>
    updateProject: (
        projectId: string,
        data: Partial<ProjectData>,
    ) => Promise<ApiResponse<ProjectData>>
}
