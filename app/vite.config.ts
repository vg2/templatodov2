import { resolve } from 'node:path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

const root = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()
  ],
  resolve: {
    alias: {
      "@": root,
      "@app/common": resolve(root, "common"),
      "@app/components": resolve(root, "components"),
      "@app/data": resolve(root, "data"),
      "@app/model": resolve(root, "model"),
      "@app/service": resolve(root, "service"),
      "@app/utils": resolve(root, "utils"),
      "@mui/material": "@mui/joy"
    }
  }
})
