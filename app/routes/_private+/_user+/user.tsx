import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Form, Link, NavLink, Outlet } from '@remix-run/react'
import { path } from '~/utils/typed-routes'

export async function loader({ request }: LoaderFunctionArgs) {
	// 👇 I know we can do uses._index.tsx
	if (request.url === 'http://localhost:5173/user') {
		throw redirect(path('/user/me'))
	}
	return null
}

export default function User() {
	return (
		<div
			className='w-screen h-screen bg-background text-foreground text-app
									grid grid-cols-[1fr_10fr] justify-center overflow-hidden
								'
		>
			<div className='flex flex-col justify-between items-center bg-card border-r border-base'>
				<Link to={path('/')} className='i-logos-spotify-icon mt4 text-4xl' />
				<div className='w-full flex flex-col text-center items-center'>
					<NavLink
						to={path('/user/me')}
						className={({ isActive }) =>
							`nav-link w-full py4 ${isActive ? 'nav-link-active' : ''}`
						}
					>
						<p>Profile</p>
					</NavLink>
					<NavLink
						to={path('/user/playlists')}
						className={({ isActive }) =>
							`nav-link w-full py4 ${isActive ? 'nav-link-active' : ''}`
						}
					>
						Playlists
					</NavLink>
					<NavLink
						to={path('/user/top-artists')}
						className={({ isActive }) =>
							`nav-link w-full py4 ${isActive ? 'nav-link-active' : ''}`
						}
					>
						<p>Top Artists</p>
					</NavLink>
					<NavLink
						to={path('/user/top-tracks')}
						className={({ isActive }) =>
							`nav-link w-full py4 ${isActive ? 'nav-link-active' : ''}`
						}
					>
						Top Tracks
					</NavLink>
					<NavLink
						to={path('/user/recent')}
						className={({ isActive }) =>
							`nav-link w-full py4 ${isActive ? 'nav-link-active' : ''}`
						}
					>
						Recent
					</NavLink>
				</div>
				<div className='w-full'>
					<Form action={path('/auth/logout')} method='POST'>
						<button
							type='submit'
							className='w-full py4 flex justify-center items-center gap-2 btn-brand
													group hover:opacity-90 transition
										'
						>
							<span className='i-lucide-log-out text-xl group-hover:scale-120 transition' />
						</button>
					</Form>
				</div>
			</div>
			<div className='overflow-auto border-base'>
				<div className=''>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
