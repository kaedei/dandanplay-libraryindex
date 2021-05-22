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

  baseUrl: string = "";
  isTestingUrl: boolean = false;

  constructor(private localLibraryService: LocalLibraryService,
    private notificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    this.baseUrl = window.localStorage.getItem("baseUrl") ?? "";
  }

  changeBaseUrl() {
    this.baseUrl = this.baseUrl.trim();
    if (!this.baseUrl.startsWith("http://") && !this.baseUrl.startsWith("https://")) {
      this.baseUrl = "http://" + this.baseUrl;
    }

    this.localLibraryService.baseUrl = this.baseUrl;
    window.localStorage.setItem("baseUrl", this.baseUrl);
    this.notificationService.success("修改成功", "远程访问API已经修改为 " + this.baseUrl);
  }

  testUrl() {
    this.isTestingUrl = true;
    this.localLibraryService.testBaseUrl(this.baseUrl)
      .subscribe(
        data => {
          var msg = "服务器 " + this.baseUrl + " 连接成功。当前版本：" + data.version + "，当前服务器时间：" + data.time + "。需要密钥：" + data.tokenRequired;
          this.notificationService.success("测试成功", msg);
          this.isTestingUrl = false;
        },
        (error) => {
          var msg = "服务器 " + this.baseUrl + " 连接失败。请保证 " + this.baseUrl + "/api/v1/welcome 是可访问的。";
          this.notificationService.error("测试失败", msg);
          this.isTestingUrl = false;
        });
  }

}
