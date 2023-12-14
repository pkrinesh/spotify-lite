import { apiClient } from './api-client'

export async function getTopTracks(request: Request) {
	return await apiClient('me/top/tracks?limit=10', request)
}
