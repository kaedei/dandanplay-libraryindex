# 弹弹play “远程访问” API

## 关于弹弹play“远程访问”功能

弹弹play“远程访问”功能能够在弹弹play播放器内部建立起一个微型web服务，可以让第三方app或是浏览器通过接口来控制播放器的播放、查看播放器内部数据、展示当前播放进度、获取弹幕、控制下载，甚至可以直接串流播放PC上的视频文件。

远程访问API即为面向外部app的应用程序接口。

## 原理

弹弹play“远程访问”功能是在弹弹play（for Windows/UWP客户端）中搭建了一个小型的http web应用服务器，并将播放器内部相关的功能和数据以RESTful API接口的形式暴露在局域网中。也就是说，弹弹play播放器既是一个客户端（相对于弹弹play服务器而言），又是一个服务器端（相对于其他应用）。

## 通过网址与端口访问

默认情况下，弹弹play将会监听本机所有IP的 `80` 端口，用户可以修改此项设置。假设本机IP为 `192.168.31.100`，那么你的应用则可以通过 `http://192.168.31.100:80` 连接到弹弹play“远程访问”服务。

如果当前机器有公网IP并绑定了域名，也可以通过域名进行访问，例如 `http://www.xxxxx.com:80`

## URL

远程访问API为了方便使用与开发，所有接口都以 `/api/v1` 开头，而且都可以直接通过HTTP `GET` 方法来访问到。
除了某些获取数据等类型的请求以外，客户端在发送请求后不需要判断返回码以及请求是否成功完成。
下面列表中，URL包含大括号的表示此处为参数，例如 `{hash}` 表示在访问这个API时需要将 `{hash}` 替换为真正的参数值。

所有API都支持CORS。

## API密钥验证

从9.0版开始，远程访问支持使用密钥对API进行加密。如果用户打开了这个设置，您的应用在访问时需要提供对应的密钥才可以正常返回数据，否则会返回http 401错误。通过验证的方式有两个，使用下列方法其中的一种即可：
（假设用户设置了 abcdefgh 作为API密钥） 

- 在http header添加Authorization头。例如: 
  - **Authorization: Bearer** abcdefgh
- 在url参数列表中增加token参数。例如：
  - /api/v1/control/volume/99?**token=abcde**
  - /api/v1/download/tasks/1122-3344-5566/?remove=1&**token=abcdefgh**

 可以通过 `/api/v1/welcome` 接口返回的 `tokenRequired` 参数来判断当前用户是否开启了密钥验证。

# API列表

## 1.获取欢迎信息： /api/v1/welcome 和 /welcome

### 参数与验证

无需API密钥即可调用。

### 返回值

```json
{
  "message": "Hello dandanplay user!",
  "version": "9.4.7.517",
  "time": "05/19/2019 11:45:45",
  "tokenRequired": true
}
```

### 返回值说明

- version：弹弹play当前的版本号，可以通过此值判断某些api是否存在。
- time：当前运行弹弹play播放器的本机时间。
- tokenRequired：表示当前是否开启了API验证，如果此项为 `true`，请求时需要附加密钥，详情请见上方“API验证”一节。

## 2.控制播放器调整音量 /api/v1/control/volume/{volume}

### 参数

- volume：整数，范围0-100

## 3.控制播放器跳转进度 /api/v1/control/seek/{time}

### 参数

- time：整数，范围0-max。单位为毫秒，例如传入 12345代表将视频跳转到第12.345秒处

## 4.控制播放器当前的播放状态 /api/v1/control/{method}

### 参数

- method：播放器要执行的动作
  - play：播放
  - stop：停止
  - pause：暂停
  - next：切换至下一个视频
  - previous：切换至上一个视频

## 5.获取当前正在播放的视频信息 /api/v1/current/video

### 返回值

```json
{
  "EpisodeId": "136290001",
  "AnimeTitle": "不受欢迎者之家",
  "EpisodeTitle": "第1话 ロマンティックあげるよ",
  "Duration": 720052,
  "Position": 0.455077559,
  "Seekable": true,
  "Volume": 100,
  "Playing": true
}
```

### 返回值说明

- EpisodeId：弹幕库编号，此值为字符串格式，并且可能为`null`
- AnimeTitle：主标题
- EpisodeTitle：子标题
- Duration：视频长度（毫秒），此数值可以用来配合跳转进度条api使用
- Position：当前进度，范围0.0-1.0
- Seekable：当前视频是否支持跳转进度，部分流媒体视频和直播视频不支持跳转
- Volume：当前播放器声音大小，范围0-100

