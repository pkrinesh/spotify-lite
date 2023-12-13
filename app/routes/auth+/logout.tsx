import type { ActionFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import { path } from '~/utils/typed-routes'

export async function loader({ request }: ActionFunctionArgs) {
	return await authenticator.logout(request, {
		redirectTo: path('/'),
	})
}
