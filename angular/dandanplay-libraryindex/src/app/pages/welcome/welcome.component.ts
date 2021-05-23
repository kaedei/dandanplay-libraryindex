import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, retry } from 'rxjs/operators';
import { LocalLibraryService } from 'src/app/core/services/local-library.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private localLibraryService: LocalLibraryService,
    private notificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    
  }

}
