const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/adminApi":{
        target:"http://localhost:3000",
        // target:"http://localhost:800",
        changeOrigin:true
      }
    },
    client: {  
      overlay: false  // 编译错误时，取消全屏覆盖（建议关掉）  
    } 
  }
})
//////////////////////////////--------------------------