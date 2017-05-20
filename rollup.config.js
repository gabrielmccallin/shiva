import typescript from 'rollup-plugin-typescript';
import entries from 'rollup-plugin-multi-entry';

export default {
    entry: 'src-no-module/**/*.ts',
    format: 'es',
    moduleName: "shiva",
    dest: 'dist/shiva.js',
    plugins: [
        typescript({
            typescript: require("typescript")
        }),
        entries()
    ]
}