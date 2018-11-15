import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

const override = {
    compilerOptions: {
        "target": "ES5",
        "downlevelIteration": true,
        "declaration": false,
        "lib": [
            "es2015",
            "dom",
            "scripthost",
            "es5"
        ],
        "baseUrl": ".",
        "moduleResolution": "node",
        "sourceMap": true
    },
    "exclude": [
        "node_modules",
        "serve"
    ]
};

export default {
    input: './src/playground/Playground.ts',
    output: {
        name: "playground",
        file: "./playground/playground.js",
        format: "iife",
        sourcemap: true
    },
    cache: true,
    plugins: [
        typescript({
            tsconfigOverride: override
        }),
        resolve(),
        commonjs()
    ]
}
