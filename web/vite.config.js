// // vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true
//   },
//   css: {
//     postcss: './postcss.config.js'
//   }
// })


// vite.config.js
// vite.config.js
// vite.config.js - Force JSX in .js files


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'], // Include all possible extensions
      babel: {
        presets: ['@babel/preset-react'],
      }
    })
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
})