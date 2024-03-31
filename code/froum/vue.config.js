const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const { CKEditorTranslationsPlugin } = require('@ckeditor/ckeditor5-dev-translations');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = defineConfig({
  transpileDependencies: [
    /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
  ],
  configureWebpack: {
    plugins: [
      // CKEditor&nbsp;5 needs its own plugin to be built using webpack.
      new CKEditorTranslationsPlugin({
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: 'zh-cn',

        // Append translations to the file matching the `app` name.
        translationsOutputFile: /app/
      })
    ]
  },
  chainWebpack: config => {
    // (1.) To handle the editor icons, get the default rule for *.svg files first:
    const svgRule = config.module.rule('svg');

    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader');

    // (2.) Transpile the .css f//cunxicaoiles imported by the editor using PostCSS.
    // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return {
          postcssOptions: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
            },
            minify: true
          })
        };
      });
  },

  transpileDependencies: true,
  devServer: {
    proxy: {
      "/froumApi": {
        target: "http://localhost:3000",
        // target:"http://localhost:800",
        changeOrigin: true
      }
    },
    client: {
      overlay: false  // 编译错误时，取消全屏覆盖（建议关掉）  
    }
  }
})
//////////////////////////////--------------------------


