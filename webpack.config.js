const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveTagPlugin = require('./RemoveTagPlugin.js'); // 自定义插件路径
const TerserPlugin = require('terser-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src'); // 源文件目录路径
const modPath = path.resolve(__dirname, '/'); // 源文件目录路径
const entryFiles = getAllFiles(srcPath); // 获取所有源文件路径

const entry = {};
entryFiles.forEach(file => {
    const extension = path.extname(file);
    if (extension === '.js') {
        const relativePath = path.relative(srcPath, file);
        const fileName = path.basename(file, extension);
        entry[fileName] = `${relativePath.replace(/\\/g, '/')}`;
    }
});

module.exports = {
    mode: 'production',
    entry: {
  index: 'view/index.js'
},
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出目录路径
        filename: '[name]-[hash].js' // 输出文件名使用占位符 [name]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    module: {
        rules: [
            // 添加适合您项目的加载器规则
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `${srcPath}/index.html`), // 模板文件路径
            filename: 'index.html', // 输出的 HTML 文件名
          }),
          new RemoveTagPlugin({
            excludeTag: /<script\s+type="module"\s+src="\.[^"]+"><\/script>/i, // 要移除的标签正则表达式
          }),
        
    ],
    resolve: {
        extensions: ['.js'],
        alias: generateAlias(srcPath),
        modules: [
            'node_modules', // 默认的node_modules路径
            modPath // 添加src路径作为解析模块的目录
        ]
    }
};

// 递归获取目录下的所有文件路径
function getAllFiles(dirPath, filelist = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, filelist);
        } else {
            filelist.push(filePath);
        }
    });
    return filelist;
}

function generateAlias(srcPath) {
    const alias = {};
    const directories = fs.readdirSync(srcPath, { withFileTypes: true });
  
    directories.forEach((dir) => {
      const dirPath = path.resolve(srcPath, dir.name);
      if (dir.isDirectory()) {
        const aliasName = dir.name.toLowerCase();
        alias[aliasName] = dirPath;
      }
    });
  
    return alias;
  }