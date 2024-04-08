import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  loginForm!: UntypedFormGroup;
  loading = false;

  baseUrl: string = "";
  protocal: string = "";
  host: string = "";
  port: string = "";
  isTestingUrl: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
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
          this.notificationService.warning("登录失败", "登录服务器 " + this.baseUrl + " 失败，错误信息：\r\n" + error);
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
          this.notificationService.warning("登录失败", "登录服务器 " + this.baseUrl + " 失败，错误信息：\r\n" + error);
          this.loading = false;
        }
      });
  }

  changeBaseUrl() {
    this.isTestingUrl = true;

    const urlString = this.localLibraryService.buildUrlString(this.host, this.protocal, this.port);
    this.localLibraryService.testBaseUrl(this.host, this.protocal, this.port)
      .subscribe(
        data => {
          this.localLibraryService.setBaseUrl(this.host, this.protocal, this.port);
          this.baseUrl = this.localLibraryService.baseUrl;
          if (!this.baseUrl || this.baseUrl == "") {
            this.notificationService.success("修改成功", "远程访问API已经重置为默认地址");
          } else {
            this.notificationService.success("修改成功", "远程访问API已经修改为 " + this.baseUrl);
          }
          this.isTestingUrl = false;
        },
        (error) => {
          var msg = "修改失败，服务器未能正确连接。请确认 " + urlString + " 是可访问的。";
          this.notificationService.error("修改失败", msg);
          this.isTestingUrl = false;
        });


  }

}
