import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
    resolve: {
        alias: {
            shiva: path.resolve(__dirname, "../src/shiva.ts"),
        },
    },
})
