// component api is inspired from tanstack/router

import { Link as RemixLink } from '@remix-run/react'
import { RemixLinkProps } from '@remix-run/react/dist/components'
import { ReactNode } from 'react'
import React from 'react'
import { Route } from 'routes.config'
import { path, ParseUrlParams } from './typed-routes'

type OverrideProps<TProps, TOverridden extends Record<string, unknown>> = Omit<
	TProps,
	keyof TOverridden
> &
	TOverridden

type AllowedUrl<T extends string> = T extends Route
	? T
	: T extends `/${string}`
	  ? never
	  : T

export type LinkProps<T extends Route | (string & {})> = OverrideProps<
	RemixLinkProps,
	{
		to: AllowedUrl<T>
		params?: ParseUrlParams<T>
		query?: Record<string, any>
	}
>

// export type LinkProps<T extends Route> = ParseUrlParams<T> extends Record<
// 	string,
// 	never
// >
// 	? Omit<RemixLinkProps, 'to'> & {
// 			to: AllowedUrl<T>
// 			query?: Record<string, any>
// 	  }
// 	: Omit<RemixLinkProps, 'to'> & {
// 			to: AllowedUrl<T>
// 			params: ParseUrlParams<T>
// 			query?: Record<string, any>
// 	  }

type LinkComponent = <T extends Route | (string & {}) = Route>(
	props: LinkProps<T>,
) => ReactNode

const Link: LinkComponent = React.forwardRef(
	({ to, params = {}, query = {}, ...rest }: any, ref) => {
		return (
			<RemixLink to={path(to, { ...params, ...query })} {...rest} ref={ref} />
		)
	},
)

// function LinkInner<T extends Route>(
// 	{ to, params, query, ...props }: LinkProps<T>,
// 	ref: ForwardedRef<HTMLAnchorElement>,
// ) {
// 	return (
// 		<RemixLink to={path(to, { ...params, ...query })} {...props} ref={ref} />
// 	)
// }

// const Link = React.forwardRef(LinkInner) as <T extends AnyRoute>(
// 	props: LinkProps<T> & { ref?: ForwardedRef<HTMLAnchorElement> },
// ) => ReturnType<typeof LinkInner>

// @ts-ignore
Link.displayName = 'Link'

export { Link }
