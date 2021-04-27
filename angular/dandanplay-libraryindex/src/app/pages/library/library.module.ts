import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { LibraryRoutingModule } from './library-routing.module';
import { VideoCardComponent } from './video-card/video-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    VideoComponent,
    VideoCardComponent
  ],
  imports: [
    LibraryRoutingModule,
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzBackTopModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class LibraryModule { }
