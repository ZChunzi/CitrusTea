const path = require('path');
const fs = require('fs');
const UglifyJS = require('uglify-js');

async function obfuscateCode(code) {
  const options = {
    compress: true,
    mangle: true,
    output: {
      beautify: false,
    },
  };

  const result = UglifyJS.minify(code, options);
  const obfuscatedCode = result.code;

  return obfuscatedCode;
}
/**
 * 将导入语句放到代码字符串的最前面
 * @param {string} code 原始代码字符串
 * @returns {string} 处理后的代码字符串
 */
function moveImportsToTop(code) {
  const importStatements = [];
  const otherStatements = [];

  // 将代码字符串按行分割
  const lines = code.split('\n');

  // 遍历每一行，将导入语句和其他语句分开保存
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('import')) {
      importStatements.push(line);
    } else {
      otherStatements.push(line);
    }
  }

  // 构建最终的代码字符串，导入语句放到最前面
  const finalCode = [...importStatements, ...otherStatements].join('\n');
  return finalCode;
}

//提取文件名
function extractFileName(path) {
  const match = /\/([^/]+)\.tea$/.exec(path);
  return match ? match[1] : null;
}

async function tea(req, res, next) {
  let btn = `    let buttons = document.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      let clickFunction = button.getAttribute('@click');

      if (clickFunction) {
          button.addEventListener('click', function () {
              eval(clickFunction+'()');
          });
      }
  }`
  if (req.url.endsWith('.tea')) {
    const filePath = path.join(__dirname, 'src', req.url);
    const teaContent = fs.readFileSync(filePath, 'utf8');
    const viewContent = teaContent.match(/<view>([\s\S]+)<\/view>/i)[1];
    const addjs = `<script src='/component/tea.js'></script>`//增加加载js
    let jsCode = `
      document.getElementById('app').innerHTML = \`${viewContent}\`;
    `;
    // Check if <style></style> tags exist in the teaContent
    const styleTags = teaContent.match(/<style>([\s\S]+)<\/style>/gi);
    if (styleTags) {
      // Extract the CSS code inside the <style></style> tags
      const extractedCode = styleTags.map((tag) =>
        tag.replace(/<\/?style>/g, '')
      );
      // Convert the CSS code to JavaScript code and add it to jsCode
      jsCode += extractedCode.map(
        (cssCode) => `
        var style = document.createElement('style');
        style.innerHTML = \`${cssCode}\`;
        document.head.appendChild(style);
      `
      ).join('\n');
      
    }

    // Check if <script></script> tags exist in the teaContent
    const scriptTags = teaContent.match(/<script>([\s\S]+)<\/script>/gi);
    jsCode+=btn
    if (scriptTags) {
      // Extract the JavaScript code inside the <script></script> tags
      const extractedCode = scriptTags.map((tag) =>
        tag.replace(/<\/?script>/g, '')
      );
      // Add the extracted JavaScript code to jsCode
      jsCode += extractedCode.join('\n');
    }

    //let filename = extractFileName(req.url)
    let j = `export default function() {${jsCode}}`
    const js = moveImportsToTop(j)
    //混淆算法
    const objs = await obfuscateCode(js)
    
    res.setHeader('Content-Type', 'application/javascript');
    res.send(objs);
  }else if(req.url.endsWith('.js')){
    const filePath = path.join(__dirname, 'src', req.url);
    const teaContent = fs.readFileSync(filePath, 'utf8');
    const codefix = await obfuscateCode(teaContent)
    res.setHeader('Content-Type', 'application/javascript');
    res.send(codefix);
  }
   else {
    next();
  }
}

module.exports = tea;



