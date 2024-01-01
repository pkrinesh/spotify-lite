import { NavLink as RemixNavLink } from '@remix-run/react'
import { RemixNavLinkProps } from '@remix-run/react/dist/components'
import React from 'react'
import { Route } from 'routes.config'
import { path, ParseUrlParams } from './typed-routes'

export type NavLinkProps<T extends Route> = ParseUrlParams<T> extends Record<
	string,
	never
>
	? Omit<RemixNavLinkProps, 'to'> & {
			to: T
			query?: Record<string, any>
	  }
	: Omit<RemixNavLinkProps, 'to'> & {
			to: T
			params: ParseUrlParams<T>
			query?: Record<string, any>
	  }

type LinkComponent = <T extends Route>(
	props: NavLinkProps<T>,
) => React.ReactNode

const NavLink: LinkComponent = React.forwardRef(
	({ to, params, query, ...rest }: any, ref) => {
		return (
			<RemixNavLink
				to={path(to, { ...params, ...query })}
				{...rest}
				ref={ref}
			/>
		)
	},
)

// @ts-ignore
NavLink.displayName = 'Link'

export { NavLink }
