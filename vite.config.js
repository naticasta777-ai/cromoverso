import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const proxyApi = {
  "/api": {
    target: "https://yanethm-cromoverso-api.fly.dev",
    changeOrigin: true,
    cookieDomainRewrite: "",
  },
};

export default defineConfig({
  plugins: [react(), svgr()],
  server: { proxy: proxyApi },
  preview: { proxy: proxyApi },
});
