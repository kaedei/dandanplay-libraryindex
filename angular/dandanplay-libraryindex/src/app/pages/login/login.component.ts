import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/core/models/User';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LocalLibraryService } from 'src/app/core/services/local-library.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;

  baseUrl: string = "";
  protocal: string = "";
  host: string = "";
  port: string = "";
  isTestingUrl: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private localLibraryService: LocalLibraryService,
    private notificationService: NzNotificationService
  ) {
    if (this.authenticationService.getCurrentUser()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.protocal = this.localLibraryService.protocal;
    this.host = this.localLibraryService.host;
    this.port = this.localLibraryService.port;
    this.baseUrl = this.localLibraryService.baseUrl;
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("on form submit");
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.invalid) {
      console.log("loginForm invalid");
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.get("userName")?.value, this.loginForm.get("password")?.value)
      .subscribe({
        next: user => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.notificationService.warning("登录失败", "登录失败，错误信息：\r\n" + error);
          this.loading = false;
        }
      });
  }

  anonymousLogin() {
    this.loading = true;
    this.authenticationService.login(User.AnonymousUserName, User.AnonymousPassword)
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.notificationService.warning("登录失败", "登录失败，错误信息：\r\n" + error);
          this.loading = false;
        }
      });
  }

  changeBaseUrl() {
    this.localLibraryService.setBaseUrl(this.host, this.protocal, this.port);
    this.baseUrl = this.localLibraryService.baseUrl;
    if (!this.baseUrl || this.baseUrl == "") {
      this.notificationService.success("修改成功", "远程访问API已经重置为默认地址");
    } else {
      this.notificationService.success("修改成功", "远程访问API已经修改为 " + this.baseUrl);
    }
  }

  testUrl() {
    this.isTestingUrl = true;
    const urlString = this.localLibraryService.buildUrlString(this.host, this.protocal, this.port);
    this.localLibraryService.testBaseUrl(this.host, this.protocal, this.port)
      .subscribe(
        data => {
          var msg = "服务器 " + urlString + " 连接成功。当前版本：" + data.version + "，当前服务器时间：" + data.time + "。需要密钥：" + data.tokenRequired;
          this.notificationService.success("测试成功", msg);
          this.isTestingUrl = false;
        },
        (error) => {
          var msg = "服务器 " + urlString + " 连接失败。请保证 " + urlString + "/api/v1/welcome 是可访问的。";
          this.notificationService.error("测试失败", msg);
          this.isTestingUrl = false;
        });
  }


}
