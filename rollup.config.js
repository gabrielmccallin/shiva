import typescript from 'rollup-plugin-typescript';

export default {
    entry: 'src/test-rollup/Container.ts',
    format: 'iife',
    dest: 'dist/rollup.test.js',
    plugins: [
        typescript()
    ]
}