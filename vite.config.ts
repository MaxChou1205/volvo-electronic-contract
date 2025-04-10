import path from "path";
import { defineConfig, loadEnv } from "vite";
import svgLoader from "vite-svg-loader";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [vue(), tailwindcss(), svgLoader()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target:
            "https://volvocontractapi-gmeabscdauhrgjfx.eastasia-01.azurewebsites.net",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
