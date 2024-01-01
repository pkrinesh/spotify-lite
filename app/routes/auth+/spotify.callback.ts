import type { LoaderFunctionArgs } from '@remix-run/node'

import { authenticator } from '~/server/provider/spotify.server'
import { path } from '~/utils/typed-remix'

export function loader({ request }: LoaderFunctionArgs) {
	return authenticator.authenticate('spotify', request, {
		successRedirect: path('/'),
		failureRedirect: path('/auth/login'),
	})
}
