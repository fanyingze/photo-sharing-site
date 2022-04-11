module.exports = {
  configureWebpack:config =>{
    config.externals = {
      'vue':'Vue',
      'vue-router':'VueRouter',
      'vuex':'Vuex',
      'axios':'axios',
      'element-ui':'ELEMENT',
    }
  }
}