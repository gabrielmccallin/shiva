import typescript from 'rollup-plugin-typescript';
import entries from 'rollup-plugin-multi-entry';

export default {
    entry: 'src-no-module/**/*.ts',
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
        entries()
    ],
    targets: [
        { dest: 'dist/bundle.cjs.js', format: 'cjs' },
        { dest: 'dist/bundle.global.js', format: 'iife' },
        { dest: 'dist/bundle.js', format: 'es' },
    ]
}