# dandanplay-libraryindex
弹弹play Windows/UWP客户端远程访问功能的html首页（媒体库内容的展示以及视频播放）

弹弹play每次更新时会附带此项目中master分支最新版的html/js/css和图片文件。

## 文件说明
* `index.html` 为首页，将会通过 `http://本机ip/` 访问
* `video.html` 为视频播放页面，将会通过 `http://本机ip/web/{视频hash}` 访问
* 所有javascript文件需要放在 `js` 文件夹中
* 所有css文件和图片文件需要放在 `css` 文件夹中

## 测试方法
1. 首先安装弹弹play Windows/UWP版最新版本（至少为6.5.0）
2. 点击首页右上角的“远程访问”按钮，启用远程访问功能
3. 将本项目git clone到本地文件夹后，把所有文件复制替换到弹弹play安装文件夹下的 `web` 文件夹中
4. 使用浏览器访问“远程访问”功能中显示的IP地址（一般是本机IP）即可，如果无法访问请暂时关闭Windows防火墙

## 关于html文件
弹弹play使用 [NancyFx](http://nancyfx.org/) 作为web应用服务器，项目中的html页面将会通过 [The Super Simple View Engine](https://github.com/NancyFx/Nancy/wiki/The%20Super%20Simple%20View%20Engine) 进行预处理后输出。
页面中的 `@Model.属性名称`、`@Each`、`@EndEach`、`@Current.属性名称` 等标识即为动态填充的部分，修改时请注意不要修改这里。

## 目前使用的第三方组件
* [ABPlayerHTML5](https://github.com/jabbany/ABPlayerHTML5)
* [CommentCoreLibrary](https://github.com/jabbany/CommentCoreLibrary)
* jQuery
* Bootstrap