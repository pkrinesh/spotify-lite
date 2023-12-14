import { apiClient } from './api-client'

export async function getPlatLists(request: Request) {
	return await apiClient('me/playlists', request)
}
