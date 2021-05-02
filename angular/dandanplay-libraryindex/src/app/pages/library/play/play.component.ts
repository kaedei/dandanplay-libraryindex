import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import DPlayer from 'dplayer'
import { PlayerConfigResponse } from 'src/app/core/models/PlayerConfigResponse';
import { LocalLibraryService } from 'src/app/core/services/local-library.service';

@Component({
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  id = '';

  @ViewChild('dplayer')
  dplayer: any;

  dp!: DPlayer;
  playerConfig!: PlayerConfigResponse;
  animeTitle = '';
  episodeTitle = '';

  constructor(private localLibraryService: LocalLibraryService,
    private route: ActivatedRoute,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => this.id = params.get('id') ?? '');
  }

  ngAfterViewInit(): void {
    this.localLibraryService.getPlayerConfig(this.id).toPromise().then(cfg=>{
        this.playerConfig = cfg;
        this.animeTitle = cfg.video.AnimeTitle;
        this.episodeTitle = cfg.video.EpisodeTitle;

        var element = this.dplayer.nativeElement;
        var config = {
          container: element,
          theme: this.playerConfig.color, //控件的颜色
          loop: false, //循环
          screenshot: true, //截图
          hotkey: true, //热键
          preload: 'none', //预加载
          //logo: 'http://www.dandanplay.com/logo.png',        //播放器左上角logo
          volume: 1, //默认音量
          mutex: true, //互斥，阻止多个播放器同时播放
          video: {
            url: this.localLibraryService.baseUrl + this.playerConfig.videoUrl,
            pic: this.localLibraryService.baseUrl + this.playerConfig.imageUrl,
            type: 'auto'
          },
          danmaku: {
            id: this.id, //弹幕库id
            api: this.localLibraryService.baseUrl + '/api/v1/dplayer/', //弹幕库api
            bottom: '15%', //底部距离
            unlimited: true //无限制
            //maximum: 60 //最大弹幕
          },
          subtitle: {
            url: this.localLibraryService.baseUrl + this.playerConfig.vttUrl,
            type: 'webvtt',
            fontSize: '25px',
            bottom: '10%',
            color: '#ffffff'
          },
        };
        this.dp = new DPlayer(config);
        this.el.nativeElement.querySelector('.dplayer-video').setAttribute('crossorigin', 'use-credentials');
      });

  }
}
