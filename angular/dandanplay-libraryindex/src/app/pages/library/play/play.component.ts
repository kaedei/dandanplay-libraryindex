import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import DPlayer from 'dplayer'

@Component({
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  id = '';

  @ViewChild('dplayer')
  dplayer: any;

  dp!: DPlayer;

  constructor(private route: ActivatedRoute,private el: ElementRef) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => this.id = params.get('id') ?? '');

  }

  ngAfterViewInit(): void {
    var element = this.dplayer.nativeElement;
    var config = {
      container: element,
      theme: '#1BA1E2', //控件的颜色
				loop: false, //循环
				screenshot: true, //截图
				hotkey: true, //热键
				preload: 'none', //预加载
				//logo: 'http://www.dandanplay.com/logo.png',        //播放器左上角logo
				volume: 1, //默认音量
				mutex: true, //互斥，阻止多个播放器同时播放
      video: {
        url: 'http://localhost:80/video/42f8f2ce-9ed5-4b07-85d0-4a76f962ec8a.mp4?token=lSglycvpo4OnX8%2FOdC0Skr%2FhwTi7DvlJaSEY2oQznyXVW9sv%2B5jInVTM%2F00ztGWE',
        pic: 'http://localhost:80/image/42f8f2ce-9ed5-4b07-85d0-4a76f962ec8a',
        type: 'auto'
      },
      danmaku: {
        id: '42f8f2ce-9ed5-4b07-85d0-4a76f962ec8a', //弹幕库id
        api: 'http://localhost:80/dplayer/', //弹幕库api
        bottom: '15%', //底部距离
        unlimited: true //无限制
        //maximum: 60 //最大弹幕
      },
      subtitle: {
        url: 'http://localhost:80/subtitle/42f8f2ce-9ed5-4b07-85d0-4a76f962ec8a/vtt',
        type: 'webvtt',
        fontSize: '25px',
        bottom: '10%',
        color: '#ffffff'
      },
    };
    this.dp = new DPlayer(config);
    this.el.nativeElement.querySelector('.dplayer-video').setAttribute('crossorigin', 'use-credentials');
  }
}
