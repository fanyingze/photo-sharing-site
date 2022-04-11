# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### 服务器设置
如果需要部署到服务器上，需要修改server中的server.js的端口号以及，/routes/handle/utils/host.js的host
以及修改src的network/request.js中的baseURL
