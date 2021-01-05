# 弹弹play资源搜索节点API规范

## 说明

此文档用来说明弹弹play客户端是如何调用服务器端API来进行【资源搜索】操作的，您可以根据此文档实现一个简单的服务器端HTTP Web API，然后将服务器地址填写到客户端配置中，即可正常开启弹弹play客户端的【资源搜索】功能。

## 流程介绍

客户端会通过标准http/https请求调用服务器端的API，获取到json格式返回的结果后，将搜索结果显示在界面列表中。

客户端在界面显示时，首先会调用 `/subgroup` 和 `/type` 两个接口，用来获取全部字幕组和资源类型，用来填充下拉列表。

在用户输入搜索关键词，并点击搜索后，客户端将会调用 `/list` 接口，获取搜索结果。

## 接口详情

### 1. GET /subgroup

获取字幕组列表

返回值示例：
```json
{
    "Subgroups": [
        {
            "Id": 0,
            "Name": "未知字幕组"
        },
        {
            "Id": 17,
            "Name": "资源网管理组"
        },
        {
            "Id": 18,
            "Name": "动漫花园字幕组"
        },
        {
            "Id": 21,
            "Name": "漫画@花园"
        },
        {
            "Id": 22,
            "Name": "音乐@花园"
        }
    ]
}
```

接口说明：
`SubGroups`属性为一个数组，`Id`是数字类型的字幕组编号，将会绑定为下拉列表内部ID，`Name`是字符串类型的字幕组名称，将会显示在界面上。

### 2. GET /type

获取资源类型列表

返回值示例：
```json
{
    "Types": [
        {
            "Id": 0,
            "Name": "未知分类"
        },
        {
            "Id": 1,
            "Name": "其他"
        },
        {
            "Id": 2,
            "Name": "动画/新番连载"
        },
        {
            "Id": 3,
            "Name": "漫画"
        },
        {
            "Id": 4,
            "Name": "音乐"
        },
        {
            "Id": 6,
            "Name": "日剧"
        }
    ]
}
```

接口说明：
`Types`属性为一个数组，`Id`是数字类型的类别编号，将会绑定为下拉列表内部ID，`Name`是字符串类型的类别名称，将会显示在界面上。


### 3. GET /list

通过搜索关键词搜索资源

请求参数：

| 参数     | 说明                      | 必需 | 示例         |
|----------|---------------------------|------|--------------|
| keyword  | 搜索关键词，已经经过URI编码 | 是   | 魔法少女小圆 |
| subgroup | 字幕组ID                  | 否   | 123          |
| type     | 资源类别ID                | 否   | 2            |
| r        | 随机数，用于避免缓存      | 否   | 0.13579      |

