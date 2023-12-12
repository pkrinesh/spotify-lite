import { createCookieSessionStorage } from '@remix-run/node'

if (!process.env.SESSION_SECRET) {
	throw new Error('Missing SESSION_SECRET env')
}

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '_session', // use any name you want here
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: [process.env.SESSION_SECRET], // replace this with an actual secret from env variable
		secure: process.env.NODE_ENV === 'production', // enable this in prod only
	},
})

export const { getSession, commitSession, destroySession } = sessionStorage
