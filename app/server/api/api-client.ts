import { ofetch } from 'ofetch'
import { getAuthToken } from '../utils/auth.server'

const BASE_URL = 'https://api.spotify.com/v1'

interface ResponseMap {
	blob: Blob
	text: string
	arrayBuffer: ArrayBuffer
	stream: ReadableStream<Uint8Array>
}
type ResponseType = keyof ResponseMap | 'json'

export const baseClient = ofetch.create({
	baseURL: BASE_URL,
})

export async function apiClient<T = unknown, R extends ResponseType = 'json'>(
	path: string,
	request: Request,
) {
	const token = await getAuthToken(request)

	return await baseClient<T, R>(path, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
}
