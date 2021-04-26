import { Component, OnInit } from '@angular/core';
import { LibraryItem } from 'src/app/core/models/LibraryResponse';
import { LocalLibraryService } from 'src/app/core/services/local-library.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videoList: LibraryItem[] = [];

  constructor(private localLibraryService: LocalLibraryService) { }

  ngOnInit(): void {
    this.refreshLibraryData();
  }

  refreshLibraryData(): void {
    this.localLibraryService.getLibrary()
      .subscribe(data => {
        this.videoList = data;
        console.log(this.videoList);
      });
  }

}
