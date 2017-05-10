import typescript from 'rollup-plugin-typescript';
import entries from 'rollup-plugin-multi-entry';

export default {
    entry: 'src-no-module/**/*.ts',
    format: 'iife',
    moduleName: "shiva",
    dest: 'dist/rollup.test.js',
    plugins: [
        typescript(),
        entries()
    ]
}