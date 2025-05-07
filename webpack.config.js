const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isAnalyze = process.env.ANALYZE === 'true';

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/main.tsx')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@processes': path.resolve(__dirname, 'src/processes')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      emitWarning: true
    }),
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  }
};
