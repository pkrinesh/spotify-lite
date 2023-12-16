import type { ActionFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/server/provider/spotify.server'
import { path } from '~/utils/typed-routes'

export async function action({ request }: ActionFunctionArgs) {
	return await authenticator.logout(request, {
		redirectTo: path('/'),
	})
}
