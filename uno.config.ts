import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
	transformerAttributifyJsx,
	transformerVariantGroup,
} from 'unocss'

export default defineConfig({
	presets: [presetAttributify(), presetUno(), presetIcons()],
	transformers: [transformerVariantGroup(), transformerAttributifyJsx()],
	shortcuts: {
		'bg-app': 'bg-[--night-green]',
		'text-app': 'text-[--white]',
		'border-base': 'border-[--green]',
		'btn-p-base': 'px4 py2',
		'btn-brand': 'bg-[--green] text-[--white]',
		'nav-link': 'opacity-50 hover:btn-brand hover:opacity-60 transition',
		'nav-link-active': 'btn-brand opacity-70',
	},
	theme: {
		colors: {
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))',
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))',
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
				foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))',
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))',
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))',
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))',
			},
		},
	},
})
