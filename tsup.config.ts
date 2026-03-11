import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/shiva.ts"],
    format: ["esm"],
    dts: true,
    outDir: "dist",
    clean: true,
    outExtension: () => ({ js: ".js" }),
})
