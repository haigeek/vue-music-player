# vue-music-player

基于开源的vue的音乐播放器（[原仓库](https://github.com/sjx1995/vue-music-player)）进行二次修改，
无后端服务器，基于nginx暴露出静态json文件作为数据来源。

献给我们曾经度过的青春。

-----------------------------------------------

一个基于vue的音乐播放网站

## 开始

```
// Project setup
npm install

// Compiles and hot-reloads for development
npm run serve

// Compiles and minifies for production
npm run build

// Run your tests
npm run test

// Lints and fixes files
npm run lint
```
## 使用GitHUb API驱动音乐列表

- 获取仓库一级目录内容：
    https://api.github.com/repos/app-AZ/njlizhi/contents
    
- 获取仓库子目录内容：
    https://api.github.com/repos/app-AZ/njlizhi/contents/directory

## 更新

- 2019.6.19 使用gitHub api为数据提供支持，可以收听全部录音室专辑

## 谢谢

- 原音乐资源来源：
    https://github.com/app-AZ/njlizhi