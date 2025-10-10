import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
=======
import path from 'path'
>>>>>>> aafa7a7ab6b1e47fc0095fa62e10e826d7b84980

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
=======
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
>>>>>>> aafa7a7ab6b1e47fc0095fa62e10e826d7b84980
})
