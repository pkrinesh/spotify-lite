import { apiClient } from './api-client'

export async function getTopArtist(request: Request) {
	return await apiClient('me/top/artists?limit=10', request)
}
