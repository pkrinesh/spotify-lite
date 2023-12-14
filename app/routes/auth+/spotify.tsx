import { redirect } from '@remix-run/node'
import { path } from '~/utils/typed-routes'

export function loader() {
	return redirect(path('/auth/login'))
}
