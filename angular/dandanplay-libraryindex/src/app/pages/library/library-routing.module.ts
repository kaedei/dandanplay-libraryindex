import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent } from './play/play.component';
import {VideoComponent} from './video/video.component';

const routes: Routes = [
  { path: '', component: VideoComponent },
  { path: 'video', component: VideoComponent },
  { path: 'play/:id', component: PlayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
