import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation'

export default defineConfig({
  plugins: [
    vue(),
    crossOriginIsolation()
  ],
  define : {
    'process.env': process.env
  },
  server:{
    cors: true
  },
  configureServer: ({ app }) => {
    app.use(cors({ origin: '*' }));
  },
})