## 6.获取当前视频的弹幕列表 /api/v1/current/comment

### 返回值（始终为xml格式）

```xml
<?xml version="1.0"?>
<ArrayOfVisualDmItem xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <VisualDmItem ID="6216430746861568" UserID="[BiliBili]a74890bc" Time="36.126" Mode="Normal" Color="16777215" Size="25" Timestamp="1538999075" Pool="0">没什么 人气</VisualDmItem>
  <VisualDmItem ID="6216455581335554" UserID="[BiliBili]ac3e8e82" Time="339.338" Mode="Normal" Color="16777215" Size="25" Timestamp="1538999123" Pool="0">这台词太恶意了</VisualDmItem>
  <VisualDmItem ID="6216487250952192" UserID="[BiliBili]6c718d25" Time="630.841" Mode="Normal" Color="16777215" Size="25" Timestamp="1538999183" Pool="0">安心的音效</VisualDmItem>
</ArrayOfVisualDmItem>
```
### 返回值说明

- ID：弹幕编号。在每个xml文件中保证唯一
- UserID：用户名称
- Time：弹幕出现时间，单位为秒
- Mode：弹幕模式
  - Normal：滚动弹幕
  - Top：顶部弹幕
  - Bottom：底部弹幕
- Size：弹幕字号。此数值在弹弹play中无实际作用
- Timestamp：弹幕发送时间。为Unix时间戳
- Pool：弹幕池。暂无实际作用。

## 7.获取当前播放列表内容 /api/v1/playlist

### 返回值

```json
[
  "Y:\\不受欢迎者之家\\[HYSUB]Himote House[01][GB_MP4][1280X720].mp4",
  "Y:\\不受欢迎者之家\\[HYSUB]Himote House[02][GB_MP4][1280X720]V2.mp4",
  "Y:\\不受欢迎者之家\\[HYSUB]Himote House[03][GB_MP4][1280X720].mp4",
  "Y:\\不受欢迎者之家\\[HYSUB]Himote House[04][GB_MP4][1280X720].mp4",
  "Y:\\不受欢迎者之家\\[HYSUB]Himote House[05][GB_MP4][1280X720].mp4",
  "Y:\\不受欢迎者之家\\[HYSUB]Himote House[06][GB_MP4][1280X720].mp4",
  "Y:\\不受欢迎者之家\\[HYSUB]Himote House[07][GB_MP4][1280X720].mp4"
]
```

### 返回值说明

字符串列表，内容为视频在本机硬盘上的完整路径。

## 8.获取媒体库中的所有内容 /api/v1/library

### 返回值

```json
[
  {
    "AnimeId": 14198,
    "EpisodeId": 141980003,
    "AnimeTitle": "佐贺偶像是传奇",
    "EpisodeTitle": "第3话 DEAD OR LIVE SAGA",
    "Id": "c004e475-d9bb-41e1-976b-7fce00997f3a",
    "Hash": "03778309A0E8A09C2F43603A490F2E98",
    "Name": "[Zombieland Saga][03][BIG5][1080P].mp4",
    "Path": "Y:\\[Zombieland Saga][03][BIG5][1080P].mp4",
    "Size": 518754774,
    "Rate": 0,
    "IsStandalone": false,
    "Created": "2018-10-21T23:14:59",
    "LastMatch": "0001-01-01T00:00:00",
    "LastPlay": "2019-04-25T18:00:22",
    "LastThumbnail": "2019-03-05T22:03:20",
    "Duration": 1420
  },
  {
    "AnimeId": 11167,
    "EpisodeId": 111670021,
    "AnimeTitle": "命运石之门 0",
    "EpisodeTitle": "第21话 結像のリナシメント Return of Phoenix",
    "Id": "686b4d07-d8de-4f2e-b716-3cf0843cc903",
    "Hash": "334763177A0B9A5647B263AA74E0A013",
    "Name": "[Nekomoe kissaten][Steins;Gate 0][21][GB][720P].mp4",
    "Path": "Y:\\[Nekomoe kissaten][Steins;Gate 0][21][GB][720P].mp4",
    "Size": 128023969,
    "Rate": 0,
    "IsStandalone": false,
    "Created": "2018-09-23T23:30:38",
    "LastMatch": "0001-01-01T00:00:00",
    "LastPlay": null,
    "LastThumbnail": "2019-03-05T22:03:22",
    "Duration": 1420
  },
  {
    "AnimeId": 13031,
    "EpisodeId": 130310010,
    "AnimeTitle": "Princess Principal",
    "EpisodeTitle": "第10话 Comfort Comrade",
    "Id": "07c0d08a-6191-49aa-866c-5ea91cf91f23",
    "Hash": "432A9EC48627FFA2F092B418840A5D98",
    "Name": "[HYSUB]Princess Principal[10][GB_MP4][1280X720].mp4",
    "Path": "Y:\\Princess Principal\\[HYSUB]Princess Principal[10][GB_MP4][1280X720].mp4",
    "Size": 158818535,
    "Rate": 0,
    "IsStandalone": false,
    "Created": "2017-10-08T17:09:31",
    "LastMatch": "0001-01-01T00:00:00",
    "LastPlay": null,
    "LastThumbnail": "2019-03-05T22:03:23",
    "Duration": 1470
  }
]
```

