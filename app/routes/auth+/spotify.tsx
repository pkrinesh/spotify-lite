import { redirect } from '@remix-run/node'
import { path } from '~/utils/types-routes'

export function loader() {
	return redirect(path('/login'))
}
