import { User } from "@/types"
import { fetcher, FetcherMethod } from "./api"

export const getProfile = async (): Promise<User> => {
    return fetcher<User>(FetcherMethod.GET, '/api/v1/profile', null)
}

export const refreshToken = async (): Promise<any> => {
    return fetcher<any>(FetcherMethod.GET, '/api/v1/refresh_token', null)
}

export const login = async (username: string, password: string): Promise<any> => {
    return fetcher<any>(FetcherMethod.POST, '/api/v1/login', { username, password })
}
