import { terser } from 'rollup-plugin-terser';
import peerDeps from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';

import packageJson from './package.json';

export default {
    input: './src/index.tsx',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    external: [
        'react',
        'react-hook-form',
        '@hookform/resolvers/yup',
        'yup',
        'react-bootstrap',
        'styled-components',
    ],
    plugins: [
        peerDeps(),
        commonjs(),
        typescript({
            exclude: ['node_modules/**'],
        }),
        url(),
        image(),
        terser(),
    ],
};
