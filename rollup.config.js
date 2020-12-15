import nodePolyfills from 'rollup-plugin-node-polyfills';
 
const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.module.js',
      format: 'cjs',
      exports: 'auto'
    },
    {
      file: 'dist/index.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    nodePolyfills(),
  ]
};
 
export default config;