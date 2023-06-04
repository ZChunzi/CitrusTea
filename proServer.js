const express = require('express')
const serveStatic = require('serve-static')
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path')
const app = express();

app.use(express.static('public'));

//此处配置代理
app.use('/api', createProxyMiddleware({
    target: 'http://127.0.0.1:8080',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/',
    },
}));

//配置运行目录
app.use(serveStatic(path.join(__dirname, '/dist')))

//适配前端路由
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist', 'index.html'))
})

app.listen(80, () => {
    console.log('App listening on port 80!');
});
