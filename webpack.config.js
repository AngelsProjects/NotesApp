const { CleanWebpackPlugin }     = require('clean-webpack-plugin'),
      Dotenv                     = require('dotenv-webpack'),
      FaviconsWebpackPlugin      = require('favicons-webpack-plugin'),
      ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'),
      HtmlWebpackPlugin          = require('html-webpack-plugin'),
      MiniCssExtractPlugin       = require('mini-css-extract-plugin'),
      path                       = require('path'),
      ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin'),
      TsconfigPathsPlugin        = require('tsconfig-paths-webpack-plugin'),
      UglifyJsPlugin             = require('uglifyjs-webpack-plugin'),
      webpack                    = require('webpack');

const env        = process.env.NODE_ENV;
const isDev      = env === 'development';
const { deploy } = process.env;

module.exports = {
  context  : __dirname,
  devServer: {
    contentBase       : path.join(__dirname, 'build'),
    historyApiFallback: true,
    hot               : true,
    port              : 3000
  },
  devtool: deploy ? 'none': 'source-map',
  entry  : './src/index',
  /* This is only for backend 
  externals: [nodeExternals()],
  */
  target : 'web',                                          // 'web' for front-end & 'node' for backend
  mode   : env === 'none' || deploy ? env: 'development',
  module : {
    rules: [
      {
        enforce: 'pre',
        test   : /\.(ts|tsx)?$/,
        loader : 'eslint-loader',
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
      {
        test   : /\.(ts|js)x?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'build'),
          path.resolve(__dirname, '**/*.spec.ts')
        ],
        use: {
          loader : 'babel-loader',
          options: {
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true
                }
              ],
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread'
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs     : '3',
                  useBuiltIns: 'entry'
                }
              ],
              '@babel/preset-typescript',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use : [
          {
            loader : MiniCssExtractPlugin.loader,
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              importLoaders: 1,
              hmr          : env === 'development'
            }
          },
          'css-loader',
          {
            loader : 'postcss-loader',
            options: {
              ident  : 'postcss',
              plugins: () => [require('tailwindcss'), require('autoprefixer')]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        use : [
          {
            loader : 'file-loader',
            options: {
              outputPath: 'assets/images',
              esModule  : false
            }
          }
        ]
      },
      {
        test   : /\.html$/i,
        exclude: /node_modules/,
        use    : [
          {
            loader : 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use : [
          {
            loader : 'file-loader',
            options: {
              outputPath: 'assets/fonts',
              esModule  : false
            }
          }
        ]
      },
      {
        test   : /\.json$/,
        exclude: /node_modules/,
        loader : 'json-loader',
        type   : 'javascript/auto'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  output: {
    path             : path.join(__dirname, '/build'),
    chunkFilename    : '[id].js',
    filename         : '[hash].bundle.js',
    sourceMapFilename: '[file].map',
    publicPath       : deploy
      ? isDev
        ? process.env.npm_package_bugs_url
        :  process.env.npm_package_homepage
      :  '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_VERSION': JSON.stringify(
        process.env.npm_package_version
      )
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename     : !deploy ? '[name].css': '[name].[hash].css',
      chunkFilename: !deploy ? '[id].css'  : '[id].[hash].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/serviceWorker.ts')
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new FaviconsWebpackPlugin({
      logo    : './public/favicon.ico',
      favicons: {
        appName       : process.env.npm_package_name,
        appDescription: process.env.npm_package_description,
        developerName : process.env.npm_package_author,
        developerURL  : null,
        background    : '#ddd',
        theme_color   : '#333',
        icons         : {
          coast : true,
          yandex: true
        }
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: true,
      eslint    : {
        enabled: true,
        files  : './src/**/*.{ts,tsx,js,jsx}',
        options: { cache: false }
      }
    })
  ],
  resolve: {
    extensions      : ['.mjs', '.json', '.ts', '.tsx', '.js', 'jsx'],
    symlinks        : false,
    cacheWithContext: false,
    plugins         : [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        logLevel  : 'info',
        extensions: ['.ts', '.tsx']
      })
    ]
  }
};

if (env === 'production') {
  module.exports.plugins.push(
    new Dotenv({
      path  : './.env.prod',
      safe  : './.env.prod',
      expand: true
    })
  );
}

if (isDev)
  module.exports.plugins.push(
    new Dotenv({
      path  : './.env.dev',
      safe  : './.env.dev',
      expand: true
    })
  );

if (env === 'local')
  module.exports.plugins.push(
    new Dotenv({
      path  : './.env.local',
      safe  : './.env.local',
      expand: true
    })
  );
