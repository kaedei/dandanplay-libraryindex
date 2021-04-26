import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { LibraryRoutingModule } from './library-routing.module';



@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    LibraryRoutingModule,
    CommonModule
  ]
})
export class LibraryModule { }
