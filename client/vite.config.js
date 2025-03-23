import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  //adding proxy to access the backend from frontend
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure:false, //this is http only 
      },
      },
    },
  plugins: [react()],
});
