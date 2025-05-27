const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const isAnalyze = process.env.ANALYZE === 'true';

// TODO: Разбить конфиг на прод и дев версии

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/main.tsx')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true
  },
  devtool: false,
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  },
  optimization: {
    usedExports: true,
    sideEffects: true,
    minimize: true,
    splitChunks: {
      chunks: 'all',
      // maxInitialRequests: 10,
      // maxAsyncRequests: 20,
      // minSize: 20 * 1024, // 20 KiB
      // maxSize: 244 * 1024, // 244 KiB

      cacheGroups: {
        mui: {
          test: /[\\/]node_modules[\\/]@mui[\\/]/,
          name: 'mui',
          chunks: 'all',
          enforce: true,
          priority: 20
        },

        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-vendors',
          chunks: 'all',
          enforce: true,
          priority: 10
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
          priority: 0
        }
      }
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: true,
            dead_code: true
          }
        }
      })
    ]
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
    ...(isAnalyze ? [new BundleAnalyzerPlugin({ generateStatsFile: true })] : [])
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
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false
              }
            }
          }
        ]
      },
      // для prod окружения
      // {
      //   test: /\.css$/i,
      //   exclude: /\.module\.css$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader']
      // },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        type: 'asset/resource',
        exclude: /MaterialIcons-Regular\.ttf$/ // <- ОТКЛЮЧАЕМ загрузку
      }
    ]
  }
};
