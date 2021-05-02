import { Component, OnInit } from '@angular/core';
import { LibraryItem } from 'src/app/core/models/LibraryItem';
import { LocalLibraryService } from 'src/app/core/services/local-library.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videoList: LibraryItem[] = [];
  isLoading: boolean = false;

  constructor(private localLibraryService: LocalLibraryService) { }

  ngOnInit(): void {
    this.refreshLibraryData();
  }

  refreshLibraryData(): void {
    this.isLoading = true;
    this.localLibraryService.getLibrary()
      .subscribe(data => {
        this.videoList = data;
        this.isLoading = false;
        console.log(this.videoList);
      });
  }

}
