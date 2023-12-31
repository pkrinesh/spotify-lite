// this component api is inspired from tanstack/router

import { Link as RemixLink } from '@remix-run/react'
import type { RemixLinkProps } from '@remix-run/react/dist/components'
import React, { ForwardedRef } from 'react'
import { Route } from 'routes.config'
import { path, ParseUrlParams } from './typed-routes'

export type LinkProps<T extends Route> = Omit<RemixLinkProps, 'to'> & {
	to: T
	params: ParseUrlParams<T> extends Record<string, never>
		? never
		: ParseUrlParams<T>
	query?: Record<string, any>
}

function LinkInner<T extends Route>(
	{ to, params, query, ...props }: LinkProps<T>,
	ref: ForwardedRef<HTMLAnchorElement>,
) {
	return (
		<RemixLink to={path(to, { ...params, ...query })} {...props} ref={ref} />
	)
}

const Link = React.forwardRef(LinkInner) as <T extends Route>(
	props: LinkProps<T> & { ref?: ForwardedRef<HTMLAnchorElement> },
) => ReturnType<typeof LinkInner>

//@ts-ignore
Link.displayName = 'Link'

export { Link }
