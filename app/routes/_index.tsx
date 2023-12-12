import type { MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	]
}

export function loader() {
	return {
		success: 'ok',
	}
}

export default function Index() {
	const data = useLoaderData<typeof loader>()

	return (
		<div
			style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
			className='min-h-screen flex justify-center items-center bg-gray-900'
		>
			<div>
				<h1>Welcome to Remix</h1>
				<h1>{data.success}</h1>
				<ul>
					<li>
						<a
							target='_blank'
							href='https://remix.run/tutorials/blog'
							rel='noreferrer'
						>
							15m Quickstart Blog Tutorial
						</a>
					</li>
					<li>
						<a
							target='_blank'
							href='https://remix.run/tutorials/jokes'
							rel='noreferrer'
						>
							Deep Dive Jokes App Tutorial
						</a>
					</li>
					<li>
						<a target='_blank' href='https://remix.run/docs' rel='noreferrer'>
							Remix Docs
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
