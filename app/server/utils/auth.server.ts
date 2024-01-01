import { redirect } from '@remix-run/node'
import { Route } from 'routes.config'
import { spotifyStrategy } from '../provider/spotify.server'

export async function getAuthSession(request: Request) {
	const authSession = await spotifyStrategy.getSession(request)

	return authSession
}

export async function requireAuth(
	request: Request,
	{ redirectTo = '/' }: { redirectTo?: Route } = {},
) {
	const authSession = await getAuthSession(request)

	if (!authSession?.user) {
		throw redirect(redirectTo)
	}

	return authSession
}

export async function getAuthToken(request: Request) {
	const sessionData = await getAuthSession(request)
	const token = sessionData?.accessToken

	if (!token) {
		throw redirect('/')
	}
	return token
}
