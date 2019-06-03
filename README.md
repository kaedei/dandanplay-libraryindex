# dandanplay-libraryindex

弹弹play Windows/UWP客户端远程访问功能的html首页（媒体库内容的展示以及视频播放）

弹弹play每次更新时会附带此项目中master分支最新版的html/js/css和图片文件。

## 文件说明

* `index.html` 为首页，将会通过 `http://本机ip/` 访问
* `video.html` 为视频播放页面，将会通过 `http://本机ip/web/{视频id}` 访问
* `login.html` 为登录页，当启用了web验证功能时，匿名用户访问任意页面将会被重定向到此页面，将会通过 `http://本机ip/login.html` 访问
* 所有javascript文件需要放在 `js` 文件夹中
* 所有css文件和图片文件需要放在 `css` 文件夹中

## 测试方法

1. 首先安装弹弹play Windows/UWP版最新版本
2. 点击首页右上角的“远程访问”按钮，启用远程访问功能，启用开发者工具，点击保存设置
3. 将本项目git clone到本地文件夹后，把所有文件复制替换到弹弹play安装文件夹下的 `web` 文件夹中
4. 使用浏览器访问“远程访问”功能中显示的IP地址（一般是本机IP或者`127.0.0.1`），如果无法访问请暂时关闭Windows防火墙
5. 修改html文件并保存后，刷新浏览器即可看到变化

## 关于html文件

弹弹play使用 [NancyFx](http://nancyfx.org/) 作为web应用服务器，项目中的html页面将会通过 [The Super Simple View Engine](https://github.com/NancyFx/Nancy/wiki/The%20Super%20Simple%20View%20Engine) 进行预处理后输出。
页面中的 `@Model.属性名称`、`@Each`、`@EndEach`、`@Current.属性名称` 等标识即为动态填充的部分，修改时请注意不要修改这里。

### **index.html** 首页的视图模型

在首页中，可以通过 `@Each.VideoFiles` 开始循环访问首页中的视频数据。使用 `@Current.属性名称` 在循环中访问当前循环对象的属性数据。

* `@Each.VideoFiles` 开始循环访问视频列表
* `@EndEach` 结束视频列表循环
* `@Current.Hash` 当前视频的Hash值
* `@Current.Name` 视频文件名
* `@Current.AnimeId` 视频关联的作品ID
* `@Current.AnimeTitle` 作品标题
* `@Current.EpisodeId` 弹幕库ID
* `@Current.EpisodeTitle` 剧集标题
* `@Current.Duration` 视频时长（整数，秒）
* `@Current.DurationText` 视频时长（文字，如 _24:56_ ）
* `@Current.Size` 视频文件体积（整数，Byte）
* `@Current.SizeText` 视频文件体积（文字，如 _123.45MB_ ）
* `@Current.LastPlay` 视频上次播放的日期时间（文字，如 _今天08:12_ 、 _昨天22:34_）
* `@Model.WebSiteName` 网站名称
* `@Model.AboutLink` 顶部关于按钮的目标网址
* `@Model.UserName` 当前登录的用户名
* `@Model.WebServerInfo` 当前网站的状态信息
* `.IsAnonymous` 当前是否为匿名用户，可以配合@If语句使用
* `.HasFilter` 当前是否设置了过滤条件
* `.ShowVideoList` 当前是否设置了“显示首页视频列表”选项

### **video.html** 播放页的视图模型

在播放页中，可以通过 `@Model.属性名称` 访问首页视图模型 (ViewModel) 数据。 

* `@Model.Hash` 当前播放的视频文件的Hash值
* `@Model.Video` 视频串流地址
* `@Model.Image` 视频缩略图地址
* `@Model.AnimeTitle` 作品标题
* `@Model.EpisodeTitle` 剧集标题
* `@Model.Color` 当前播放器的主题颜色（文字，如 _#0099FF_）
* `@Model.SubtitleVtt` 字幕文件（vtt格式）地址
* `@Each.VideoFiles` 剧集列表中的视频文件
* `@Current.EpisodeTitle` 剧集标题
* `@Current.FileName` 文件名

## 目前使用的第三方组件

* [DPlayer](https://github.com/MoePlayer/DPlayer)
* jQuery
* Bootstrap