### 返回值说明

一个视频信息的列表。

- Id：此视频文件的唯一编号，GUID格式
- AnimeId：动画编号，属于相同动画的视频总有同样的动画编号
- EpisodeId：弹幕库编号
- AnimeTitle：主标题
- EpisodeTitle：子标题
- Hash：此视频的特征码（重要）
- Name：此视频的文件名（去除路径信息）
- Path：此视频在硬盘上的完整路径
- Size：文件体积，单位为Byte
- Rate：用户对此视频内容的打分，目前全部为0
- Created：弹弹play媒体库收录此视频的时间
- LastPlay：上次使用弹弹play播放此视频的时间
- Duration：视频时长，单位为秒
- LastThumbnail：上次生成缩略图的时间，可能为`null`
- IsStandalone：是否为独立文件，即不包含在媒体库监视文件夹内的文件

## 9.获取视频缩略图 /api/v1/image/{hash} 和 /api/v1/image/id/{id}

### 参数

- hash：视频特征码
- id：视频编号

### 返回值

jpeg格式的图片文件

## 10.控制播放器加载文件 /api/v1/load/{hash} 和 /api/v1/load/id/{id}

### 参数

- hash：视频特征码
- id：视频编号

### 备注

当使用 `hash` 参数加载文件时，如果有多个相同hash的视频（例如一个视频保存在了多个地方），将随机加载其中的一个。

## 11.获取指定视频的弹幕/api/v1/comment/{hash} 和 /api/v1/comment/id/{id}

### 参数

- hash：视频特征码
- id：视频编号

### 返回值（始终为xml格式）

```xml
<?xml version="1.0"?>
<i xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <chatserver>chat.bilibili.com</chatserver>
  <chatid>10000</chatid>
  <mission>0</mission>
  <maxlimit>8000</maxlimit>
  <source>e-r</source>
  <ds>931869000</ds>
  <de>937654881</de>
  <max_count>8000</max_count>
  <d p="37.26,1,25,16777215,1500358682,0,0,0">艾尔之光</d>
  <d p="1419.41,1,25,16777215,1500459905,0,0,0">自古红蓝。。。</d>
  <d p="825.54,1,25,16777215,1500479598,0,0,0">多萝西最早是绿野仙踪的女主角好不好</d>
  <d p="451.43,1,25,16777215,1500654750,0,0,0">高中JK拯救世界？</d>
  <d p="787646,5,25,16777215,1500746390,0,0,0">有人吗</d>
  <d p="1370.48,1,25,16777215,1500823550,0,0,0">这个ED想到狼辛</d>
  <d p="1043153,1,25,16777215,1500998696,0,0,0">cm先看看资料</d>
  <d p="1402.12,1,25,16777215,1501421432,0,0,0">观感不错啊</d>
  <d p="138.36,1,25,16777215,1501592568,0,0,0">药效过不了三集</d>
  <d p="1220.78,1,25,16777215,1501595590,0,0,0">没看懂，不打算让他妹逃亡之后为啥又改主意了</d>
  <d p="333.23,1,25,16777215,1502119367,0,0,0">常识是子弹其实打不穿轮胎</d>
</i>
```

### 备注

返回格式与BiliBili的弹幕格式相同，不再详述。弹弹play会联网获取最新的弹幕，所以访问此api时可能很久才会返回弹幕。

## 12.串流视频 /api/v1/stream/{hash} 和 /api/v1/stream/id/{id}

### 参数

- hash：视频特征码
- id：视频编号

### 返回值

视频文件流，支持 range，可以直接在浏览器中播放。

## 13.获取下载任务列表 /api/v1/download/tasks

### 返回值

当前所有下载任务的列表。

