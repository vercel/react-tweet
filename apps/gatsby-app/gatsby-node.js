const path = require(`path`)

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()

  config.module.rules.forEach((rule) => {
    rule.oneOf?.forEach((rule) => {
      rule.use?.forEach((plugin) => {
        if (
          plugin.loader.includes('/css-loader') ||
          plugin.loader.includes('/mini-css-extract-plugin')
        ) {
          if (plugin.options.modules?.namedExport) {
            plugin.options.modules.namedExport = false
          }
        }
      })
    })
  })
  actions.replaceWebpackConfig(config)
}
