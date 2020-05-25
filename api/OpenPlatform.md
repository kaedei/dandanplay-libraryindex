# 弹弹play开放平台介绍

开放平台文档及在线调试工具：https://api.acplay.net/swagger

## 一、介绍

### 1.平台历史与简介
很久以前，弹弹play只是一个能播放弹幕的本地视频播放器，但是互联网上视频众多，即使是某个动画的同一集，都会有大量字幕组发行大量不同版本但是内容相同的视频文件，这些视频是独立而分散的，比如在B站经常会看到某个新番有众多字幕组的多个版本，而这些版本间的弹幕并不互通。所以为了解决多个视频共享弹幕的问题，我们决定引入服务器端。

有了服务器端之后，就可以针对每个节目建立唯一的弹幕池（弹弹play里叫**弹幕库**），然后让不同的视频关联到同一个弹幕库，获取同一份弹幕，最终解决了不同视频能够共享弹幕的问题。

弹弹play开放平台，就是基于弹弹play播放器的这个功能（弹幕收发、文件识别）而发展出来的。目的是为了重新组织互联网上复杂混乱的视频文件世界，将它们识别出来并进行归类。

### 2.客户端调用流程

首先，在打开视频文件的时候，客户端应该调用 [Match API](https://api.acplay.net/swagger/ui/index#!/Match/Match_MatchAsync)，传递视频文件名、hash、长度、大小之后，服务器端对文件进行识别。Match API会返回一个“此文件最有可能是...”的列表，用户需要在此列表中选择一个最适合的项目。

客户端将会得到一个`节目编号(EpisodeId)`，请保存此视频文件和此`节目编号`的关联。（`节目编号`表示的是某个动画的某一集，一个`节目编号`可以关联很多个视频，一个视频只能关联到一个`节目编号`。）

之后，客户端就可以通过`节目编号`来调用 [Comment API](https://api.acplay.net/swagger/ui/index#!/Comment/Comment_GetAsync) 获取弹弹play服务器上的弹幕了。

弹弹play服务器上的弹幕数量不够怎么办？这时可以调用 [Related API](https://api.acplay.net/swagger/ui/index#!/Related/Related_GetRealtedAsync)，客户端可以通过`节目编号`获得这个节目在A(acfun)B(bilibili)C(tucao)站上都有哪些对应的网址，从而解析这些网址并加载弹幕。

从网址解析出弹幕，除了自行编写解析代码，也可以使用 [ExtComment API](https://api.acplay.net/swagger/ui/index#!/Comment/Comment_GetExtCommentAsync)。

最后，当用户发送弹幕时，可以再次调用Comment API。

除此之外，当Match API返回的列表中没有用户心中所想的节目时，仍可通过 [Search API](https://api.acplay.net/swagger/ui/index#!/Search/Search_SearchEpisodesAsync) 指定动画名称手动进行搜索。


## 二、API使用方式

### 1.编码方式
弹弹play API统一使用UTF-8编码。

### 2.HTTP谓词

请按照API文档的介绍，通过GET/POST等方式连接到网址，如： 
```
GET https://api.acplay.net/api/v1/match?filename=轻音少女10&hash=00000000000000000000000000000000&duration=1500&length=1000
```

### 3.服务器返回格式
如果希望服务器返回JSON格式，请在HTTP Header中设置 `Accept: application/json` 。如果希望服务器返回XML格式，请在HTTP Header中设置 `Accept: application/xml` 。同时设置了这两项的情况下服务器将默认使用 `application/xml` 。

如果HTTP Header中未设置 `Accept` 头，服务器将默认使用 `application/json`，但我们不保证将来会一直保持这种设置，所以还是请尽量添加此头信息。

推荐在HTTP Header中设置 `Accept-Encoding: gzip`，服务器将会使用压缩格式返回数据，这样能够有效节省传输的数据量与带宽消耗。目前服务器支持 gzip/deflate 两种压缩方式。

### 4.提交数据格式

提交数据时，如果您的数据是JSON格式，请在HTTP Header中设置 `Content-Type: application/json`

提交数据时，如果您的数据是XML格式，请在HTTP Header中设置 `Content-Type: application/xml`

请注意，当前弹弹play API不支持跨域提交。

### 5.User-Agent

请在所有请求的 HTTP Header 中附加客户端的 `User-Agent` 便于我们进行数据统计。**对于没有设置 User-Agent 的 API 请求，服务器可能会拒绝返回数据。**

`User-Agent`的推荐格式为 `AppName/Platform Version`。例如您的APP名称为 dandanplay-test，运行在Android系统上，当前版本号是 1.2.3 ，那么可以设置成 `dandanplay-test/android 1.2.3`。推荐全部使用小写英文和数字，版本号这里请遵循 `major.minor[.build[.revision]]` 格式，例如 1.0、1.2、1.2.3、1.2.3.456 都是正确的版本号。

### 6.测试视频

推荐使用下面的视频测试API有效性，此视频前16MB数据的MD5为  `658d05841b9476ccc7420b3f0bb21c3b`

- 下载地址：http://pan.baidu.com/s/1GNkQE

## 三、在线文档和调试工具

### 1.访问在线接口调试工具

访问 https://api.acplay.net/swagger 点击进入后在上方下拉列表选择v2版本，然后点击右边的Explore按钮刷新API列表。

API分为**无需验证**和**需要验证**两种，无需验证的API包括获取弹幕、匹配文件等常见功能。需要验证的API会在接口说明文字里面提示。


### 2.需要验证的API的调用流程

#### 登录
在你的应用（如网站或是后台脚本等）启动的时候，调用 `POST https://api.acplay.net/api/v2/login` 接口，提交json请求。
```json
{
 "userName": "你的弹弹play用户名",
 "password": "密码",
 "appId": "应用ID",
 "unixTimestamp": 88888888,
 "hash": "计算出的Hash"
}
```
 
#### Hash参数的计算方法

将登录请求中 `appId` `password` `unixTimestamp` `userName` 属性的值以及您应用的 `AppSecret` 密钥的值依次拼接起来， 计算出32位MD5（不区分大小写）。举例来说，AppID为dandanplay，AppSecret为FFFFF，用户名为test1，密码为test2，那么计算方法将会是 `hash=MD5(dandanplaytest2666666666test1FFFFF)`。

#### 获取token

如果登录成功，返回的json中将包括一个 `token` 字段，这个token值就可以用于调用所有需要验证的API（比如首页、关注、搜索等）。这个token的有效期是21天（App开发者登录自己开发的App时有效期为一年），过期前可一直使用，建议把它的值缓存起来或者放到全局变量中，不用每次调用API前都刷新一遍。有效期中可以调用 `/api/v2/login/renew` 接口获取到包含新有效期的token。

 
#### 调用API（以搜索API为例）

搜索API的地址是
```
GET https://api.acplay.net/api/v2/search/anime?keyword=关键词
```
在通过GET调用的时候，需要向HTTP Header中添加一个Authorization头，值为 `“Bearer”+空格+刚才获取的token`。

用Curl来表示的话，类似于
```bash
curl -X GET --header 'Accept:application/json' --header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbG……(完整的token)''https://api.acplay.net/api/v2/search/anime?keyword=eva'
```
 

返回的json类似于这样，具体每个字段的含义请参考在线文档
```json
{
  "animes": [
    {
      "animeId": 22,
      "animeTitle": "新世纪福音战士",
      "type": "tvseries",
      "typeDescription": "TV动画",
      "imageUrl": "https://dandanimg.b0.upaiyun.com/anime/22.jpg",
      "startDate": "1995-10-04T00:00:00",
      "episodeCount": 26,
      "isFavorited": false
    },
    {
      "animeId": 202,
      "animeTitle": "新世纪福音战士 The End of Evangelion",
      "type": "movie",
      "typeDescription": "剧场版",
      "imageUrl": "https://dandanimg.b0.upaiyun.com/anime/202.jpg",
      "startDate": "1997-07-19T00:00:00",
      "episodeCount": 1,
      "isFavorited": true
    },
    {
      "animeId": 4847,
      "animeTitle": "新世纪福音战士 新剧场版 序",
      "type": "movie",
      "typeDescription": "剧场版",
      "imageUrl": "https://dandanimg.b0.upaiyun.com/anime/4847.jpg",
      "startDate": "2007-09-01T00:00:00",
      "episodeCount": 1,
      "isFavorited": true
    },
    {
      "animeId": 6184,
      "animeTitle": "EVA爆笑学园",
      "type": "web",
      "typeDescription": "网络放送",
      "imageUrl": "https://dandanimg.b0.upaiyun.com/anime/6184.jpg",
      "startDate": "2007-03-20T00:00:00",
      "episodeCount": 24,
      "isFavorited": false
    }
  ],
  "errorCode": 0,
  "success": true,
  "errorMessage": ""
}
```

### 3.在在线调试工具中调试需要验证的API
首先，你需要通过上文所述的各种方式登录后获取到 `token` ，可以通过代码调用的方式获取，也可以使用在线工具手动构建登录请求。


获取到token之后，在页面右上角的文本框中，填写 `Bearer+空格+你的token`：


然后点击**Explore**按钮，即可进入“已验证”的状态，之后在调用搜索API的时候，在线工具会自动在所有请求的http header中添加Authorization头。