```json
[
  {
    "Id": "9CF5D1F0A923B423848327F6AC533C72EFF37192",
    "Progress": 1,
    "IsDownloadFinished": true,
    "Title": "[DMG&MH][Shoujo Kageki Revue Starlight][12 END][720P][GB].mp4",
    "State": 6,
    "StateText": "Stopped",
    "TotalBytes": 124095425,
    "DownloadedBytes": 124095425,
    "DownloadSpeed": 0,
    "UploadSpeed": 0,
    "RemainTime": 0,
    "SavePath": "Y:\\少女歌剧",
    "Ignore": "",
    "CreatedTime": "2018-10-08T23:09:35.724706+08:00",
    "FirstFinishTime": null,
    "UpdatedTime": null,
    "EnableAcceleration": true,
    "EnteredAcceleration": false,
    "IsDeleted": false,
    "LazyLoad": true,
    "Files": [
      {
        "FileIndex": 0,
        "FileName": "[DMG&MH][Shoujo Kageki Revue Starlight][12 END][720P][GB].mp4",
        "FilePath": "Y:\\少女歌剧\\[DMG&MH][Shoujo Kageki Revue Starlight][12 END][720P][GB].mp4",
        "Progress": 1,
        "FileSize": 124095425
      }
    ],
    "ContainingFolder": "Y:\\少女歌剧\\[DMG&MH][Shoujo Kageki Revue Starlight][12 END][720P][GB].mp4"
  },
  {
    "Id": "A6A3CE0BB1F34752D349ABB5AEFFA2693A631178",
    "Progress": 1,
    "IsDownloadFinished": true,
    "Title": "[DMG&MH][Shoujo Kageki Revue Starlight][01][720P][GB].mp4",
    "State": 6,
    "StateText": "Stopped",
    "TotalBytes": 171046271,
    "DownloadedBytes": 171046271,
    "DownloadSpeed": 0,
    "UploadSpeed": 0,
    "RemainTime": 0,
    "SavePath": "Y:\\少女歌剧",
    "Ignore": "",
    "CreatedTime": "2018-09-07T12:06:23.7257195+08:00",
    "FirstFinishTime": null,
    "UpdatedTime": null,
    "EnableAcceleration": true,
    "EnteredAcceleration": false,
    "IsDeleted": false,
    "LazyLoad": true,
    "Files": [
      {
        "FileIndex": 0,
        "FileName": "[DMG&MH][Shoujo Kageki Revue Starlight][01][720P][GB].mp4",
        "FilePath": "Y:\\少女歌剧\\[DMG&MH][Shoujo Kageki Revue Starlight][01][720P][GB].mp4",
        "Progress": 1,
        "FileSize": 171046271
      }
    ],
    "ContainingFolder": "Y:\\少女歌剧\\[DMG&MH][Shoujo Kageki Revue Starlight][01][720P][GB].mp4"
  }
]
```

### 返回值说明

- Id：下载任务ID，即BT Hash
- Progress：下载进度，范围是0.0-1.0。可以通过此数字判断任务状态，小于1.0为未完成，大于等于1.0为已完成
- Title：下载任务标题
- State：（已弃用，请使用StateText）下载状态
  - 0：已停止
  - 1：已暂停（或正等待开始）
  - 2：正在下载
  - 3：正在做种
  - 4：正在计算Hash
  - 5：正在停止
  - 6：出错
  - 7：正在获取元数据
- StateText：下载状态
  - WaitingForStart
  - Downloading
  - Paused
  - Seeding
  - Stopping
  - Stopped
  - Hashing
  - Metadata
  - Error
- TotalBytes：下载任务总共字节数
- DownloadedBytes：已下载的字节数
- DownloadSpeed：下载速度，单位是 Byte/s
- UploadSpeed：上传速度，单位是 Byte/s
- RemainTime：剩余时间，单位是秒。-1表示无法估算或任务已暂停
- SavePath：下载保存目录
- Ignore：不下载（被忽略）文件的列表，使用相对路径，不同文件之间用“|”符号分割，例如 1.txt|example\2.txt|3.txt
- CreatedTime：任务创建时间，使用PC系统的当前时区
- FirstFinishTime：首次下载完成的时间，可能为`null`
- UpdatedTime：任务信息更新时间，可能为`null`
- EnableAcceleration：用户允许此任务使用“会员加速下载”
- EnteredAcceleration：此任务是否已进入“会员加速下载”状态
- IsDeleted：已经删除到“回收站”
- LazyLoad：当用户启动下载时再初始化相关代码并刷新任务信息
- Files：任务中包含的文件
  - FileIndex：文件索引，从`0`开始
  - FileName：文件名称
  - FilePath：文件完整路径
  - Progress：文件下载进度，范围是 0.0-1.0
  - FileSize：文件体积，单位是 Byte
