import type { LoaderFunctionArgs } from '@remix-run/node'

import { authenticator } from '~/services/auth.server'
import { path } from '~/utils/types-routes'

export function loader({ request }: LoaderFunctionArgs) {
	return authenticator.authenticate('spotify', request, {
		successRedirect: path('/'),
		failureRedirect: path('/login'),
	})
}
