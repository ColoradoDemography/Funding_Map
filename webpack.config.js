var path = require('path');
var webpack = require('webpack');

webpack.optimize.UglifyJsPlugin({ output: {comments: false} });
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
    entry:  {
      app: './src/common/js/app.js',
      vendor: ['./src/lib/js/jQDateRangeSlider-min.js','./src/lib/js/Leaflet.Modal.js','./src/lib/js/L.D3SvgOverlay.min.js','./src/lib/js/typeahead.jquery.js','babel-polyfill','./src/lib/js/leaflet.groupedlayercontrol.min.js']
    },
    output: {
        path:     'dest',
      publicPath: 'dest',
        filename: 'app.min.js',
    },
    externals: {
        "leaflet": "L",
        "d3": "d3",
        "jquery": "jQuery"
    },
    module: {
    preLoaders: [
       {
         test: /\.js$/, 
         include: path.join(__dirname, './src/common/js'),
         loader: 'eslint', 
         exclude: /node_modules/ 
       }
      
        ],
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, './src/common/js'),
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["es2015"],  
        }
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
    ]
  },
  plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new FlowStatusWebpackPlugin()
    ],
eslint: {  
    configFile: '.eslintrc'
},
  worker: {
		output: {
			filename: "/hash.worker.js"
		}
	}

};

