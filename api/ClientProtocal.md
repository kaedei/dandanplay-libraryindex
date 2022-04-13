# 弹弹play专用链使用说明

（此文档仍在完善中）

## 关于弹弹play专用链

弹弹play专用链是用来从其他程序（如浏览器）唤起本机已安装的弹弹play播放器，并执行后续操作的一种协议（protocol）。专用链的前缀为`ddplay:`，目前仅PC版本支持专用链。

弹弹play PC版 v12.2.0 版本后，支持通过ddplay专用链拉起弹弹play客户端并串流播放在线媒体文件。之前的版本ddplay专用链只能拉起播放本机视频，或创建基于torrent文件和magnet磁力链的下载任务。

## 使用方式

### 串流播放网络视频

比如现在有一个mp4视频的串流地址：
`http://localhost:8888/D%3A/%E8%A7%86%E9%A2%91/Princess%20Principal/%5BHYSUB%5DPrincess%20Principal%5B01v2%5D%5BGB_MP4%5D%5B1280X720%5D.mp4`

在它的前面添加一个 `ddplay:` 协议，浏览器即可拉起弹弹play进行在线播放。请注意，ddplay协议以 `ddplay:` 开头，后面没有 `//`。
`ddplay:http://localhost:8888/D%3A/%E8%A7%86%E9%A2%91/Princess%20Principal/%5BHYSUB%5DPrincess%20Principal%5B01v2%5D%5BGB_MP4%5D%5B1280X720%5D.mp4`

如果url比较复杂，也可以将它整体编码，即用 encodeURIComponent() 或其他等效方式进行URI编码，弹弹play也是可以识别的。注意前面的 ddplay: 前缀不变。
`ddplay:http%3A%2F%2Flocalhost%3A8888%2FD%253A%2F%25E8%25A7%2586%25E9%25A2%2591%2FPrincess%2520Principal%2F%255BHYSUB%255DPrincess%2520Principal%255B01v2%255D%255BGB_MP4%255D%255B1280X720%255D.mp4`

## 支持串流的协议
当前弹弹play支持串流的协议包括
- http
- https
- ftp
- ftps
- rtsp
- rtmp
- mms
- smb
