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
import { IconDefinition } from '@ant-design/icons-angular';
import { PlayComponent } from './play/play.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzListModule } from 'ng-zorro-antd/list';

import {
  EllipsisOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ EllipsisOutline];

@NgModule({
  declarations: [
    VideoComponent,
    VideoCardComponent,
    PlayComponent
  ],
  imports: [
    LibraryRoutingModule,
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzBackTopModule,
    NzButtonModule,
    NzIconModule.forRoot(icons),
    NzBreadCrumbModule,
    NzDividerModule,
    NzListModule
  ]
})
export class LibraryModule { }
