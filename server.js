const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const tea = require('./tea');
const app = express();

//tea

app.use(tea) 

// 配置静态文件目录
app.use(express.static(path.join(__dirname, 'src')));

// 配置代理
app.use('/api', createProxyMiddleware({
  target: 'http://127.0.0.1:8080',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/',
  },
}));

// 适配前端路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000');
});
