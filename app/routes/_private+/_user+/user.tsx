import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Form, Outlet } from '@remix-run/react'
import { Route } from 'routes.config'
import { cn } from '~/utils'
import { path, Link, NavLink, NavLinkProps } from '~/utils/typed-remix'

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
									grid grid-cols-[1fr_7fr] justify-center overflow-hidden
								'
		>
			<div className='flex flex-col justify-between items-center bg-card border-r border-base'>
				<Link to='/' className='i-logos-spotify text-8xl' />

				<div className='w-full px4 flex flex-col gap-4'>
					<div className='flex flex-col gap-3 p4'>
						<NavbarLink to='/user/me'>
							<span className='i-lucide-home' />
							Home
						</NavbarLink>
						<NavbarLink to='/user/playlists'>
							<span className='i-lucide-list-music' />
							Playlists
						</NavbarLink>
						<NavbarLink to='/user/artists'>
							<span className='i-lucide-mic-2' />
							Artists
						</NavbarLink>
						<NavbarLink to='/user/tracks'>
							<span className='i-lucide-music' />
							Tracks
						</NavbarLink>
					</div>

					<div className='flex flex-col gap-3 p4'>
						<NavbarLink to='/user/album'>
							<span className='i-lucide-disc-album' />
							Albums
						</NavbarLink>
						<NavbarLink to='/user/recent'>
							<span className='i-lucide-clock-3' />
							Recent
						</NavbarLink>
					</div>
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

function NavbarLink<T extends Route>({
	className,
	...restProps
}: NavLinkProps<T>) {
	return (
		<NavLink
			className={({ isActive }) =>
				cn(
					'flex gap-3 items-center text-sm font-500',
					'text-muted-foreground hover:text-card-foreground transition',
					isActive && 'text-card-foreground',
					className,
				)
			}
			{...(restProps as any)}
		/>
	)
}
