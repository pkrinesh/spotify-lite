import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { getMe } from '~/server/api/get-me.server'
import { getRecent } from '~/server/api/get-recents'
import { requireAuth } from '~/server/utils/auth.server'
import { Link } from '~/utils/link'
import { path } from '~/utils/typed-routes'

export const schema = {
	foo: 'string',
}

export async function loader({ request }: LoaderFunctionArgs) {
	await requireAuth(request)
	const res = await getMe(request)
	const recent = await getRecent(request)

	return json(res)
}

export default function UserProfile() {
	const data = useLoaderData<typeof loader>()
	const recentData = useFetcher()

	return (
		<div className='min-h-screen flex justify-center items-center text-center'>
			<div className='flex flex-col gap-4'>
				<h3 className='text-xl font-medium'>{data?.email}</h3>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
			<button
				type='button'
				className='border px-3 py-1 bg-background'
				onClick={() =>
					recentData.load(`${path('/user/recent', { foo: 'bar' })}`)
				}
			>
				Load Data
			</button>
			<Link
				to='/user/:id'
				params={{ id: '4' }}
				query={{ foo: 'bar' }}
				className='border px-3 py-1 bg-background'
			>
				Go to Id
			</Link>
		</div>
	)
}