返回值示例：
```json
{
    "HasMore": true,
    "Resources": [
        {
            "Title": "[210106]アプリゲーム『CUE!』AiRBLUE 4th Single「最高の魔法」[DVD付初回限定盘][320K]",
            "TypeId": 43,
            "TypeName": "音乐/动漫音乐",
            "SubgroupId": 390,
            "SubgroupName": "天使动漫论坛",
            "Magnet": "magnet:?xt=urn:btih:PYCEIAMYL6RGZARU4L3SWJE3CIEQNE7W",
            "PageUrl": "https://share.dmhy.org/topics/view/556234_210106_CUE%21_AiRBLUE_4th_Single_DVD_320K.html",
            "FileSize": "87.5MB",
            "PublishDate": "2021-01-05 16:15:00"
        },
        {
            "Title": "[210106]『BanG Dream!バンドリ!』Poppin'Party 16thシングル「Photograp」／戸山香澄(爱美)、花园たえ(大塚纱英)、牛込りみ(西本りみ)、山吹沙绫(大桥彩香)、市ヶ谷有咲(伊藤彩沙)[320K]",
            "TypeId": 43,
            "TypeName": "音乐/动漫音乐",
            "SubgroupId": 390,
            "SubgroupName": "天使动漫论坛",
            "Magnet": "magnet:?xt=urn:btih:D3HRCIYZQGMD4ZKT4GVHNIO7FCH5FDR7",
            "PageUrl": "https://share.dmhy.org/topics/view/556232_210106_BanG_Dream%21_%21_Poppin_Party_16th_Photograp_320K.html",
            "FileSize": "44.4MB",
            "PublishDate": "2021-01-05 14:43:00"
        },
        {
            "Title": "[Lilith-Raws] 比方说，这是个出身魔王关附近的少年在新手村生活的故事 - 01 [Baha][WEB-DL][1080p][AVC AAC][CHT][MP4]",
            "TypeId": 2,
            "TypeName": "动画/新番连载",
            "SubgroupId": 0,
            "SubgroupName": "未知字幕组",
            "Magnet": "magnet:?xt=urn:btih:KO36AQLQCEUVSMYIEDAHU67JWAFWYFZQ",
            "PageUrl": "https://share.dmhy.org/topics/view/556230_Lilith-Raws_-_01_Baha_WEB-DL_1080p_AVC_AAC_CHT_MP4.html",
            "FileSize": "376.6MB",
            "PublishDate": "2021-01-05 13:55:00"
        },
        {
            "Title": "[4K][路基艾尔-Raws][寒蝉鸣泣之时/Higurashi No Naku Koro Ni/ひぐらしのなく顷に][08][BDRemux][2160P][简繁内封][GB&BIG5][MKV]",
            "TypeId": 2,
            "TypeName": "动画/新番连载",
            "SubgroupId": 0,
            "SubgroupName": "未知字幕组",
            "Magnet": "magnet:?xt=urn:btih:XQSEKMNEWC4YDUI5AZSSYZRGQQKZJ6UT",
            "PageUrl": "https://share.dmhy.org/topics/view/556228_4K_-Raws_Higurashi_No_Naku_Koro_Ni_08_BDRemux_2160P_GB_BIG5_MKV.html",
            "FileSize": "12.7GB",
            "PublishDate": "2021-01-05 13:24:00"
        },
    ]
}
```

返回值说明：
| 返回值       | 说明                                                                                                                      | 数据格式 | 示例                                                                              |
|--------------|---------------------------------------------------------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------|
| hasMore      | 是否有更多结果。当搜索结果过多时，可以限制json中的结果数量，同时将hasMore设置为true，客户端将会显示“搜索结果过多”的提示。 | boolean  | true                                                                              |
| Title        | 资源标题                                                                                                                  | string   | [1月新番][进击的巨人][01].mp4                                                     |
| TypeId       | 资源类别ID                                                                                                                | int      | 1                                                                                 |
| TypeName     | 资源类别名称                                                                                                              | string   | 动画/新番连载                                                                     |
| SubgroupId   | 字幕组ID                                                                                                                  | int      | 123                                                                               |
| SubgroupName | 字幕组名称                                                                                                                | string   | XX字幕组                                                                          |
| Magnet       | 磁力链接                                                                                                                  | string   | magnet:?xt=urn:btih:OJUUUFULYI24DO3YFDIL6QCQDPFD2GIM                              |
| PageUrl      | 资源发布页面                                                                                                              | string   | https://share.dmhy.org/12345.html |
| FileSize     | 资源大小（为了兼容花园数据，请显示为 123.45MB、1.234GB 这种格式）                                                         | string   | 297.5MB                                                                           |
| PublishDate  | 发布时间（格式为 yyyy-MM-dd HH:mm:ss）                                                                                    | string   | 2021-01-05 13:02:00                                                               |

接口说明：

参数将通过URL传递，最终的url格式应该类似于 `http://example.com/list?keyword={keyword}&subgroup={subgroupId}&type={typeId}&r={random}`

当没有传递 `subgroup` 或 `type` 参数，或者参数数字小于0时，请忽略此参数。
