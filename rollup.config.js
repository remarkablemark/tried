import commonjs from 'rollup-plugin-commonjs';

const config = {
  input: 'index.js',
  output: {
    format: 'umd',
    name: 'tried'
  },
  plugins: [commonjs()]
};

export default config;
