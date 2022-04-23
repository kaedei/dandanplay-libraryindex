import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  title = "弹弹play媒体库";
  year = 0;

  constructor() {
    this.year = new Date().getFullYear();
  }
}
