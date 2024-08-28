import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

// Cargar el archivo .env
dotenv.config({ path: '../.env' })

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = process.env
  return {
    plugins: [react()],
    server: {
      host: env.VITE_HOST, 
      port: Number(env.VITE_PORT) 
    }
  }
})