- ContainingFolder：任务所在文件夹。如果当前任务为单文件的BT任务，则值为此文件的路径。如果为多文件的BT任务，则值为此任务的根目录。

## 14.获取某一下载任务的信息 /api/v1/download/tasks/{taskId}

### 参数

- taskId：下载任务的ID，即bt hash，为32位长度的大写字母字符串

### 返回值

各个属性同上方"获取下载任务列表"API的返回值，只返回一个json对象

```json
{
  "Id": "C7C1F5BEEC78122CCA8CBD0AEE8F8300C3192D3C",
  "Progress": 1,
  "IsDownloadFinished": true,
  "Title": "[DMG&MH][Shoujo Kageki Revue Starlight][09][720P][GB].mp4",
  "State": 6,
  "StateText": "Stopped",
  "TotalBytes": 128029807,
  "DownloadedBytes": 128029807,
  "DownloadSpeed": 0,
  "UploadSpeed": 0,
  "RemainTime": 0,
  "SavePath": "Y:\\少女歌剧",
  "Ignore": "",
  "CreatedTime": "2018-09-23T18:04:50.4946945+08:00",
  "FirstFinishTime": null,
  "UpdatedTime": null,
  "EnableAcceleration": true,
  "EnteredAcceleration": false,
  "IsDeleted": false,
  "LazyLoad": true,
  "Files": [
    {
      "FileIndex": 0,
      "FileName": "[DMG&MH][Shoujo Kageki Revue Starlight][09][720P][GB].mp4",
      "FilePath": "Y:\\少女歌剧\\[DMG&MH][Shoujo Kageki Revue Starlight][09][720P][GB].mp4",
      "Progress": 1,
      "FileSize": 128029807
    }
  ],
  "ContainingFolder": "Y:\\少女歌剧\\[DMG&MH][Shoujo Kageki Revue Starlight][09][720P][GB].mp4"
}
```

## 15.添加下载任务 /api/v1/download/tasks/add?magnet={magnet}

### 参数

- magnet：需要添加下载的磁力链接，此参数需要先进行Url编码然后放到参数中。磁力链接必须含有 `urn:btih=` 段

### 返回值

- 如果任务创建成功，则返回此新建任务的信息，格式同"获取某一下载任务的信息"API相同。
- 如果任务ID已存在，则会在更新当前下载任务之后返回此任务的信息。
- 如果创建任务失败，将会返回`null`。

## 16.控制下载任务 /api/v1/download/tasks/{taskId}/{method}?remove={remove}

### 参数

- taskId：下载任务ID
- method：需要进行的操作
  - start：开始
  - pause：暂停
  - delete：删除任务
- remove：删除任务时是否删除对应的视频文件
  - 1：删除文件
  - 0：不删除并保留文件。仅在`method`=`delete`时remove参数才会有效。

### 返回值

返回此任务的信息，返回格式同 "获取某一下载任务的信息" API相同。

## 17.扫描媒体库文件夹中的文件改动 /api/v1/library/scan

### 备注
将执行以下操作：
- 扫描媒体库中所有文件的文件改动
- 为新视频生成缩略图
- 为新视频关联弹幕库

### 返回值
无返回值。请求后将马上返回，刷新操作将在PC端后台进行。

## 18.更新媒体库所有视频的关联信息 /api/v1/library/refreshmatch

### 备注
将重新联网刷新媒体库中所有视频的关联信息。

### 返回值
无返回值。请求后将马上返回，刷新操作将在PC端后台进行。

## 19.获取视频文件对应的字幕文件列表 /api/v1/subtitle/info/{id}

### 参数

- id: 视频文件ID

### 返回值

将返回此视频文件对应的字幕文件的文件名列表，其中包括视频所在文件夹中与所有文件名与视频同名、或文件名中包含视频文件名的字幕文件。只支持识别 ass/ssa/srt 格式的字幕文件。取得文件名后，后续即可通过下载字幕文件的接口获取到字幕文件的内容.

```json
{
    "subtitles": [
        {
            "fileName": "test.ass",
            "fileSize": 158463
        },
        {
            "fileName": "test-1.srt",
            "fileSize": 158463
        }
    ]
}
```

## 20.获取字幕文件内容 /api/v1/subtitle/file/{id}?fileName={fileName}

### 参数

- id: 视频文件ID
- fileName: 字幕文件的文件名，不包含路径信息，可以通过上一个接口获取

### 返回值

将以`text/plain`格式返回字幕文件的内容
