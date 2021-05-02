import { Component, Input, OnInit } from '@angular/core';
import { LibraryItem } from 'src/app/core/models/LibraryResponse';
import { LocalLibraryService } from 'src/app/core/services/local-library.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {

  @Input()
  item!: LibraryItem;

  name = '';
  animeTitle = '';
  episodeTitle='';
  imageUrl = '';
  baseUrl = '';

  constructor(private localLibraryService: LocalLibraryService) {
    this.baseUrl = localLibraryService.baseUrl;
   }

  ngOnInit(): void {
    this.name = this.item?.Name ?? '';
    this.animeTitle = this.item?.AnimeTitle ?? this.name;
    this.episodeTitle = this.item?.EpisodeTitle ?? '';
    this.imageUrl = this.baseUrl + "/web1/image/" + this.item?.Id;
  }

}
