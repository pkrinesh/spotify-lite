import type { ActionFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export async function loader({ request }: ActionFunctionArgs) {
	return await authenticator.logout(request, {
		redirectTo: '/',
	})
}
