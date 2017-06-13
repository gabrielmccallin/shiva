import typescript from 'rollup-plugin-typescript';
import entries from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'src/**/*.ts',
    moduleName: "shiva",
    plugins: [
        typescript({
            // typescript: require('typescript'), // use local version
            tsconfig: false,
            target: "es5"
        }),
        entries(),
        resolve(),
        commonjs()
    ],
    targets: [
        { dest: 'dist/shiva.cjs.js', format: 'cjs' },
        { dest: 'dist/shiva.global.js', format: 'iife' }
        // { dest: 'dist/shiva.esm.js', format: 'es' }
    ]
}