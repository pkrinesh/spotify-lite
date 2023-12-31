import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getQuery } from 'ufo'
import { getRecent } from '~/server/api/get-recents'
import { requireAuth } from '~/server/utils/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireAuth(request)
	const url = request.url
	const search = getQuery(url)
	// const search = new URL(request.url)
	// console.log(url, search)

	const data = await getRecent(request)
	return json(data)
}

export default function Component() {
	const data = useLoaderData<typeof loader>()
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
