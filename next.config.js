const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    webpack: function (config) {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]'
          }
        }
      })
      return config
    }
})

// const { PHASE_PRODUCTION_SERVER } =
//   process.env.NODE_ENV === 'development'
//     ? {}
//     : !process.env.NOW_REGION
//       ? require('next/constants')
//       : require('next-server/constants');

// module.exports = (phase, { defaultConfig }) => {
//   if (phase === PHASE_PRODUCTION_SERVER) {
    
//     return {
//       /* production only config */
//     }
//   }

//   const webpack = require('webpack')
//   const withCSS = require('@zeit/next-css')
//   return withCSS({
//     webpack: function (config) {
//       config.module.rules.push({
//         test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 100000,
//             name: '[name].[ext]'
//           }
//         }
//       })
//       return config
//     }
// })
// }