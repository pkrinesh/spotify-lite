import { writeFileSync } from 'fs'
import { unstable_vitePlugin as remix } from '@remix-run/dev'
import { RouteManifest, flatRoutes } from 'remix-flat-routes'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		remix({
			ignoredRouteFiles: ['**/*'],
			routes: async (defineRoutes) => {
				generateRoutes(flatRoutes('routes', defineRoutes))
				return flatRoutes('routes', defineRoutes)
			},
		}),
		tsconfigPaths(),
		UnoCSS(),
	],
})

function generateRoutes(routesObject: RouteManifest) {
	const routes = routesObject
	const routesArray = Object.values(routes)

	const buildFullPath = (
		routeObject: RouteManifest,
		itemId: string,
	): string => {
		const item = routeObject[itemId]
		if (!item) return ''

		const { parentId, path } = item

		const parentPath =
			parentId !== 'root' ? buildFullPath(routeObject, parentId ?? '') : ''

		return `${parentPath}/${path ?? ''}`
	}

	const fullPathArray = routesArray.map((item) =>
		buildFullPath(routes, item.id),
	)
	const content = `export const routesConfig = ${JSON.stringify(
		fullPathArray,
		null,
		2,
	)} as const;\n`

	const filePath = 'routes.config.ts'
	writeFileSync(filePath, content)
}
