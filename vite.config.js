import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:
    process.env.NODE_ENV === "development"
      ? {
          https: {
            key: fs.readFileSync("localhost+1-key.pem"),
            cert: fs.readFileSync("localhost+1.pem"),
          },
        }
      : {},
});
