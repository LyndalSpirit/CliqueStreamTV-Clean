import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

/** @type {import('postcss-load-config').Config} */
const postcssConfig = {
  plugins: [tailwind(), autoprefixer()],
}

export default postcssConfig
