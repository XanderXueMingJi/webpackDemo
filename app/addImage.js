// 处理图片 
// 1.安装库 npm i --save-dev url-loader file-loader
// 2. 创建一个 images 文件夹，放入两张图片，并且在 app 文件夹下创建一个 js 文件(也就是当前js文件)处理图片


//添加css
//1. 安装库    npm i --save-dev css-loader style-loader
//2.原理: 前者可以让 CSS 文件也支持 impost，并且会解析 CSS 文件，后者可以将解析出来的 CSS 通过标签的形式插入到 HTML 中，所以后面依赖前者。

import './../styles/addImage.css';

let smallImg = document.createElement('img');

//必须require进来
smallImg.src = require('./../images/55.jpg');
document.body.appendChild(smallImg);



let big = document.createElement('img');
big.src = require('./../images/110.jpg');
document.body.appendChild(big);