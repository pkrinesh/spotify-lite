import { Authenticator } from 'remix-auth'
import { Session, SpotifyStrategy } from 'remix-auth-spotify'

import { sessionStorage } from '~/server/session/auth.server'

if (!process.env.SPOTIFY_CLIENT_ID) {
	throw new Error('Missing SPOTIFY_CLIENT_ID env')
}

if (!process.env.SPOTIFY_CLIENT_SECRET) {
	throw new Error('Missing SPOTIFY_CLIENT_SECRET env')
}

if (!process.env.SPOTIFY_CALLBACK_URL) {
	throw new Error('Missing SPOTIFY_CALLBACK_URL env')
}

const scopes = [
	'user-read-private',
	'user-read-email',
	'user-read-recently-played',
	'user-top-read',
	'user-follow-read',
	'user-follow-modify',
	'playlist-read-private',
	'playlist-read-collaborative',
	'playlist-modify-public',
].join(' ')

export const spotifyStrategy = new SpotifyStrategy(
	{
		clientID: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		callbackURL: process.env.SPOTIFY_CALLBACK_URL,
		sessionStorage,
		scope: scopes,
	},
	async ({ accessToken, refreshToken, extraParams, profile }) => ({
		accessToken,
		refreshToken,
		expiresAt: Date.now() + extraParams.expiresIn * 1000,
		tokenType: extraParams.tokenType,
		user: {
			id: profile.id,
			email: profile.emails[0].value,
			name: profile.displayName,
			image: profile.__json.images?.[0]?.url,
		},
	}),
)

export const authenticator = new Authenticator<Session>(sessionStorage, {
	sessionKey: spotifyStrategy.sessionKey,
	sessionErrorKey: spotifyStrategy.sessionErrorKey,
})

authenticator.use(spotifyStrategy)
