import { unstable_vitePlugin as remix } from '@remix-run/dev'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [remix(), tsconfigPaths(), UnoCSS()],
})
