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
})
