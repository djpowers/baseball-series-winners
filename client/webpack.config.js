module.exports = {
  entry: './src/app.js',
  output: {
    filename: './bundle.js',
  },
  watch: true,
  devServer: {
    compress: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
      },
    },
  },
};
