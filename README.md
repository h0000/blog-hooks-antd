# 简介

## 目录结构

src 前端界面源码
server 后台服务源码

## 安装依赖

前端界面 npm i
移动node_modules/tinymce文件夹到public目录下  npm run postinstall
后台服务 cd server
        npm i

## 启动

前端界面 npm start
后台服务 cd server
        npm start

## 技术栈

前端使用 react-create-app快速创建，使用react js框架，antd ui组件库，react-router构建前端路由，react-redux、@reduxjs/toolkit管理用户状态，使用tinymce编辑器编辑文章。
后端基于nodejs，使用koa框架，koa-router路由，sequelize连接管理mysql数据库。目前还没有对接口进行权限判断。
