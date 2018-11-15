import typescript from 'rollup-plugin-typescript2';
import entries from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: {
        include: ['src/**/*.ts'],
        exclude: ['src/playground/**/*']
    },
    plugins: [
        entries(),
        typescript(),
        resolve(),
        commonjs()
    ],
    output: [{
        name: "shiva",
        file: "dist/shiva-cjs.js",
        format: "cjs"
    }, {
        name: "shiva",
        file: "dist/shiva-global.js",
        format: "iife"
    }]
}