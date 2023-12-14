import { getAuthToken } from '../utils/auth.server'

export async function getMe(request: Request) {
	const token = await getAuthToken(request)
	const res = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})

	return await res.json()
}
