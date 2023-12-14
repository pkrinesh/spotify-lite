import { apiClient } from './api-client'

export async function getRecent(request: Request) {
	return await apiClient('me/player/recently-played', request)
}
