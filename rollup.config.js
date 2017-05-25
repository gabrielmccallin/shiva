import typescript from 'rollup-plugin-typescript';
import entries from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'src/**/*.ts',
    // format: 'es',
    moduleName: "shiva",
    // dest: 'dist/shiva.js',
    plugins: [
        typescript({
            target: "es5",
            declaration: true,
            module: "es6",
            tsconfig: false
        }),
        entries(),
        resolve(),
        commonjs()
    ],
    targets: [
        { dest: 'dist/shiva.cjs.js', format: 'cjs' },
        { dest: 'dist/shiva.global.js', format: 'iife' },
        { dest: 'dist/shiva.js', format: 'es' },
    ]
}