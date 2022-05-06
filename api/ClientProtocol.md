# 目录

- [弹弹play专用链使用说明](#play)
  - [关于弹弹play专用链](#play)
  - [相关项目或示例](#)
  - [串流播放网络视频](#)
  - [拉起并建立磁力链（magnet）下载任务](#magnet)
  - [播放本地视频文件](#)

# 弹弹play专用链使用说明

## 关于弹弹play专用链

弹弹play专用链是用来从其他程序（如浏览器）唤起本机已安装的弹弹play播放器，并执行后续操作的一种协议（protocol）。专用链的前缀为`ddplay:`，目前仅PC版本支持专用链。

弹弹play PC版 v12.2 版本后，支持通过ddplay专用链拉起弹弹play客户端并串流播放在线媒体文件。之前的版本ddplay专用链只能拉起播放本机视频，或创建基于torrent文件和magnet磁力链的下载任务。

## 相关项目或示例

* [Emby调用弹弹play](https://greasyfork.org/zh-CN/scripts/443916)

## 串流播放网络视频

1. 格式

比如现在有一个mp4视频的串流地址：
`http://localhost:8888/D%3A/%E8%A7%86%E9%A2%91/Princess%20Principal/%5BHYSUB%5DPrincess%20Principal%5B01v2%5D%5BGB_MP4%5D%5B1280X720%5D.mp4`

在它的前面添加一个 `ddplay:` 协议，浏览器即可拉起弹弹play进行在线播放。请注意，ddplay协议以 `ddplay:` 开头，后面没有 `//`。
`ddplay:http://localhost:8888/D%3A/%E8%A7%86%E9%A2%91/Princess%20Principal/%5BHYSUB%5DPrincess%20Principal%5B01v2%5D%5BGB_MP4%5D%5B1280X720%5D.mp4`

由于url有可能包含各种特殊字符，**我们推荐先将它整体编码后再进行拼接**，即用 encodeURIComponent() 或其他等效方式进行URI编码，弹弹play也是可以识别的。注意前面的 ddplay: 前缀不变。
`ddplay:http%3A%2F%2Flocalhost%3A8888%2FD%253A%2F%25E8%25A7%2586%25E9%25A2%2591%2FPrincess%2520Principal%2F%255BHYSUB%255DPrincess%2520Principal%255B01v2%255D%255BGB_MP4%255D%255B1280X720%255D.mp4`

2. 示例

```
ddplay:http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4
ddplay:http%3A%2F%2Fclips.vorwaerts-gmbh.de%2Fbig_buck_bunny.mp4
```

3. 支持串流的协议

当前弹弹play支持串流的协议包括
http / https / ftp / ftps / rtsp / rtmp / mms / smb 


4. 附加文件名以辅助文件识别

因为url中通常不包含文件名等信息，或是文件名隐藏于url的一部分，使用弹弹play打开串流链接时，将无法得知文件真实的信息。

在弹弹play 12.3版本后，支持添加`filePath=`参数，您可以用它来向弹弹play提供串流的文件名的真实路径（或仅文件名），以辅助播放器进行弹幕库匹配。
当传入`filePath=`参数后，弹弹play在显示“关联弹幕库”窗口时，将优先使用此文件路径进行猜测，可以得到更准确的匹配结果。大部分情况下，都不再需要手动输入作品标题进行搜索了。

使用方式：
* 准备好视频的完整本地路径，如果没有完整路径就用文件名：`D:\视频\2022\[FLsnow&SumiSora][Kaguya-sama_S3][01][CHS][720p].mp4`
* 加入 `filePath=` 参数名，然后用分隔符 `|` 将其拼到串流地址的后面。
* 最终字符串类似于 `http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4|filePath=D:\视频\2022\[FLsnow&SumiSora][Kaguya-sama_S3][01][CHS][720p].mp4`
* 将整个字符串用 encodeURIComponent() 编码，前面加上 `ddplay:`前缀，就是最终的专用链地址了：
```
ddplay:http%3A%2F%2Fclips.vorwaerts-gmbh.de%2Fbig_buck_bunny.mp4%7CfilePath%3DD%3A%E8%A7%86%E9%A2%91%C2%822%5BFLsnow%26SumiSora%5D%5BKaguya-sama_S3%5D%5B01%5D%5BCHS%5D%5B720p%5D.mp4
```



## 拉起并建立磁力链（magnet）下载任务

1. 格式

在常见的 magnet: 链接前添加 ddplay: 前缀即可，或是将`magnet:`直接替换为`ddplay:`。弹弹play支持解析32位和40位的BT hash。

2. 示例

```
ddplay:magnet:?xt=urn:btih:E7FC73D9E20697C6C440203F5884EF52F9E4BD28
ddplay:?xt=urn:btih:E7FC73D9E20697C6C440203F5884EF52F9E4BD28
```


## 播放本地视频文件

1. 格式

支持通过专用链拉起播放器并播放本地视频文件。

但是如果是本机app，建议通过命令行而不是专用链的方式进行调用。例如 `C:\dandanplay-x64\dandanplay.exe D:\视频\test.mp4`

专用链的调用方式就是在`ddplay:`后跟随视频文件的完整地址即可，例如 `ddplay:D:\视频\test.mp4`。

不过，如果是通过浏览器拉起，强烈建议对文件路径进行 encodeURIComponent() 编码：`ddplay:D%3A%5C%E8%A7%86%E9%A2%91%5Ctest%20-%20%E5%89%AF%E6%9C%AC.mp4`

2. 附加更多参数

弹弹play支持在播放本地视频文件时，附加一个或多个本地xml弹幕文件，甚至附加一个外部音轨。多个参数之间通过分隔符 `|` 来分隔。请注意，这时ddplay:后面的内容 **必须通过 encodeURIComponent() 进行编码**，下面将举例说明。

- 如果希望播放视频并附加一个弹幕文件，请先拼接成类似这样的字符串：`D:\视频\test.mp4|D:\视频\测试.xml`

- 如果希望播放视频并附加一个外部音轨，请先拼接成类似这样的字符串：`D:\视频\test.mkv|D:\视频\测试.mka`

- 如果希望播放视频并附加多个弹幕文件，请先拼接成类似这样的字符串：`D:\视频\test.mp4|D:\视频\测试-1.xml|D:\视频\测试-2.xml`

之后将这个字符串进行编码，并连上`ddplay:`协议：`ddplay:D%3A%5C%E8%A7%86%E9%A2%91%5Ctest.mp4%7CD%3A%5C%E8%A7%86%E9%A2%91%5C%E6%B5%8B%E8%AF%95.xml`

大部分情况下是不需要这样做的，因为弹弹play支持自动发现同目录下匹配的字幕、弹幕以及外挂音轨文件。保留此项功能是为了给出更多可自定义的空间。

3. 示例

```
ddplay:D:\视频\test.mp4
ddplay:D:\视频\test - 副本.mp4
ddplay:D%3A%5C%E8%A7%86%E9%A2%91%5Ctest%20-%20%E5%89%AF%E6%9C%AC.mp4
ddplay:D:\视频\test.mp4|D:\视频\测试.xml
ddplay:D%3A%5C%E8%A7%86%E9%A2%91%5Ctest.mp4%7CD%3A%5C%E8%A7%86%E9%A2%91%5C%E6%B5%8B%E8%AF%95.xml
```

