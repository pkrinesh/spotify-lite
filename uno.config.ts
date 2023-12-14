import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
	transformerAttributifyJsx,
	transformerVariantGroup,
} from 'unocss'

export default defineConfig({
	shortcuts: {
		'bg-app': 'bg-[--night-green]',
		'text-app': 'text-[--white]',
		'border-base': 'border-[--green]',
		'btn-p-base': 'px4 py2',
		'btn-brand': 'bg-[--green] text-[--white]',
		'nav-link': 'opacity-50 hover:btn-brand hover:opacity-60 transition',
		'nav-link-active': 'btn-brand opacity-70',
	},
	presets: [presetAttributify(), presetUno(), presetIcons()],
	transformers: [transformerVariantGroup(), transformerAttributifyJsx()],
})
