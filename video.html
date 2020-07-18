<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>@Model.AnimeTitle - @Model.EpisodeTitle - @Model.WebSiteName</title>
	<link rel="shortcut icon" href="/css/icon.png" type="image/x-icon">
	<link href="/css/bootstrap-4.0.0.css" rel="stylesheet">
	<link rel="stylesheet" href="/css/DPlayer.min.css">
	<script src="/js/DPlayer.min.js"></script>
	<style type="text/css">
		/* ReSharper disable InvalidValue */
		/* ReSharper disable CssNotResolved */
		.dplayer {
			width: 100%;
			top: 3%;
			height: 70%;
			margin-bottom: 40px;
		}

		.dplayer-danmaku {
			font-size: 25px;
			height: @Model.DanmakuArea ;
		}

			.dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
				-webkit-animation: @Model.DanmakuDurationCss ;
				animation: @Model.DanmakuDurationCss ;
				-webkit-animation-play-state: paused;
				animation-play-state: paused;
			}

			.dplayer-danmaku .dplayer-danmaku-item {
				-webkit-text-stroke: 0.1px black;
				text-stroke: 0.1px black;
				text-shadow: 1.0px 1.0px 0.5px rgba(0, 0, 0, .5);
			}

		/* mobile */

		/* 控制条 mask 高度调小，避免影响双击切换暂停播放 */

		.dplayer-mobile .dplayer-controller-mask {
			height: 60px;
		}

		/* 弹幕字体调小 */

		.dplayer-mobile .dplayer-danmaku {
			font-size: 20px;
		}

		.dplayer.dplayer-arrow.dplayer-mobile .dplayer-danmaku {
			font-size: 20px;
		}

		/* ReSharper restore InvalidValue */
		/* ReSharper restore CssNotResolved */
	</style>
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container">
			<a class="navbar-brand" href="#">@Model.WebSiteName</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="/index.html">首页</a>
					</li>
					@IfNot.IsAnonymous
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							@@Model.UserName
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<a class="dropdown-item" href="/logout">注销登录</a>
						</div>
					</li>
					@EndIf
					<li class="nav-item">
						<a class="nav-link" href="@Model.AboutLink" target="_blank">关于</a>
					</li>

					<li class="nav-item">
						<a class="nav-link" href="https://github.com/kaedei/dandanplay-libraryindex" target="_blank">帮助改进此页面</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<div class="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item">
					<a href="/index.html">首页</a>
				</li>
				<li class="breadcrumb-item">
					<a href="/index.html?animeId=@Model.AnimeId">@Model.AnimeTitle</a>
				</li>
				<li class="breadcrumb-item active" aria-current="page">
					@Model.EpisodeTitle
				</li>
			</ol>
		</nav>

		<div id="dplayer"></div>

		<div class="card">
			<div class="card-header">
				剧集列表
			</div>
			<div class="card-body">
				<div class="list-group list-group-flush">
					@Each.VideoFiles
					<a href="/web/@Current.Id" class="list-group-item list-group-item-action
				@If.IsCurrent
				active
				@EndIf
			   ">
						@Current.EpisodeTitle
						<small>
							@Current.FileName
						</small>
					</a>
					@EndEach
				</div>
			</div>
		</div>
	</div>

	<hr />
	<div class="container">
		<div class="row text-center">
			<div class="col-12">
				<p>@Model.WebSiteName 由弹弹play"远程访问"工具提供支持. All rights reserved. 保留一切权利</p>
			</div>
		</div>
	</div>

	<script src="/js/jquery-3.2.1.min.js"></script>
	<!--<script src="/js/popper.min.js"></script>-->
	<script src="/js/bootstrap-4.0.0.js"></script>
	<script>
		$(document).ready(function () {
			var dp = new DPlayer({
				container: document.getElementById('dplayer'), //播放器容器元素
				theme: '@Model.Color', //控件的颜色
				loop: false, //循环
				screenshot: true, //截图
				hotkey: true, //热键
				preload: 'none', //预加载
				//logo: 'http://www.dandanplay.com/logo.png',        //播放器左上角logo
				volume: 1, //默认音量
				mutex: true, //互斥，阻止多个播放器同时播放
				video: {
					url: '@Model.Video',
					pic: '@Model.Image',
					type: 'auto'
				},
				danmaku: {
					id: '@Model.Id', //弹幕库id
					api: '/dplayer/', //弹幕库api
					bottom: '15%', //底部距离
					unlimited: true //无限制
					//maximum: 60 //最大弹幕
				},
				subtitle: {
					url: '@Model.SubtitleVtt',
					type: 'webvtt',
					fontSize: '25px',
					bottom: '10%',
					color: '#ffffff'
				},
			});
			$(".dplayer-video").attr("crossorigin", "use-credentials");
		});
	</script>
</body>
</html>